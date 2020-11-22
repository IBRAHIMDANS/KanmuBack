import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthModule } from '../health/health.module';
import { auth, database, mail } from '../../config';
import { User } from '../../entities';
import { AuthModule } from '../auth';
import { BackOfficeModule } from '../backoffice/backoffice.module';
import AdminUser from 'nestjs-admin/dist/src/adminUser/adminUser.entity';
import Players from '../../entities/Player.entity';


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
          User,
          Players,
          AdminUser,
        ];
        return db;
      },
      inject: [ConfigService],
    }),
    AuthModule,
    HealthModule,
    BackOfficeModule,
    {
      ...JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get('auth.secret'),
            signOptions: {
              ...(
                configService.get('auth.expiresIn')
                  ? {
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
  exports: [JwtModule, BackOfficeModule],

})
export class AppModule {
}
