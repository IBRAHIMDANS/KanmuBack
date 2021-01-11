import {
  HttpException, HttpModuleOptions, HttpService, Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class JotformService {
  private headers: HttpModuleOptions;
  private url: string;

  constructor(@InjectRepository(
    User) private readonly userRepository: Repository<User>,
              private httpService: HttpService) {
    this.headers = {
      headers: {
        'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',
      },
    };
    this.url = `${process.env.JOTFORM_URL}${process.env.JOTFORM_KEY}`;
  }

  connect() {
    return this.httpService.get(this.url, this.headers).
      pipe(map(({ data }) => data), catchError((err: any) => throwError(
        new HttpException({ message: err.response.statusText },
          err.response.status))));
  }
}
