import { WeatherOptionChoice } from "../enums/WeatherOptionChoice";
import { WeatherOptionType } from "../enums/WeatherOptionType";
import { WeatherValueType } from "../enums/WeatherValueType";

export interface WeatherOption {
  option_type: WeatherOptionType;
  option_name: WeatherOptionChoice;
  value_type: WeatherValueType;
}
