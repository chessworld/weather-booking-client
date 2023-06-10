import { Component } from 'react';
import './WeatherHud.css';

interface AbcState {
    windCondition: string,
    temperatureRange: [number, number],
    temperatureUnit: string,
    hudContext?: any,
    hudHeight?: number
}

interface AbcProps {
    [category: string]: any;
}

class WeatherHud extends Component<AbcProps, AbcState> {
    constructor(props: AbcProps) {
        super(props)
        this.state = {
            windCondition: 'No Wind',
            temperatureRange: [20, 25],
            temperatureUnit: 'C',
        }
    }

    getHudBackgroundGradient(ctx: any, height: number, weather?: string): any {
        var gradient = ctx.createLinearGradient(0, 0, 0, height);

        if (weather == 'Sunny') {
            gradient.addColorStop(1, 'rgba(150,100,100,.5)');
            gradient.addColorStop(0, 'rgba(200,195,34,.7)');
        } else if (weather == 'Cloudy') {
            gradient.addColorStop(1, 'rgba(20,20,20,.2)');
            gradient.addColorStop(0, 'rgba(100,100,100,.2)');
        } else {
            gradient.addColorStop(0, 'rgb(30,144,255)');
            gradient.addColorStop(1, 'rgba(2,0,36,1)');

        }

        return gradient;
    }

    getHudContextDimentions(c: any): [number, number] {
        var w = c.width;
        var h = c.height;

        return [w, h];
    }

    drawRhombusForHud(ctx: any, radius: number, slant: number, h: number, w: number): void {
        ctx.beginPath();

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

    drawHud(weather?: string) {
        var c: any = document.getElementById("weather-hud");


        var ctx = c.getContext("2d");


        const [w, h] = this.getHudContextDimentions(c);

        ctx.clearRect(0, 0, w, h);

        var gradient = this.getHudBackgroundGradient(ctx, h, weather);


        ctx.fillStyle = gradient;

        const radius = 30;
        const slant = 0.9;

        this.drawRhombusForHud(ctx, radius, slant, h, w);

        this.setState(prev => {
            return {
                ...prev,
                hudContext: ctx,
                hudHeight: h
            }
        });
    }

    componentDidMount(): void {
        this.drawHud();
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps !== this.props) {
            this.drawHud(this.props.weatherData.weatherOptions[this.props.weatherData.selectedWeatherOption].name);
        }
    }

    render() {
        return (
            <div>
                <div className="hud-container">
                    <div className="hud-contents">
                        <h2 className="hud-temperature-text" >

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
                                    this.props.weatherData.weatherOptions[this.props.weatherData.selectedWeatherOption].name == 'Rainy'
                                        ? 'Rain'
                                        : this.props.weatherData.weatherOptions[this.props.weatherData.selectedWeatherOption].name
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
                                }
                                     className="hud-icon"
                                />
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
