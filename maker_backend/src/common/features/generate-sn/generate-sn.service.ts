import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class GenerateSnService {
  constructor() {}

  /**
   * @description Generate Unique Serial Number
   * @param {string} prefix
   * @param {string} table
   * @param {string} column
   * @returns {string}
   */
  async generateSn(
    prefix: string,
    table: string,
    column: string = 'sn',
  ): Promise<string> {
    const timestamp = moment().format('YYMMDD');
    const lastRecord = await prisma[table].findFirst({
      where: {
        [column]: {
          startsWith: `${prefix}${timestamp}`,
        },
      },
      orderBy: {
        [column]: 'desc',
      },
      take: 1,
    });

    let count = 1;
    if (lastRecord) {
      const lastSn = lastRecord[column];
      const lastCount = parseInt(
        lastSn.replace(`${prefix}${timestamp}`, ''),
        10,
      );
      count = lastCount + 1;
    }

    const countStr = count.toString().padStart(3, '0');

    const result = `${prefix}${timestamp}${countStr}`;

    return result;
  }
}
