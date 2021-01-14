import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Structure from '../../entities/Structure.entity';
import { Repository } from 'typeorm';
import { StructurePayload } from './payload/structure.payload';

@Injectable()
export class StructureService {

  constructor(@InjectRepository(Structure)
              private readonly structureRepository: Repository<Structure>) {
  }

  async create(structurePayload: StructurePayload) {
    console.log(structurePayload);
    const structure = await this.structureRepository.create(structurePayload);
    try {
      return await this.save(structure).then(res => res);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async save(structure?: Structure): Promise<Structure> {
    try {
      return await this.structureRepository.save(structure);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async find(id: number) {
    try {
      return await this.structureRepository.findOneOrFail(id);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
