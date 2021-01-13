import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities';
import {
  EmailPayload,
  PasswordPayload,
  RegisterPayload,
} from '../auth/payloads';
import crypto from 'crypto';
import { EmailService } from '../email/email.service';
import { JwtService } from '@nestjs/jwt';
import { passwordGenerator } from '../../lib/passwordGen';
import { StructureService } from '../structure/structure.service';
import { StructurePayload } from '../structure/payload/structure.payload';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>,
              private readonly structureService: StructureService,
              private readonly emailService: EmailService,
              private readonly jwtService: JwtService,
  ) {
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneOrFail({ email: email });
  }

  async get(id: number) {
    return this.userRepository.findOne(id);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.createQueryBuilder('users')
      .where('users.email = :email')
      .setParameter('email', email)
      .getOne();
  }

  async create(userPayload: RegisterPayload, structurePayload?: StructurePayload): Promise<Partial<User>> {
    const existedUser = await this.getByEmail(userPayload.email);
    if(existedUser) {
      throw new NotAcceptableException('User with provided email already created.');
    }
    const user = await this.userRepository.create(userPayload);
    const password = passwordGenerator();
    user.password = password;
    if(structurePayload) {
      await this.structureService.create(structurePayload).then((structure) => {
        user.structure = structure;
      });
    }
    try {
      return await this.save(user, password);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async save(user: User, password: string): Promise<Partial<User>> {
    try {
      return await this.userRepository.save(user)
        .then(async () =>
          await this.emailService.sendMailRegister(user, password))
        .catch(e => e.message);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async SendMailForgetPassword(payload: EmailPayload) {
    return await this.userRepository.findOne(
      { where: { email: payload.email } })
      .then(async res => {
        delete res.deletedAt;
        const token = this.jwtService.sign({ id: res.id });
        return await this.emailService.sendMailForgetPassword(res, token).then(() => true).catch(() => false);
      }).catch(err => {
        throw new NotFoundException(err.error);
      });
  }

  async resetPassword(payload: PasswordPayload, user) {
    return this.userRepository.findOneOrFail({ where: { email: user.email } }).then(async res => {
      return await this.emailService.sendMailRegister(res);
    }).catch(err => {
      throw new NotFoundException(err);
    });
  }

  async getByEmailAndPass(email: string, password: string): Promise<User> {
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    return await this.userRepository.createQueryBuilder('users')
      .where('users.email = :email and users.password = :password')
      .setParameter('email', email)
      .setParameter('password', passHash)
      .getOne();
  }
}
