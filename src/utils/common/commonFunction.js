import moment from "moment";

export const convertTimeToDate = (timeStamp, format) => {
  const date = moment.unix(timeStamp).format(format ? format : "DD-MM-YYYY");
  return date;
};
