import { Enum } from './enum';

export default class HomepageTypeEnum extends Enum {
  static BANNER = 1;
  static NEWS = 2;
  static ACTIVITY = 3;
  static INTRODUCTION = 4;

  static MAP: Object = {
    [HomepageTypeEnum.BANNER]: '首頁大圖',
    [HomepageTypeEnum.NEWS]: '最新消息',
    [HomepageTypeEnum.ACTIVITY]: '活動資訊',
    [HomepageTypeEnum.INTRODUCTION]: '簡介',
  };
}
