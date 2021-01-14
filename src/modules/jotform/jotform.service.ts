import {
  HttpException,
  HttpModuleOptions,
  HttpService,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Structure, User } from '../../entities';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UsersService } from '../users/users.service';
import { UserRoleEnum } from '../../enum/UserRoleEnum';

@Injectable()
export class JotformService {
  private headers: HttpModuleOptions;
  private url: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Structure)
    private readonly structureRepository: Repository<Structure>,
    private readonly userService: UsersService,
    private httpService: HttpService) {
    this.headers = {
      headers: {
        'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',
      },
    };
    this.url = `${process.env.JOTFORM_URL}${process.env.JOTFORM_KEY}`;
  }

  connect() {
    return this.httpService.get(this.url, this.headers).pipe(map(({ data }) => data), catchError((err: any) => throwError(
      new HttpException({ message: err.response.statusText },
        err.response.status))));
  }

  getData() {
    return this.httpService.get(this.url, this.headers).pipe(map(({ data }) => data), catchError((err: any) => throwError(
      new HttpException({ message: err.response.statusText },
        err.response.status))));
  }

  async createStrucutreByJotform(body) {
    console.log(body, '<=== ===== ====== ====== ===== ===== body');
    // {
    //   slug: 'submit/203404289844358/',
    //     q6_nomAssociation: 'KANMU',
    //   q35_adresse: {
    //   addr_line1: '6 rue des pepinieres',
    //     addr_line2: '',
    //     city: 'Vitry-Sur-Seine',
    //     state: 'Val de marne',
    //     postal: '94400',
    //     country: 'France'
    // },
    //   q19_createAtAssociation: { month: '01', day: '06', year: '2021' },
    //   q20_numberMember: '120',
    //     q40_nomEtPrenom: { prefix: ' Mr', first: 'Ibrahima', last: 'DANSOKO' },
    //   q14_emailAssociation: 'ibrahima.dansoko@outlook.com',
    //     q16_description: "Description de l'association 500 caracteres. lorem ipsum indolor Nunc id suscipit lectus. Amet eros consectetur, rhoncus est sed, cursus mauris. Quisque finibus magna congue, porttitor nisl at, congue lectus. Vestibulum vitae nisi malesuada, tempor ligula in, tristique ante. Integer pretium, sem non volutpat hendrerit, dui lacus porttitor nunc, a consequat justo nisl non purus. Quisque ullamcorper pharetra ipsum, sed porttitor sapien aliquam non. Pellentesque nisl nulla, pharetra at ante nisi",
    //   q22_gameList: {
    //   '0': 'Fifa',
    //     '1': 'Rocket League',
    //     '2': 'PUBG',
    //     other: 'Cyber Punk'
    // },
    //   q37_haveAsponsors: 'Non',
    //     q25_lesquels: '',
    //   q34_lesReseaux34: '[{"Réseau social":"Facebook","username":"ibrahimdans","liens":"http://localhost:3000"}]',
    //   q26_objectives: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id suscipit lectus. Etiam sit amet eros consectetur, rhoncus est sed, cursus mauris. Quisque finibus magna congue, porttitor nisl at, congue lectus. Vestibulum vitae nisi malesuada, tempor ligula in, tristique ante. Integer pretium, sem non volutpat hendrerit, dui lacus porttitor nunc, a consequat justo nisl non purus. Quisque ullamcorper pharetra ipsum, sed porttitor sapien aliquam non. Pellentesque nisl nulla, pharetra at ante nisi',
    //   event_id: '1610530176496_203404289844358_dveYu7l',
    //   temp_upload: {
    //   q18_banniereDe: [ 'téléchargement.png' ],
    //     q29_logoDe29: [
    //     '80178828-adorable-bébé-africain-avec-un-téléphone-et-une-tablette-petit-enfant-utilisant-des-gadgets-jouant-à-des-j.jpg'
    //   ]
    // },
    //   file_server: 'geu-sub-n7hl',
    //     banniereDe: [
    //   'https://www.jotform.com/uploads/kanmu.esport/203404289844358/4863396260916522522/t%C3%A9l%C3%A9chargement.png'
    // ],
    //   logoDe29: [
    //   'https://www.jotform.com/uploads/kanmu.esport/203404289844358/4863396260916522522/80178828-adorable-b%C3%A9b%C3%A9-africain-avec-un-t%C3%A9l%C3%A9phone-et-une-tablette-petit-enfant-utilisant-des-gadgets-jouant-%C3%A0-des-j.jpg'
    // ]
    // }
    const {
      q6_nomAssociation,
      q35_adresse,
      q19_createAtAssociation,
      q20_numberMember,
      q40_nomEtPrenom,
      q14_emailAssociation,
      q16_description,
      q22_gameList = [],
      q25_lesquels,
      q34_lesReseaux34 = [],
      q26_objectives,
      banniereDe,
      logoDe29,

    } = body;
    const newCreatedAtSt = new Date(
      Number(q19_createAtAssociation?.year),
      Number(q19_createAtAssociation?.month),
      Number(q19_createAtAssociation?.day),
    );
    const newAddress = `${q35_adresse?.addr_line1} ${q35_adresse?.postal} ${q35_adresse?.city} ${q35_adresse?.state} ${q35_adresse?.country}`;

    await this.userService.create({
      email: q14_emailAssociation,
      lastName: q40_nomEtPrenom?.last,
      firstName: q40_nomEtPrenom?.first,
      role: UserRoleEnum.USER,
    }, {
      name: q6_nomAssociation,
      createdAtStructure: newCreatedAtSt,
      address: newAddress,
      bannerUrl: banniereDe[0],
      description: q16_description,
      gameList: q22_gameList,
      logoUrl: logoDe29[0],
      numberMember: q20_numberMember,
      socialNetworks: q34_lesReseaux34,
    });
    return body;
  }


}
