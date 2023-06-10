import LocationMapping from "../Interfaces/LocationMapping";

class WeatherDataExtractorFromApi {
    constructor() {
    }

    static timeToDisplay(time: string) {
        const formattedDate = new Date(time)
            .toLocaleDateString(
                'en-US',
                {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                }
            );

        return formattedDate;
    };

    static getWeatherLocationFromIdUsingMapping(locationMapping: LocationMapping, item: any) {
        return locationMapping[item.booking[0].location - 1]
            && locationMapping[item.booking[0].location - 1].suburb
    }

    static getWeatherfromApiData(apiData: any) {
        return apiData.weather_option.filter((option: any) => {
            return option.option_type === "Weather"
        })[0]
            && (
                apiData.weather_option.filter((option: any) => {
                    return option.option_type === "Weather"
                })[0].option_name
                ?? []
            )
    }

    static filterOutBadApiData(weatherData: any) {
        if (weatherData) {
            return weatherData.filter((item: any) => {
                return item.weather !== undefined;
            })
        }

        return [];
    }
}

export default WeatherDataExtractorFromApi;
