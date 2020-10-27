import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '../health/health.module';
import configuration from '../../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
