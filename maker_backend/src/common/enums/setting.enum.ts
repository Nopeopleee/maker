import { Enum } from './enum';

export default class SettingEnum extends Enum {
  static WEBSITE = 1;
  static CONTACT = 2;
  static SECRET = 11;

  static MAP: Object = {
    [SettingEnum.WEBSITE]: '網站設定',
    [SettingEnum.CONTACT]: '聯絡資訊',
    [SettingEnum.SECRET]: '密鑰設定',
  };
}
