// email.processor.ts

import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from 'src/common/features/mail/mail.service';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process('send_email')
  async sendEmail(job: Job): Promise<void> {
    await this.mailService.sendEmail(job.data, job.data.template);
  }
}
