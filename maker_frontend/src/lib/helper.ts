import moment from "moment";

const Helper = {
  /**
   * @description 格式化日期
   * @param date
   * @param format
   * @returns {string}
   */
  getFormattedDate: (
    date: Date | string,
    format: string = "YYYY-MM-DD"
  ): string => {
    return moment(date).format(format);
  },

  /**
   * @description 等待時間
   * @param ms
   * @returns void
   */
  sleep: (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default Helper;
