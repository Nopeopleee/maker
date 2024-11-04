import { Injectable } from '@nestjs/common';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class HomeService {
  /**
   * @described Check if admin is logged in
   * @returns { string }
   */
  async checkTokenExpire(
    admin: AdminLoginDto,
  ): Promise<{ admin: AdminLoginDto }> {
    return { admin: admin };
  }
}
