import { Enum } from './enum';

export default class MenuTypeEnum extends Enum {
  static HOME = 1;
  static ABOUT = 2;
  static SOLUTION = 3;
  static CONTACT = 4;

  static MAP: Object = {
    [MenuTypeEnum.HOME]: '首頁',
    [MenuTypeEnum.ABOUT]: '關於我們',
    [MenuTypeEnum.SOLUTION]: '解決方案',
    [MenuTypeEnum.CONTACT]: '聯絡我們',
  };
}
