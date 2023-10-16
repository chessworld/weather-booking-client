//NOTE: Date from API comes in format: "yyyy-mm-dd" eg "2023-08-04"
import { TimePeriod } from "../endpoint-caller/interfaces/enums/TimePeriod";

export default function formatDate(date: string, timePeriod?: TimePeriod) {
  let dateString = new Date(date).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  if (timePeriod) {
    const splitDate = dateString.split(",");
    dateString = splitDate[0].concat(` ${timePeriod},`, splitDate[1]);
  }
  return dateString;
}
