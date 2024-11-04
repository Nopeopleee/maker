import { Enum } from './enum';

export default class SettingEnum extends Enum {
  static WEBSITE = 1;
  static SECRET = 11;

  static MAP: Object = {
    [SettingEnum.WEBSITE]: '網站設定',
    [SettingEnum.SECRET]: '密鑰設定',
  };
}
