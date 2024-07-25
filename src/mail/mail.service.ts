import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport, getTestMessageUrl } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: configService.get('SMTP_HOST'),
      port: configService.get('SMTP_PORT'),
      auth: {
        user: configService.get('SMTP_USERNAME'),
        pass: configService.get('SMTP_PASSWORD'),
      },
    });
  }
  async sendVerificationMail(email: string, token: number) {
    const ServerUrl = this.configService.get<string>('SERVER_URL');
    const url = `${ServerUrl}/auth/confirm?token=${token}`;
    console.log(url);
    try {
      console.log('sending mail tp', email);
      console.log(this.configService.get('MAIL_FROM'));

      await this.transporter
        .sendMail({
          from: `noreply${this.configService.get('MAIL_FROM')}`,
          to: email,
          subject: 'Welcome to twitter',
          html: `
          <a href='${url}'>verify</a>
        
      `,
        })
        .then((info: any) => {
          console.log(getTestMessageUrl(info));
        })
        .catch(() => {
          console.log('couldnt send');
        });

      console.log('mail sent successfully');

      return { message: 'mail sent successfully' };
    } catch (error) {
      return error.message;
    }
  }
}
