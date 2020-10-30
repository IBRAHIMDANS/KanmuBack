// // src/backoffice/credentialValidator.ts
// import { UserAdmin } from '../../entities';
// import {getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
//
// export const adminCredentialValidator = {
//   inject: [getRepositoryToken(UserAdmin)], // injects the UserAdmin repository in the factory
//   useFactory: (userRepository: Repository<UserAdmin>) => {
//     // You can now return a function to validate the credentials
//     return async function validateCredentials(email: string, password: string) {
//       const user: UserAdmin | null = await userRepository.findOne({ email });
//       // Note: here we're assuming the password is in plaintext in the database.
//       // Never do that in a real app! You should hash your password and compare hashes
//       if (user && user.isAdmin && password === user.password) {
//         return user;
//       }
//       return null; // The credentials do not identify an administor
//     };
//   },
// };
