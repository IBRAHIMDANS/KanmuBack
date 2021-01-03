import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserDecorator from '../../decorators/user.decorator';
import { User } from '../../entities';

@Controller('jobform')
@UseGuards(AuthGuard('jwt'))
@ApiTags('jobform')
export class JobformController {

  @Get()
  @ApiBearerAuth('')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async connect(
    @UserDecorator() user: Partial<User>,
    //   @Body() payload: Partial<StructurePayload>,
  ) {
    console.log(user);
    return user;
  }
}
