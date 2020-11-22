import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
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
