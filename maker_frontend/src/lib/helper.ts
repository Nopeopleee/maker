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

  /**
   * @description 解析 JWT Token
   * @param token
   * @returns {JSON}
   */
  decodeToken: (token: string): JSON => {
    const payload = token.split(".")[1];
    const decodedPayload = decodeURIComponent(
      atob(payload)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(decodedPayload);
  },
};

export default Helper;
