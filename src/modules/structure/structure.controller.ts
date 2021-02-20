import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import UserDecorator from "../../decorators/user.decorator";
import { User } from "../../entities";
import { StructurePayload } from "./payload/structure.payload";
import { StructureService } from "./structure.service";

@Controller("structures")
// @UseGuards(AuthGuard('jwt'))
@ApiTags("structures")
export class StructureController {
  constructor(private readonly structureService: StructureService) {
  }

  @Post()
  @ApiBearerAuth("")
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateStructure(@UserDecorator() user: Partial<User>, @Body() payload: Partial<StructurePayload>) {
    return this.structureService.update(payload, user);
  }

  @Get()
  @ApiBearerAuth('')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async get(@UserDecorator() user: Partial<User>) {
    return this.structureService.find(+user.structure.id);
  }

  @Get("all")
  @ApiBearerAuth("")
  @ApiResponse({ status: 201, description: "Successful Registration" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async search(@Query() query) {
    return this.structureService.findAll(query);
  }

  @Get(":id")
  @ApiBearerAuth("")
  @ApiResponse({ status: 201, description: "Successful Registration" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getByID(@Param("id", ParseIntPipe) id: number) {
    return this.structureService.find(id);
  }
}
