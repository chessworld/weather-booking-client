import sunImage from "../../../assets/Icons/slight_touch_happyday.png";
import rainImage from "../../../assets/Icons/rainy.png";
import cloudImage from "../../../assets/Icons/cloudy.png";
import StormyImage from '../../../assets/Icons/thnderstorm.png';

const WeatherImageMapper: { [category: string]: string } = {
    Rainy: rainImage,
    cloudy: cloudImage,
    Sunny: sunImage,
    Stormy: StormyImage
}

export default WeatherImageMapper;
