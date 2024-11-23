import { Injectable } from '@nestjs/common';

// Services
import { GenerateSnService } from '../generate-sn/generate-sn.service';

// Bcrypt
import * as bcrypt from 'bcrypt';
import { ConnectDto } from 'src/common/dtos/connect.dto';

// Moment
import * as moment from 'moment-timezone';

@Injectable()
export class HelperService {
  constructor(private readonly generateSnService: GenerateSnService) {}

  /**
   * @description 產生隨機字串
   * @param length
   * @param uppercase
   * @returns string
   */
  generateRandomString(length: number, uppercase = false): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    if (uppercase) result = result.toUpperCase();

    return result;
  }

  /**
   * @description 產生唯一序號
   * @param prefix
   * @param table
   * @param column
   * @returns string
   */
  async generateSn(
    prefix: string,
    table: string,
    column = 'sn',
  ): Promise<string> {
    return await this.generateSnService.generateSn(prefix, table, column);
  }

  /**
   * @description 雜湊密碼
   * @param password
   * @returns string
   */
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * @description 轉換資料為選項
   * @param data
   * @param column1
   * @param column2
   * @param prefix
   * @returns { id: number, title: string }[]
   */
  convertToOptions(
    data: any[],
    column1: string,
    column2: string,
    prefix?: string,
    parentColumn?: string,
  ): { id: number; title: string }[] {
    parentColumn &&
      (data = data.map((item) => {
        if (item[parentColumn]) {
          const parent = data.find((d) => d[column1] === item[parentColumn]);
          if (!parent) return item;
          item[column2] = `${parent[column2]} > ${item[column2]}`;
        }
        return item;
      }));

    return data.map((item) => {
      const pre = prefix?.repeat(item.level) || '';
      return {
        id: item[column1],
        title: pre ? `${pre}${item[column2]}` : item[column2],
      };
    });
  }

  /**
   * @description 轉換資料給 prisma connect 使用
   * @param data
   * @param column
   * @returns { connect: { id: number }[] }
   */
  convertToConnect<T>(data: Array<T>): ConnectDto {
    return {
      connect: data.map((item) => ({ id: item['id'] ?? item })) || [],
    };
  }

  /**
   * @description 將資料轉換為陣列
   * @param data[]
   * @param column
   */
  convertToArray(data: any[], column: string): any[] {
    return data.map((item) => item[column]);
  }

  /**
   * @description 將資料轉換為物件
   * @param data[]
   * @param column1
   * @param column2
   */
  convertToObject(
    data: any[],
    column1: string,
    column2: string,
  ): { [key: string]: any } {
    return data.reduce((acc, item) => {
      acc[item[column1]] = item[column2];
      return acc;
    }, {});
  }

  /**
   * @description 將產品屬性以產品屬性組分組
   * @param data
   * @returns { [key: string]: ProductAttributesDto[] }
   */
  groupProductAttributeByAttributeGroup(data: any[]): { [key: string]: any[] } {
    return data.reduce((acc, map) => {
      const groupName = map.attribute.group.name;
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(map);
      return acc;
    }, {});
  }

  unGroupProductAttributeByAttributeGroup(groupedData: {
    [key: string]: any[];
  }): any[] {
    const groupData = Object.values(groupedData).flat();
    return groupData.map((item) => {
      if (item.discount && item.price) {
        item.final_price = Math.min(item.price, item.discount);
        if (item.price < item.discount) item.discount = 0;
      } else {
        item.final_price = item.price;
      }

      return {
        product_id: item.product_id,
        attribute_id: item.attribute_id,
        stock: item.stock,
        price: item.price,
        discount: item.discount,
        final_price: item.final_price,
      };
    });
  }

  /**
   * @description 產生優惠券代碼
   * @param length = 8
   * @returns string
   */
  generateCouponCode(length = 8): string {
    return this.generateRandomString(length, true);
  }

  /**
   * @description 取得操作文字
   * @param action
   * @returns string
   */
  getActionText(action: string): string {
    switch (action) {
      case 'create':
        return '新增';
      case 'update':
        return '編輯';
      case 'delete':
        return '刪除';
      default:
        return '';
    }
  }

  /**
   * @description BASE64 編碼
   * @param data
   * @returns string
   */
  base64Encode(data: string): string {
    return Buffer.from(data).toString('base64');
  }

  /**
   * @description 合併多個物件
   * @param objects
   * @returns object
   */
  mergeObjects(...objects: any[]): any {
    return Object.assign({}, ...objects);
  }

  /**
   * @description 取得某日期是星期幾
   * @param date
   * @returns string
   */
  getWeekday(date: Date): string {
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    return weekdays[date.getDay()];
  }

  /**
   * @description 格式化日期
   * @param date
   * @param format?
   * @returns string
   */
  formatDate(date: Date | string, format = 'YYYY-MM-dd HH:mm:ss'): string {
    return moment(date).format(format);
  }

  /**
   * @description 產生alias
   * @returns string
   */
  createAlias(): string {
    return this.formatDate(new Date(), 'YYYYMMDD_HHmmss');
  }

  /**
   * @description 轉換 where 條件
   * @param keywordOR
   * @param OR
   * @param keywordAND
   * @param AND
   * @param keywordNOT
   * @param NOT
   * @returns object
   */
  convertWhereCondition(params: {
    keywordOR?: string;
    OR?: Array<string>;
    keywordAND?: string;
    AND?: Array<string>;
    keywordNOT?: string | number;
    NOT?: string;
  }): any {
    const { keywordOR, OR, keywordAND, AND, keywordNOT, NOT } = params;
    let where: any = {};

    if (OR && keywordOR) {
      where.OR = OR.map((item) => ({ [item]: { contains: keywordOR } }));
    }
    if (AND && keywordAND) {
      where.AND = AND.map((item) => ({ [item]: { contains: keywordAND } }));
    }
    if (NOT && keywordNOT) {
      where.NOT = { [NOT]: keywordNOT };
    }

    return where;
  }

  /**
   * @description 取得最大值
   * @param numbers
   * @returns number
   */
  getMax(...numbers: number[]): number {
    return Math.max(...numbers);
  }

  /**
   * @description 取得最小值
   * @param numbers
   * @returns number
   */
  getMin(...numbers: number[]): number {
    return Math.min(...numbers);
  }

  /**
   * @description 取得字串長度
   * @param str
   * @returns number
   */
  getStringWidth(str: string): number {
    let width = 0;
    for (const char of str) {
      if (char.charCodeAt(0) > 255) {
        width += 2;
      } else {
        width += 1;
      }
    }
    return width;
  }

  /**
   * @description 等待
   * @param ms 毫秒
   * @returns Promise
   */
  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
}
