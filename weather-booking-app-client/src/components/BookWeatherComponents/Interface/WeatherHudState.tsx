import React from 'react';

interface WeatherHudState {
    windCondition: string,
    temperatureRange: [number, number],
    temperatureUnit: string
    /* SvgWeatherIconComponent: React.FC<any> */
}

export default WeatherHudState;
