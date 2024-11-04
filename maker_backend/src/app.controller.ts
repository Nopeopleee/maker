import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { HelperService } from './common/features/helper/helper.service';
import { HomepagesRepository } from './common/repository/homepages/homepages.repository';
import { BlackListService } from './common/features/black-list/black-list.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue,
    private readonly appService: AppService,
    private readonly eventEmitter: EventEmitter2,
    private readonly mailerService: MailerService,
    private readonly helper: HelperService,
    private readonly homepages: HomepagesRepository,
    private readonly blackListService: BlackListService,
  ) {}

  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Hello World' })
  @ApiResponse({ status: 200, description: 'Hello World!', type: String })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Version('test')
  @ApiOperation({ summary: 'test' })
  @ApiResponse({ status: 200, description: 'test' })
  @Get('test')
  async test(): Promise<any> {}
}
