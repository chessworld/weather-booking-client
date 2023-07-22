type WeatherIconProps = {
    style?: {
        [category: string]: string | number
    }
    isNight?: boolean,
    isWindy?: boolean,
    className?: string
}

export default WeatherIconProps;
