import { Component } from 'react';
import './WeatherHud.css';

import Sunny from '../../assets/Icons/Sun.png';
import Rain from '../../assets/Icons/Rain.png';
import Cloud from '../../assets/Icons/Cloud.png';

interface AbcState {
    weather: string,
    windCondition: string,
    temperatureRange: [number, number],
    temperatureUnit: string
}

interface AbcProps {
    [category: string]: any;
}

class WeatherHud extends Component<AbcProps, AbcState> {
    constructor(props: AbcProps) {
        super(props)
        this.state = {
            weather: 'Sunny',
            windCondition: 'No Wind',
            temperatureRange: [20, 25],
            temperatureUnit: 'C'
        }
    }

    drawRhombus() {
        var c: any = document.getElementById("weather-hud");

        const styles = window.getComputedStyle(c);

        const width = parseInt(styles.getPropertyValue('width').replace(/[^\d]/g, ''));
        const height = parseInt(styles.getPropertyValue('height').replace(/[^\d]/g, ''));

        var ctx = c.getContext("2d");

        /* alert(width + " " + height); */

        var w = c.width;
        var h = c.height;

        var gradient = ctx.createLinearGradient(0, 0, 0, h);

        gradient.addColorStop(0, 'rgb(30,144,255)');
        gradient.addColorStop(1, 'rgba(2,0,36,1)');

        // draw the rhombus
        ctx.fillStyle = gradient;
        ctx.beginPath();

        const radius = 30;
        const slant = 0.9;

        ctx.moveTo(radius, 0);
        ctx.lineTo(w - radius, 0);
        ctx.arcTo(w, 0, w, radius, radius);

        ctx.lineTo(w, h * slant - radius);
        ctx.arcTo(w, h * slant, w - radius, h * slant, radius);

        ctx.lineTo(radius, h);
        ctx.arcTo(0, h, 0, h - radius, radius);
        ctx.arcTo(0, h, 0, h - radius, radius);

        ctx.lineTo(0, radius);
        ctx.arcTo(0, 0, radius, 0, radius);

        ctx.closePath();
        ctx.fill();
    }

    componentDidMount(): void {
        this.drawRhombus();
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        /* var windOption = this.props.weatherData.windOptions[this.props.weatherData.selectedWindOption];
* var temperatureOption = this.props.weatherData.temperatureOptions[this.props.weatherData.selectedTemperatureOption]; */
        console.log(this.props.weatherData.selectedWeatherOption);
    }

    render() {
        return (
            <div>
                <div className="hud-container">
                    <div className="hud-contents">
                        <h2 className="hud-temperature-text" >

                            {/* {this.state.temperatureRange[0]}° to { this.state.temperatureRange[1] }°C */}

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
                            <div className="item1">
                                {
                                    this.state.weather == 'Rainy' ?
                                        'Showers' :
                                        this.state.weather
                                }
                            </div>

                            <div className="item2">
                                {
                                    this.props.weatherData.windOptions[this.props.weatherData.selectedWindOption].name
                                }
                            </div>

                            <div className="item3">
                                <img src={
                                    this.props.weatherData.weatherOptions[this.props.weatherData.selectedWeatherOption].image
                                } style={{ width: "28vw" }} />
                            </div>

                            <div className="item4">
                            </div>

                        </div>
                    </div>

                    <canvas id="weather-hud">
                        canvas not supported
                    </canvas>

                </div>
            </div>
        )
    }
}

export default WeatherHud;
