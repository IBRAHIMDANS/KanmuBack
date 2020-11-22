import {
  ConflictException,
  HttpException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities';
import { EmailPayload, PasswordPayload, RegisterPayload } from '../auth/payloads';
import * as crypto from 'crypto';
import { EmailService } from '../email/email.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>,
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

  async create(payload: RegisterPayload): Promise<void | Partial<User>> {
    const existedUser = await this.getByEmail(payload.email);
    if (existedUser) {
      throw new NotAcceptableException('User with provided email already created.');
    }
    const user = await this.userRepository.create(payload);
    try {
      return await this.save(user);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async save(user: User): Promise< Partial<User>> {
    try {
      return await this.userRepository.save(user)
        .then(async () => await this.emailService.sendMailRegister(user)).catch(e => e.message)
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async SendMailForgetPassword(payload: EmailPayload): Promise<User> {
    try {
      // @ts-ignore
      return this.userRepository.findOneOrFail({ where: { email: payload.email } }).then(async res => {
        const token = this.jwtService.sign({ id: res.id });
        return await this.emailService.sendMailForgetPassword(res, token);
      }).catch(err => {
        throw new NotFoundException(err);
      });
    } catch (error) {

      throw new ConflictException(error);
    }
  }

  async resetPassword(payload: PasswordPayload): Promise<User> {
    try {
      // @ts-ignore

      return this.userRepository.findOneOrFail({ where: { email: payload.email } }).then(async res => {
        console.log(res);
        return await this.emailService.sendMailRegister(res);
        return res;
      }).catch(err => {
        throw new NotFoundException(err);
      });
    } catch (error) {

      throw new ConflictException(error);
    }
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
