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

  /**
   * @description 計算檔案大小
   * @param size
   * @returns {string}
   */
  fileSizes: (size: number): string => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },
};

export default Helper;
