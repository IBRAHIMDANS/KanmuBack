import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "../../entities";
import { Repository } from "typeorm";
import { GamePayload } from "./payload/Game.payload";

@Injectable()
export class GameService {


  constructor(@InjectRepository(Game)
              private readonly gameRepository: Repository<Game>
  ) {
  }

  async getByName(name: string): Promise<Game> {
    return await this.gameRepository.createQueryBuilder("game")
      .where("game.name = :name")
      .setParameter("name", name)
      .getOne();
  }

  async create(payload: GamePayload) {
    const existedUser = await this.getByName(payload.name);
    if(existedUser) {
      throw new NotAcceptableException("Game already exist.");
    }
    return await this.gameRepository.save(payload).then(() => ({
      status: 200,
      message: "created"
    })).catch(err => err);
  }

  async find() {
    return await this.gameRepository.find();
  }

  async findOne(id: number) {
    return await this.gameRepository.findOneOrFail(id);
  }

  async update(id: number, payload: GamePayload) {
    return await this.gameRepository.findOneOrFail(id).then(async (game) => {
      return await this.gameRepository.update(id, payload);
    });
  }

  async delete(id: number) {
    return await this.gameRepository.findOneOrFail(id).then(async (game) => {
      return await this.gameRepository.softDelete(id);
    });
  }
}
