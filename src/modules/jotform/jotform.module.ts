import { HttpModule, Module } from '@nestjs/common';
import { JotformService } from './jotform.service';
import { JotformController } from './jotform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Structure, User } from '../../entities';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [JotformService],
  controllers: [JotformController],
  imports: [
    TypeOrmModule.forFeature(
      [User, Structure]),
    HttpModule,
    UsersModule,
  ], exports: [JotformModule],
})
export class JotformModule {
}
