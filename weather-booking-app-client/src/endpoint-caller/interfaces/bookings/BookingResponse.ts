import { WeatherOption } from "./WeatherOption";
import { TimePeriod } from "../enums/TimePeriod";
import { BookingStatus } from "../enums/BookingStatus";
import { BookingResult } from "../enums/BookingResult";
export interface BookingResponse {
  id: string;
  user: string;
  location: number;
  date: string;
  time_period: TimePeriod;
  weather_option: WeatherOption;
  status: BookingStatus;
  result: BookingResult;
}
