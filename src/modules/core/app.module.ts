import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { HealthModule } from "../health/health.module";
import { auth, database, mail } from "../../config";
import { Structure, User } from "../../entities";
import { AuthModule } from "../auth";
import { UsersModule } from "../users/users.module";
import { StructureModule } from "../structure/structure.module";
import { JotformModule } from "../jotform/jotform.module";

import { DefaultAdminModule } from "nestjs-admin";


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, auth, mail],
      isGlobal: true
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {

        const db = config.get("database");
        db.entities = [
          User, Structure, "node_modules/nestjs-admin/**/*.entity.js"
          // AdminUserEntity
        ];
        return db;
      }, inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    StructureModule,
    HealthModule,
    JotformModule,
    {
      ...JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get("auth.secret"), signOptions: {
              ...(configService.get("auth.expiresIn") ? {
                    expiresIn: configService.get("auth.expiresIn")
                  }
                  : {
                    expiresIn: "24h"
                  }
              )
            }

          };
        },
        inject: [ConfigService]
      }), global: true
    },
    // AdminModule.createAdminAsync({
    //   imports: [
    //     TypeOrmModule.forFeature([AdminUser])
    //   ],
    //   inject: [
    //     ConfigService
    //   ],
    //   useFactory(args: any): Promise<AdminModuleOptions> | AdminModuleOptions {
    //     return {
    //       adminBroOptions: {
    //         resources: [AdminUser],
    //         rootPath: "/admin",
    //         branding: {
    //           companyName: "Admin | KANMU",
    //           logo: false,
    //           softwareBrothers: false
    //         }
    //       }
    //       // auth: {
    //       //   authenticate: async (email, password) => Promise.resolve({ email: 'test' }),
    //       //   cookieName: 'test',
    //       //   cookiePassword: 'testPass',
    //       // },
    //     };
    //   }
    // })
    DefaultAdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule]

})
export class AppModule {
}
