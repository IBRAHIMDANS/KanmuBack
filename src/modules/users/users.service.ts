import { ConflictException, HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities';
import { RegisterPayload } from '../auth/payloads';
import * as crypto from 'crypto';


@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>,
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

  async create(payload: RegisterPayload): Promise<User> {
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

  async save(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
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
