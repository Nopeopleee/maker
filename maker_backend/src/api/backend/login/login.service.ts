import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { jwtConfig } from 'src/config/jwt.config';
import JwtTokenTypeEnum from 'src/common/enums/jwt-token-type.enum';

@Injectable()
export class LoginService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const admin = await this.adminService.findOneByEmail(loginDto.email);
    if (admin && bcrypt.compareSync(loginDto.password, admin.password)) {
      if (!admin.status)
        throw new UnauthorizedException('帳號已被停用，請聯絡管理員');

      const payload = {
        email: admin.email,
        sub: admin.id,
        name: admin.name,
        type: JwtTokenTypeEnum.ADMIN_AUTH,
      };

      return {
        token: this.jwtService.sign(payload, jwtConfig),
      };
    }
    throw new UnauthorizedException('錯誤的帳號或密碼');
  }
}
