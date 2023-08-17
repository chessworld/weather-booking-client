import { Component } from "react";
import "./WeatherHud.css";
import WeatherHudProps from "./Interface/WeatherHudProps";
import WeatherHudState from "./Interface/WeatherHudState";

class WeatherHud extends Component<WeatherHudProps, WeatherHudState> {
  constructor(props: WeatherHudProps) {
    super(props);
  }

  render() {
    const selectedBookingWeatherOption = this.props.weatherOptions.find((weatherOption) => {
      return weatherOption.name == this.props.weatherData.selectedWeatherOption;
    });

    const SvgWeatherIconComponent = selectedBookingWeatherOption?.svg;

    if (!selectedBookingWeatherOption) {
      return <div></div>;
    }

    return (
      <div className="hud-container">
        <div
          className={`
                    hud-contents
                    hud-background
                    ${selectedBookingWeatherOption?.backgroundClassName}
                `}
        >
          <h2 className="hud-temperature-text">{selectedBookingWeatherOption?.name}</h2>

          <div className="weather-hud-grid">
            <div className={`item1`}>
              {this.props.weatherData.selectedTemperatureOption
                ? this.props.weatherData.selectedTemperatureOption == "Cool"
                  ? "Cool"
                  : this.props.weatherData.selectedTemperatureOption == "Warm"
                  ? "Warm"
                  : this.props.weatherData.selectedTemperatureOption == "Hot"
                  ? "Hot"
                  : ""
                : ""}
            </div>

            <div className={`item2`}>{this.props.weatherData.selectedWindOption}</div>

            <div className="item3">
              <div className="hud-icon-container">
                {SvgWeatherIconComponent && (
                  <SvgWeatherIconComponent
                    showAnimation={true}
                    className="weather-icon"
                    isWindy={this.props.isWindy}
                    // isNight={this.props.isNight}
                  />
                )}
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
