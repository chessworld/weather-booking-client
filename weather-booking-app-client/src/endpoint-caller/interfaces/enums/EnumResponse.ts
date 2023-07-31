import { WeatherOptionType } from "./WeatherOptionType";
import { WeatherOptionChoice } from "./WeatherOptionChoice";
import { WeatherValueType } from "./WeatherValueType";

export interface EnumResponse {
  weather_option_types: {
    [category: string]: WeatherOptionType;
  };
  weather_option_choices: {
    [category: string]: WeatherOptionChoice;
  };
  weather_value_type: {
    [category: string]: WeatherValueType;
  };
}
