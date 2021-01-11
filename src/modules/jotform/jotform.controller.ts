import { Body, Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JotformService } from './jotform.service';
import { Request } from 'express';

@Controller('jotform') // @UseGuards(AuthGuard('jwt'))
@ApiTags('jotform')
export class JotformController {
  constructor(private readonly jotformService: JotformService) {
  }

  @Get() @ApiBearerAuth('') @ApiResponse(
    { status: 201, description: 'Successful Registration' }) @ApiResponse(
    { status: 400, description: 'Bad Request' }) @ApiResponse(
    { status: 401, description: 'Unauthorized' })
  async connect(@Req() request: Request, @Body() body) {
    console.log(request, '<========== request');
    console.log(body, '<========== body');
    return this.jotformService.connect();
  }
}
