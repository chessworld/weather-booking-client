import { WeatherType } from "../../../endpoint-caller/interfaces/enums/WeatherType";
import WeatherIconProps from "../../../components/weatherAnimatedIcons/interface/WeatherIconProps";

export interface BookingWeatherOption {
  name: WeatherType;
  effectClassName: string;
  backgroundClassName: string;
  svg: React.FC<WeatherIconProps>;
}
