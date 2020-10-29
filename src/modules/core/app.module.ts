import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from '../health/health.module';
import { auth, database, mail } from '../../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, auth, mail],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const db = config.get('database');
        db.entities = [User];
        return db;
      },
      inject: [ConfigService],
    }),
    AuthModule,
    HealthModule,
    {
      ...JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get('auth.secret'),
            signOptions: {
              ...(
                configService.get('auth.expiresIn')
                  ? {
                    expiresIn: Number(configService.get('auth.expiresIn')),
                  }
                  : {}
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
