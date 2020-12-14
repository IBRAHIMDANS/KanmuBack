import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserDecorator from '../../decorators/user.decorator';
import { User } from '../../entities';
import { StructurePayload } from './payload/structure.payload';
import { StructureService } from './structure.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('structure')
@UseGuards(AuthGuard('jwt'))
@ApiTags('structure')
export class StructureController {
  constructor(private readonly structureService: StructureService) {
  }

  @Post()
  @ApiBearerAuth('')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async resetPassword(@UserDecorator() user: Partial<User>, @Body() payload: Partial<StructurePayload>) {
    console.log(payload);
    return user;
  }
}
