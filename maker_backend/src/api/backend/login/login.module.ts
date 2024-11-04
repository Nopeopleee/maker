import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [LoginController],
  providers: [LoginService, AdminService, JwtService],
})
export class LoginModule {}
