import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;
  private readonly DEVELOP = process.env.APP_DEVELOP === 'true';

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf((info) => {
          return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
        }),
      ),
      transports: this.DEVELOP ? [new winston.transports.Console()] : [],
    });
  }

  private createFileTransport(logClass: string) {
    if (logClass.split('.').pop() !== 'log')
      logClass = `${logClass}-%DATE%.log`;

    return new DailyRotateFile({
      filename: logClass,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
      dirname: './storage/logs',
    });
  }

  log(message: string, logClass: string = 'log-%DATE%.log') {
    const fileTransport = this.createFileTransport(logClass);
    this.logger.add(fileTransport);
    this.logger.info(message);
    this.logger.remove(fileTransport);
  }

  error(message: string, trace: string, logClass: string = 'error-%DATE%.log') {
    const fileTransport = this.createFileTransport(logClass);
    this.logger.add(fileTransport);
    this.logger.error(`${trace}`);
    this.logger.remove(fileTransport);
  }

  warn(message: string, logClass: string = 'warn-%DATE%.log') {
    const fileTransport = this.createFileTransport(logClass);
    this.logger.add(fileTransport);
    this.logger.warn(message);
    this.logger.remove(fileTransport);
  }

  debug(message: string, logClass: string = 'debug-%DATE%.log') {
    const fileTransport = this.createFileTransport(logClass);
    this.logger.add(fileTransport);
    this.logger.debug(message);
    this.logger.remove(fileTransport);
  }

  verbose(message: string, logClass: string = 'verbose-%DATE%.log') {
    const fileTransport = this.createFileTransport(logClass);
    this.logger.add(fileTransport);
    this.logger.verbose(message);
    this.logger.remove(fileTransport);
  }
}
