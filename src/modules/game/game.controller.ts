import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { GameService } from "./game.service";
import { GamePayload } from "./payload/Game.payload";

@Controller("game")
export class GameController {
  constructor(private readonly gameService: GameService) {
  }

  @Get()
  @ApiBearerAuth("")
  @ApiResponse({ status: 201, description: "Successful Registration" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async get() {
    return this.gameService.find();
  }

  @Get(":id")
  @ApiBearerAuth("")
  @ApiResponse({ status: 201, description: "Successful Registration" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getById(@Param("id", ParseIntPipe)id) {
    return this.gameService.findOne(id);
  }

  @Post("")
  @ApiBearerAuth("")
  @ApiResponse({ status: 201, description: "Successful Registration" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async create(@Body() payload: GamePayload) {
    console.log(payload);
    return this.gameService.create(payload);
  }

  @Put(":id")
  @ApiBearerAuth("")
  @ApiResponse({ status: 201, description: "Successful Registration" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async update(@Param("id", ParseIntPipe) id: number, @Body() payload: GamePayload) {
    return this.gameService.update(id, payload);
  }

  @Delete(":id")
  @ApiBearerAuth("")
  @ApiResponse({ status: 201, description: "Successful Registration" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.gameService.delete(id);
  }
}
