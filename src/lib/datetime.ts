import dayjs from "dayjs";

export const datetimeformat = (date: any) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
};
