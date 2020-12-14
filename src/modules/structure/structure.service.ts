import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Structure from '../../entities/Structure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StructureService {

  constructor(@InjectRepository(Structure)
              private readonly structureRepository: Repository<Structure>) {
  }

  async registerStructure() {
    await this.structureRepository.create();
  }
}
