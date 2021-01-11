import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthModule } from '../health/health.module';
import { auth, database, mail } from '../../config';
import { Structure, User } from '../../entities';
import { AuthModule } from '../auth';
import { UsersModule } from '../users/users.module';
import { StructureModule } from '../structure/structure.module';
import { JotformModule } from '../jotform/jotform.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, auth, mail],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const db = config.get('database');
        db.entities = [
          User, Structure,
        ];
        return db;
      }, inject: [ConfigService],
    }), AuthModule, UsersModule, StructureModule, HealthModule, JotformModule, {
      ...JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get('auth.secret'), signOptions: {
              ...(configService.get('auth.expiresIn') ? {
                    expiresIn: configService.get('auth.expiresIn'),
                  }
                  : {
                    expiresIn: 3600,
                  }
              ),
            },

          };
        },
        inject: [ConfigService],
      }), global: true,
    },
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],

})
export class AppModule {
}
