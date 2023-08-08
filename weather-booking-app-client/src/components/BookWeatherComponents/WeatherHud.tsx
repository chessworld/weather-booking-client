import { Component } from 'react';
import './WeatherHud.css';

import WeatherHudProps from './Interface/WeatherHudProps';
import WeatherHudState from './Interface/WeatherHudState';

class WeatherHud extends Component<WeatherHudProps, WeatherHudState> {
    constructor(props: WeatherHudProps) {
        super(props)
        this.state = {
            windCondition: 'No Wind',
            temperatureRange: [20, 25],
            temperatureUnit: 'C'
        }
    }

    render() {
        const SvgWeatherIconComponent = this.props.weatherData.weatherOptions[this.props.weatherData.selectedWeatherOption].svg;

        return (
            <div className="hud-container">
                <div className={`
                    hud-contents
                    hud-background
                    ${this.props.weatherData.weatherOptions[this.props.weatherData.selectedWeatherOption].backgroundClassName}
                `}
                >
                    <div className={this.props.weatherData.weatherOptions[this.props.weatherData.selectedWeatherOption].effectClassName}>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                    <h2 className="hud-temperature-text">

                        {
                            this.props.weatherData.temperatureOptions[this.props.weatherData.selectedTemperatureOption]
                                ? (
                                    this.props.weatherData.temperatureOptions[this.props.weatherData.selectedTemperatureOption].name == 'Freezing'
                                        ? '-10° - 0°'
                                        : this.props.weatherData.temperatureOptions[this.props.weatherData.selectedTemperatureOption].name == 'Cool'
                                            ? '0° - 10°'
                                            : this.props.weatherData.temperatureOptions[this.props.weatherData.selectedTemperatureOption].name == 'Mild'
                                                ? '10° - 20°'
                                                : this.props.weatherData.temperatureOptions[this.props.weatherData.selectedTemperatureOption].name == 'Warm'
                                                    ? '20° - 30°'
                                                    : this.props.weatherData.temperatureOptions[this.props.weatherData.selectedTemperatureOption].name == 'Hot'
                                                        ? '30° - 50°' : ''
                                ) : '20° - 30°'
                        }

                    </h2>

                    <div className="weather-hud-grid">
                        <div className={`item1 ${this.props.weatherData.selectedWeatherOption != 0 ? "font" : "font-inverted"}`}>
                            {
                                this.props.weatherData.weatherOptions[this.props.weatherData.selectedWeatherOption].name
                            }
                        </div>

                        <div className={`item2 ${this.props.weatherData.selectedWeatherOption != 0 ? "font" : "font-inverted"}`}>
                            {
                                this.props.weatherData.windOptions[this.props.weatherData.selectedWindOption].name
                            }
                        </div>

                        <div className="item3">
                            <div className="hud-icon-container">
                                <SvgWeatherIconComponent showAnimation={true} className="weather-icon" isWindy={this.props.isWindy} isNight={this.props.isNight} />
                            </div>
                        </div>

                        <div className="item4" >
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default WeatherHud;
