import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../../entities';
import * as mailjet from 'node-mailjet';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = mailjet.connect(this.config.get('mail.username'), this.config.get('mail.password'));
  }

  async sendMailRegister(user: User) {
    this.transporter
      .post('send', { 'version': 'v3.1' })
      .request({
        'Messages': [
          {
            'From': {
              'Email': 'noreply@kanmu.fr',
              'Name': 'KANMU',
            },
            'To': [
              {
                'Email': user.email,
                'Name': user.firstName,
              },
            ],
            'TemplateID': 1835785,
            'TemplateLanguage': true,
            'Subject': 'Welcome',
            'Variables': user,
          },
        ],
      }).then((result) => {
      console.log('Message sent');
      console.log(result.body);
    })
      .catch((err) => {
        console.log(err);
      });


    //   .request({
    //   from: 'noreply@kanmu.fr',
    //   to: user.email,
    //   "TemplateID": 1839843,
    //   "TemplateLanguage": true,
    //   "Subject": `Welcome ${user.firstName} to the platform KANMU`,
    //   "Variables": { user: {user} }
    // }, function(error, info) {
    //   if (error) {
    //     console.log(error);
    //     return;
    //   }
    //   // console.log(this.config.get('mail.username', 'in-v3.mailjet.com'));
    //   console.log('Message sent', info);
    //   // transporter.close();
    // });
  }

  async sendMailForgetPassword(user: User, token?: any) {

    this.transporter
      .post('send', { 'version': 'v3.1' })
      .request({
        'Messages': [
          {
            'From': {
              'Email': 'noreply@kanmu.fr',
              'Name': 'KANMU',
            },
            'To': [
              {
                'Email': user.email,
                'Name': user.firstName,
              },
            ],
            'TemplateID': 1894374,
            'TemplateLanguage': true,
            'Subject': 'Welcome',
            'Variables': { ...user, token },
          },
        ],
      }).then((result) => {
      console.log('Message sent');
      console.log(result.body);
    })
      .catch((err) => {
        console.log(err);
      });


//     this.createTransporter().sendMail({
//       from: 'noreply@kanmu.fr',
//        to: user.email,
//       subject: 'Welcome to Kanmu Team',
//       text: 'KANMU',
//        html: `
// <p>Hello ${user.firstName} ${user.lastName}, to change your password please click on the link </p>
// <a type="button" href="${this.config.get('FRONT_URL')}/#/changePassword?token=${token}">Click  </a>
//  `,
//     }, function(error, info) {
//       if (error) {
//         console.log(error);
//         return;
//       }
//       // console.log(this.config.get('mail.username', 'in-v3.mailjet.com'));
    //       console.log('Message sent', info);
    // transporter.close();
    // });
  }

  // createTransporter() {
  //   return nodemailer.createTransport({
  //     service: 'Mailjet',
  //     auth: {
  //       user: `${this.config.get('mail.username')}`,
  //       pass: `${this.config.get('mail.password')}`,
  //     },
  //     host: this.config.get('mail.host', 'in-v3.mailjet.com'),
  //     port: this.config.get('mail.port', 587),
  //     secureConnection: this.config.get('mail.secure', false),
  //     ignoreTLS: false,
  //   });
  // }
}
