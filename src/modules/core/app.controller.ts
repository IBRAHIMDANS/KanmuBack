import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseGuards(AuthGuard())
  root() {
    return {
      Name: 'KANMU',
      Version: '1.0.0',
      DOCUMENTATION: 'api/docs'
    };
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

}
