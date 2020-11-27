import { Module } from '@nestjs/common';
import { DefaultAdminModule } from 'nestjs-admin';

// const AdminUser = require('nestjs-admin').AdminUserEntity;

// const CoreModule = AdminCoreModuleFactory.createAdminCoreModule({})
// const AuthModule = AdminAuthModuleFactory.createAdminAuthModule({
//   adminCoreModule: CoreModule, // what admin module are you configuring authentication for
//   credentialValidator: adminCredentialValidator, // how do you validate credentials
//   imports: [TypeOrmModule.forFeature([AdminUser])], // what modules export the dependencies of the credentialValidator available
//   providers: [], // additional providers that will be instanciated and exported by the AdminAuthModuleFactory
// })

@Module({
  // imports: [CoreModule, AuthModule],
  // exports: [CoreModule, AuthModule]
  imports: [
    DefaultAdminModule,
  ],
  exports: [DefaultAdminModule],
})
export class BackOfficeModule {

  constructor() {
  }

}
