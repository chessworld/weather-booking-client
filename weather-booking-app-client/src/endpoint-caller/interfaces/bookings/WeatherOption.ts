import { TemperatureLevel } from "../enums/TemperatureLevel";
import { WeatherType } from "../enums/WeatherType";
import { WindLevel } from "../enums/WindLevel";

export interface WeatherOption {
  weather: WeatherType;
  wind: WindLevel;
  temperature: TemperatureLevel;
}
