import { Component } from "react";
import "./WeatherHud.css";
import WeatherHudProps from "./Interface/WeatherHudProps";
import WeatherHudState from "./Interface/WeatherHudState";
import WeatherIconProps from "../weatherAnimatedIcons/interface/WeatherIconProps";

class WeatherHud extends Component<WeatherHudProps, WeatherHudState> {
  constructor(props: WeatherHudProps) {
    super(props);
  }

  selectedBookingWeatherOption = this.props.weatherOptions.find((weatherOption) => {
    return weatherOption.name == this.props.weatherData.selectedWeatherOption;
  });

  render() {
    const SvgWeatherIconComponent = this.selectedBookingWeatherOption?.svg as React.FC<WeatherIconProps>;

    return (
      <div className="hud-container">
        <div
          className={`
                    hud-contents
                    hud-background
                    ${this.selectedBookingWeatherOption?.backgroundClassName}
                `}
        >
          <div className={this.selectedBookingWeatherOption?.effectClassName}>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>

          <h2 className="hud-temperature-text">
            {this.props.weatherData.selectedTemperatureOption
              ? this.props.weatherData.selectedTemperatureOption == "Cool"
                ? "<15°"
                : this.props.weatherData.selectedTemperatureOption == "Warm"
                ? "15° - 25°"
                : this.props.weatherData.selectedTemperatureOption == "Hot"
                ? ">25°"
                : ""
              : "20° - 30°"}
          </h2>

          <div className="weather-hud-grid">
            <div className={`item1 ${this.props.weatherData.selectedWeatherOption ? "font" : "font-inverted"}`}>
              {this.selectedBookingWeatherOption?.name}
            </div>

            <div className={`item2 ${this.props.weatherData.selectedWeatherOption ? "font" : "font-inverted"}`}>
              {this.props.weatherData.selectedWindOption}
            </div>

            <div className="item3">
              <div className="hud-icon-container">
                <SvgWeatherIconComponent
                  showAnimation={true}
                  className="weather-icon"
                  isWindy={this.props.isWindy}
                  //   isNight={this.props.isNight}
                />
              </div>
            </div>

            <div className="item4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherHud;
