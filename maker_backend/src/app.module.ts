// App
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessInterceptor } from './common/interceptors/success-interceptor/success.interceptor';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

// Features
import { FrontendImportModule } from './common/features/frontend-import/frontend-import.module';
import { BackendImportModule } from './common/features/backend-import/backend-import.module';
import { LoggerModule } from './common/features/logger/logger.module';
import { FileServiceModule } from './api/file-service/file-service.module';
import { AuditLogService } from './common/features/audit-log/audit-log.service';
import { MailService } from './common/features/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SendMailListener } from './common/listeners/send-mail.listener';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './common/processors/email/email.processor';
import { HttpExceptionsFilter } from './common/filters/http-exceptions/http-exceptions.filter';
import { HelperModule } from './common/features/helper/helper.module';
import { RepositoryModule } from './common/repository/repository.module';
import { BlackListService } from './common/features/black-list/black-list.service';
import { BlackListModule } from './common/features/black-list/black-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: process.env.MAIL_FROM,
      },
      template: {
        dir: process.cwd() + '/src/templates/email',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
    FrontendImportModule,
    BackendImportModule,
    LoggerModule,
    FileServiceModule,
    HelperModule,
    RepositoryModule,
    BlackListModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    AuditLogService,
    MailService,
    SendMailListener,
    EmailProcessor,
    BlackListService,
  ],
})
export class AppModule {}
