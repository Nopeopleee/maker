import { Enum } from './enum';

export default class WebsiteTitleEnum extends Enum {
  static NO_SHOW = 0;
  static BACK = 1;
  static FRONT = 2;

  static MAP: Object = {
    [WebsiteTitleEnum.NO_SHOW]: '不顯示',
    [WebsiteTitleEnum.BACK]: '顯示在後方',
    [WebsiteTitleEnum.FRONT]: '顯示在前方',
  };
}
