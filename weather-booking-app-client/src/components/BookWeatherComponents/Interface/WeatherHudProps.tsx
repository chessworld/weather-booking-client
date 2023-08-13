import { TemperatureLevel } from "../../../endpoint-caller/interfaces/enums/TemperatureLevel";
import { WindLevel } from "../../../endpoint-caller/interfaces/enums/WindLevel";
import { BookingWeatherOption } from "../../../pages/BookingPage/BookingPage";
import { BookingPageState } from "../../../pages/BookingPage/Interface/BookingPageState";

interface WeatherHudProps {
  weatherData: BookingPageState;
  weatherOptions: BookingWeatherOption[];
  windOptions: WindLevel[];
  temperatureOptions: TemperatureLevel[];
  isWindy: boolean;
}

export default WeatherHudProps;
