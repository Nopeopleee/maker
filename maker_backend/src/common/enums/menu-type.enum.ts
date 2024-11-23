import { Enum } from './enum';

export default class MenuTypeEnum extends Enum {
  static HOME = 1;
  static ABOUT = 2;
  static NEWS = 3;
  static ACTIVITY = 4;
  static ALBUM = 5;
  static CONTACT = 6;
  static LINK = 7;

  static MAP: Object = {
    [MenuTypeEnum.HOME]: '首頁',
    [MenuTypeEnum.ABOUT]: '關於我們',
    [MenuTypeEnum.NEWS]: '最新消息',
    [MenuTypeEnum.ACTIVITY]: '活動資訊',
    [MenuTypeEnum.ALBUM]: '相簿',
    [MenuTypeEnum.CONTACT]: '聯絡我們',
    [MenuTypeEnum.LINK]: '外部連結',
  };
}
