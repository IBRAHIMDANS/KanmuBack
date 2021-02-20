import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "../../entities";
import { ConfigModule } from "@nestjs/config";
import { GameController } from "./game.controller";

@Module({
  providers: [GameService],
  imports: [
    TypeOrmModule.forFeature([Game]),
    ConfigModule
  ],
  exports: [GameModule],
  controllers: [GameController]
})
export class GameModule {


}
