import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailDataDto } from './mail-data.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly loggerService: LoggerService,
  ) {}

  /**
   * @description 發送電子郵件
   * @param data
   * @returns void
   */
  async sendEmail(data: MailDataDto, template: string): Promise<void> {
    try {
      this.loggerService.log(
        `Send email ${data.subject} to ${data.email}`,
        'send-mail',
      );

      await this.mailerService.sendMail({
        template: template,
        to: data.email,
        subject: data.subject,
        context: data.context,
      });
    } catch (error) {
      this.loggerService.error('Send email', error, 'send-mail');
    }
  }
}
