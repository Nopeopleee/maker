import { Enum } from './enum';

export default class HomepageTypeEnum extends Enum {
  static BANNER = 1;
  static List_CONTENT = 2;
  static INTRODUCTION = 3;

  static MAP: Object = {
    [HomepageTypeEnum.BANNER]: '首頁圖',
    [HomepageTypeEnum.List_CONTENT]: '列表',
    [HomepageTypeEnum.INTRODUCTION]: '簡介',
  };
}
