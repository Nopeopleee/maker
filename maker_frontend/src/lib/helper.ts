import moment from "moment";

const Helper = {
  getFormattedDate: (date: Date | string, format: string = "YYYY-MM-DD") => {
    return moment(date).format(format);
  },
};

export default Helper;
