import { Module } from '@nestjs/common';
import { StructureController } from './structure.controller';
import { StructureService } from './structure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Structure } from '../../entities';

@Module({
  controllers: [StructureController],
  imports: [
    TypeOrmModule.forFeature([Structure]),
  ],
  providers: [StructureService],
  exports: [StructureModule],
})
export class StructureModule {
}
