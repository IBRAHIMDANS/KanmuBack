import { Module } from '@nestjs/common';
import { JobformService } from './jobform.service';
import { JobformController } from './jobform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities';

@Module({
  providers: [JobformService],
  controllers: [JobformController],
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports: [JobformModule],
})
export class JobformModule {
}
