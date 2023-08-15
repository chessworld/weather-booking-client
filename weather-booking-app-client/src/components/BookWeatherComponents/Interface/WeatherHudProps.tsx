import { TemperatureLevel } from "../../../endpoint-caller/interfaces/enums/TemperatureLevel";
import { WindLevel } from "../../../endpoint-caller/interfaces/enums/WindLevel";
import { BookingPageState } from "../../../pages/BookingPage/Interface/BookingPageState";
import { BookingWeatherOption } from "../../../pages/BookingPage/Interface/BookingWeatherOptions";

interface WeatherHudProps {
  weatherData: BookingPageState;
  weatherOptions: BookingWeatherOption[];
  windOptions: WindLevel[];
  temperatureOptions: TemperatureLevel[];
  isWindy: boolean;
}

export default WeatherHudProps;
