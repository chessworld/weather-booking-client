import { BookingDetails } from "./BookingDetails";
import { WeatherOption } from "./WeatherOption";

export interface BookingResponse {
  booking: BookingDetails[];
  weather_option: WeatherOption[];
}
