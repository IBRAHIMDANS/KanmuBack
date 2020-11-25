import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player, User } from '../../entities';
import { EmailModule } from '../email/email.module';
import { ConfigModule } from '@nestjs/config';
import { DefaultAdminModule } from 'nestjs-admin';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Player]),
    ConfigModule,
    EmailModule,
    DefaultAdminModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
}
