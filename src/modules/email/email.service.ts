import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer'
@Injectable()
export class EmailService {
  constructor(private readonly config: ConfigService) {
  }

  async sendMailRegister (user) {
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
        user: this.config.get('mail.USERNAME'),
        pass: this.config.get('mail.PASSWORD'),
      },
      host: `in-v3.mailjet.com`,
      port: '587',
      secureConnection: false,
      ignoreTLS: false,
    });
  }
}
