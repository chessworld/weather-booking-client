import sunImage from "../assets/Icons/slight_touch_happyday.png";
import rainImage from "../assets/Icons/rainy.png";
import cloudImage from "../assets/Icons/cloudy.png";
import StormyImage from "../assets/Icons/thnderstorm.png";
import { WeatherType } from "../endpoint-caller/interfaces/enums/WeatherType";

const WeatherImageMapper: Record<WeatherType, string> = {
  Sunny: sunImage,
  Cloudy: cloudImage,
  Stormy: StormyImage,
  Rainy: rainImage,
};

export default WeatherImageMapper;
