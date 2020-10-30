import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseGuards(AuthGuard())
  root(): string {
    return this.appService.root();
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

}
