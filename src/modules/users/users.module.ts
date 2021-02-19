import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities";
import { EmailModule } from "../email/email.module";
import { ConfigModule } from "@nestjs/config";
import { UsersController } from "./users.controller";
import { PassportModule } from "@nestjs/passport";
import { StructureModule } from "../structure/structure.module";
import { DefaultAdminModule, DefaultAdminSite } from "nestjs-admin";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    EmailModule,
    StructureModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    DefaultAdminModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    // Register the User entity under the "User" section
    adminSite.register("User", User);
  }
}
