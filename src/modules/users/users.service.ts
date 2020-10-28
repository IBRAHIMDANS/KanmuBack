import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities';


@Injectable()
export class UsersService {
  private readonly users: any[];

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>,
  ) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async get(id: number) {
    return this.userRepository.findOne(id);
  }
}
