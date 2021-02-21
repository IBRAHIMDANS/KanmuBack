import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "../../entities";
import { GameController } from "./game.controller";

@Module({
  controllers: [GameController],
  imports: [
    TypeOrmModule.forFeature([Game])
  ],
  providers: [GameService],
  exports: [GameModule, GameService]
})
export class GameModule {


}
