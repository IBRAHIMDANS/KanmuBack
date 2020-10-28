import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer'
import { User } from '../../entities';
@Injectable()
export class EmailService {
  constructor(private readonly config: ConfigService) {
  }

  async sendMailRegister (user: User) {
    this.createTransporter().sendMail({
        from: this.config.get('mail.SENDER_EMAIL'),
        to: user.email,
        subject: 'Welcome',
        text: 'KANMU',
        html: 'KANMU',
      })
      .then((e) => {
        console.log(e);
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }
  private createTransporter() {
    return nodemailer.createTransport({
      service: 'SMTP',
      auth: {
        user: this.config.get('mail.username'),
        pass: this.config.get('mail.password'),
      },
      host: `${this.config.get('mail.host', 'in-v3.mailjet.com')}`,
      port: this.config.get('mail.port', 587),
      secureConnection: this.config.get('mail.secure'),
      ignoreTLS: false,
    });
  }
}
