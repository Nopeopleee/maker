import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import JwtTokenTypeEnum from 'src/common/enums/jwt-token-type.enum';

@Injectable()
export class JwtAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private readonly secret = process.env.JWT_SECRET;
  private readonly develop = process.env.APP_DEVELOP;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (this.develop === 'true') {
      request.admin = { sub: 1 };
      return true;
    }

    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: this.secret });

      if (decoded.type !== JwtTokenTypeEnum.ADMIN_AUTH) {
        return false;
      }

      request.admin = decoded;
      return true;
    } catch (e) {
      return false;
    }
  }
}
