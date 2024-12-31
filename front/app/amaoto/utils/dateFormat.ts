import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const dateFormat = (date: string) =>
  dayjs.utc(date).tz("Asia/Tokyo").format("YYYY/MM/DD");

export const dateTime = (date: string) =>
  dayjs.utc(date).tz("Asia/Tokyo").format("YYYY/MM/DD HH:mm");