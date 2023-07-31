type WeatherIconProps = {
    style?: {
        [category: string]: string | number
    }
    showAnimation?: boolean,
    isNight?: boolean,
    isWindy?: boolean,
    className?: string
}

export default WeatherIconProps;
