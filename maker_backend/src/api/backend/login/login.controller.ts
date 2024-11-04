import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Backend: Login')
@Controller('backend/login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login' })
  @Post()
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return await this.loginService.login(loginDto);
  }
}
