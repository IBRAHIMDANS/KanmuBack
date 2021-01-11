import { HttpModule, Module } from '@nestjs/common';
import { JotformService } from './jotform.service';
import { JotformController } from './jotform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities';

@Module({
  providers: [
    JotformService,
  ], controllers: [JotformController], imports: [
    TypeOrmModule.forFeature([User]), HttpModule,
  ], exports: [JotformModule],
})
export class JotformModule {
}
