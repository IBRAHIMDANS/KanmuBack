import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities';
import { EmailModule } from '../email/email.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { StructureModule } from '../structure/structure.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    EmailModule,
    StructureModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
}
