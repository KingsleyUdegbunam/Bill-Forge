import dayjs from "dayjs";
export function displayDate(date) {
  return dayjs(date).format("DD MMM YYYY");
}
