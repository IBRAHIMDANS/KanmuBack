import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { User } from '../../entities';
import * as mailjet from 'node-mailjet';

@Injectable()
export class EmailService {
  // private transporter;

  constructor(private readonly config: ConfigService) {
    // this.transporter = mailjet.connect(this.config.get('mail.username'), this.config.get('mail.password'));
  }

  async sendMailRegister(user: User, token?: any) {
    this.createTransporter().sendMail({
      from: 'danny@kanmu.fr',
       to: user.email,
      subject: 'Welcome',
      text: 'KANMU',
      // html: 'KANMU',
    }, function(error, info) {
      if (error) {
        console.log(error);
        return;
      }
      // console.log(this.config.get('mail.username', 'in-v3.mailjet.com'));
      console.log('Message sent', info);
      // transporter.close();
    });

    // const request = this.transporter.post('send', { version: 'v3.1' }).request({
    //   Messages: [
    //     {
    //       From: {
    //         Email: 'noreply@kanmu.fr',
    //         Name: 'KANMU',
    //       },
    //       To: user.email,
    //       TemplateID: 1,
    //       TemplateLanguage: true,
    //       Subject: 'Your email flight plan!',
    //     },
    //   ],
    // })
    // request
    //   .then(result => {
    //     console.log(result.body)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     // console.log(err.statusCode)
    //   })

  }

  createTransporter() {
    return nodemailer.createTransport({
      service: 'SMTP',
      auth: {
        user: `${this.config.get('mail.username')}`,
        pass: `${this.config.get('mail.password')}`,
      },
      host: this.config.get('mail.host', 'in-v3.mailjet.com'),
      port: this.config.get('mail.port', 587),
      secureConnection: this.config.get('mail.secure', false),
      ignoreTLS: false,
    });
  }
}
