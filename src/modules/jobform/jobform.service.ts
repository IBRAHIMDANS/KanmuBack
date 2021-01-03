import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';

@Injectable()
export class JobformService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>) {
  }

  async create() {
    await this.userRepository.create();
  }
}
