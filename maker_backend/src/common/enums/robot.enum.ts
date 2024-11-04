import { Enum } from './enum';

export default class RobotEnum extends Enum {
  static INDEX_FOLLOW = 1;
  static INDEX_NOFOLLOW = 2;
  static NOINDEX_FOLLOW = 3;
  static NOINDEX_NOFOLLOW = 4;

  static MAP: Object = {
    [RobotEnum.INDEX_FOLLOW]: '索引, 跟蹤',
    [RobotEnum.INDEX_NOFOLLOW]: '索引, 不跟蹤',
    [RobotEnum.NOINDEX_FOLLOW]: '不索引, 跟蹤',
    [RobotEnum.NOINDEX_NOFOLLOW]: '不索引, 不跟蹤',
  };
}
