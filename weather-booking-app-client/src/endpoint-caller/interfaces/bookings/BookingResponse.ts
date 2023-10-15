import { WeatherOption } from "./WeatherOption";
import { TimePeriod } from "../enums/TimePeriod";
import { BookingStatus } from "../enums/BookingStatus";
import { BookingResult } from "../enums/BookingResult";
import { Location } from "../locations/Location";
export interface BookingResponse {
  id: string;
  booking_name: string;
  user: string;
  location: Location;
  date: string;
  time_period: TimePeriod;
  weather_option: WeatherOption;
  status: BookingStatus;
  result: BookingResult;
}
