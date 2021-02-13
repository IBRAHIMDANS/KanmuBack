import { INestApplication } from '@nestjs/common';
import { Database, Resource } from 'admin-bro-typeorm';

import AdminBro from 'admin-bro';

import * as AdminBroExpress from 'admin-bro-expressjs';
import { validate } from 'class-validator';


export async function setupAdminPanel(app: INestApplication): Promise<void> {

  AdminBro.registerAdapter({ Database, Resource });
  Resource.validate = validate;

  const adminBro = new AdminBro({
    resources: [
      // AdminUserResource
    ],
    rootPath: '/admin',
    branding: {
      companyName: 'Admin | KANMU',
      logo: false,
      softwareBrothers: false,
    },
    // loginPath: '/adminPanel/login',
    // logoutPath: '/adminPanel/logout',
  });

  const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    // authenticate: (email: string) => email === 'test',
    cookieName: 'test',
    cookiePassword: 'testPass',
  });
  // const router = AdminBroExpress.buildRouter(adminBro);
  app.use(adminBro.options.rootPath, adminRouter);

}

// const AdminUserResource: ResourceWithOptions =       {
//   resource: AdminUser,
//   options: {},
// };
