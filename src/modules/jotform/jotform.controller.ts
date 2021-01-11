import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JotformService } from './jotform.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('jotform') // @UseGuards(AuthGuard('jwt'))
@ApiTags('jotform')
export class JotformController {
  constructor(private readonly jotformService: JotformService) {
  }

  @Post()
  @ApiBearerAuth('')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseInterceptors(FilesInterceptor('files'))
  async connect(@UploadedFiles() files, @Body() body, @Res() res) {

    console.log('=================');
    console.log(files, '<================= files');
    console.log(body, '<========= body');
    console.log(res, '<========= Response');
    return body;
  }

  // @Get() @ApiBearerAuth('') @ApiResponse(
  //   { status: 201, description: 'Successful Registration' }) @ApiResponse(
  //   { status: 400, description: 'Bad Request' }) @ApiResponse(
  //   { status: 401, description: 'Unauthorized' })
  //
  // async connect(@Req() request: Request, @Body() body) {
  //   return this.jotformService.connect();
  // }

}
