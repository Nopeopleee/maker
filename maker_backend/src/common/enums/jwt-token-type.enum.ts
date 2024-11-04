import { Enum } from './enum';

export default class JwtTokenTypeEnum extends Enum {
  static ADMIN_AUTH = 1;
  static MEMBER_AUTH = 2;
  static VERIFY_EMAIL = 3;
  static RESET_PASSWORD = 4;
  static FORGET_PASSWORD = 5;

  static MAP: Object = {
    [JwtTokenTypeEnum.ADMIN_AUTH]: 'Admin Authentication',
    [JwtTokenTypeEnum.MEMBER_AUTH]: 'Member Authentication',
    [JwtTokenTypeEnum.VERIFY_EMAIL]: 'Verify Email',
    [JwtTokenTypeEnum.RESET_PASSWORD]: 'Reset Password',
    [JwtTokenTypeEnum.FORGET_PASSWORD]: 'Forget Password',
  };
}
