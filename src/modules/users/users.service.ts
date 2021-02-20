import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities";
import { EmailPayload, RegisterPayload } from "../auth/payloads";
import crypto from "crypto";
import { EmailService } from "../email/email.service";
import { JwtService } from "@nestjs/jwt";
import { passwordGenerator } from "../../lib/passwordGen";
import { StructureService } from "../structure/structure.service";
import { StructurePayload } from "../structure/payload/structure.payload";
import { RegisterPasswordPayload } from "../auth/payloads/registerPassword.payload";
import { UserRoleEnum } from "../../enum/UserRoleEnum";

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>,
              private readonly structureService: StructureService,
              private readonly emailService: EmailService,
              private readonly jwtService: JwtService
  ) {
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneOrFail({ email: email });
  }

  async get(id: number) {
    return this.userRepository.findOne(id);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.createQueryBuilder("users")
      .where("users.email = :email")
      .setParameter("email", email)
      .getOne();
  }

  async createByFront(payload) {
    console.log(payload, " <=== payload");
    const {
      email,
      lastName,
      firstName,
      nameAssociation,
      createdAtStructure,
      address,
      bannerUrl,
      description,
      logoUrl,
      numberMember,
      socialNetworks,
      gameList

    } = payload;
    const existedUser = await this.getByEmail(email);
    if(existedUser) {
      throw new NotAcceptableException("User with provided email already created.");
    }
    const user = await this.userRepository.create({
      firstName,
      lastName,
      email,
      role: UserRoleEnum.USER
    });
    const password = passwordGenerator();
    user.password = password;
    await this.structureService.create({
      bannerUrl,
      name: nameAssociation,
      address,
      socialNetworks,
      gameList,
      logoUrl,
      createdAtStructure: new Date(),
      numberMember,
      description
    }).then((structure) => {
      user.structure = structure;
    });
    try {
      return await this.save(user, password).then((user) => {
        console.log(user, "<====== ");
        return {
          status: true
        };
      }).catch(error => console.log(error));
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async create(userPayload: RegisterPayload, structurePayload?: StructurePayload): Promise<Partial<User>> {
    const existedUser = await this.getByEmail(userPayload.email);
    if(existedUser) {
      throw new NotAcceptableException("User with provided email already created.");
    }
    const user = await this.userRepository.create(userPayload);
    const password = passwordGenerator();
    user.password = password;
    if(structurePayload) {
      console.log(structurePayload);
      await this.structureService.create(structurePayload).then((structure) => {
        user.structure = structure;
      });
    }
    try {
      return await this.save(user, password);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async save(user: User, password: string): Promise<Partial<User>> {
    try {
      return await this.userRepository.save(user)
        .then(async () =>
          await this.emailService.sendMailRegister(user, password))
        .catch(e => e.message);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  async SendMailForgetPassword(payload: EmailPayload) {
    return await this.userRepository.findOne(
      { where: { email: payload.email } })
      .then(async res => {
        delete res.deletedAt;
        const token = this.jwtService.sign({ id: res.id });
        return await this.emailService.sendMailForgetPassword(res, token).then(() => true).catch(() => false);
      }).catch(err => {
        throw new NotFoundException(err.error);
      });
  }

  // async resetPassword(payload: PasswordPayload, user) {
  //   return this.userRepository.findOneOrFail({ where: { email: user.email } }).then(async res => {
  //     return await this.emailService.sendMailRegister(res);
  //   }).catch(err => {
  //     throw new NotFoundException(err);
  //   });
  // }

  async resetPasswordRegister(payload: RegisterPasswordPayload) {
    if(payload.newPassword === payload.confirmNewPassword) {
      const passHash = crypto.createHmac("sha256", payload.password)
        .digest("hex");
      const newPassHash = crypto.createHmac("sha256", payload.newPassword)
        .digest("hex");
      return await this.userRepository.createQueryBuilder("users")
        .where("users.email = :email and users.password = :password")
        .setParameter("email", payload.email)
        .setParameter("password", newPassHash)
        .getOne().then(async res => {
          if(res === undefined) {
            throw new NotFoundException(res);
          }
          return await this.userRepository.createQueryBuilder("users")
            .update()
            .set({ password: newPassHash })
            .set({ isActive: true })
            .returning(["firstName", "lastName", "email"])
            .execute()
            .then(result => {
              console.log("result ==>", result);
              return result.raw[0];
            })
            .catch(err => {
              console.log(err);
            });
          // .where("id = :id", { id: 1 })
        });
    } else {

    }

    // this.userRepository.findOneOrFail({ where: { email: payload.email }, withDeleted:false }).then(async res => {
    //   console.log(res);
    // }).catch(err => {
    //   throw new NotFoundException(err);
    // });
  }

  async getByEmailAndPass(email: string, password: string): Promise<User> {
    const passHash = crypto.createHmac("sha256", password).digest("hex");
    return await this.userRepository.createQueryBuilder("users")
      .where("users.email = :email and users.password = :password and users.isActive= :isActive")
      .setParameter("email", email)
      .setParameter("password", passHash)
      .setParameter("isActive", true)
      .getOne();
  }
}
