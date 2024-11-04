import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MailDataDto } from '../features/mail/mail-data.dto';

@Injectable()
export class SendMailListener {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  @OnEvent('email.send')
  handleCouponSendEvent(payload: MailDataDto): void {
    this.emailQueue.add('send_email', payload);
  }
}
