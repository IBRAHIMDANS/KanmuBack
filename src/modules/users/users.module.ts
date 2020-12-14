import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Structure, User } from '../../entities';
import { EmailModule } from '../email/email.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Structure]),
    ConfigModule,
    EmailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
}
