import LocationMapping from "../Interfaces/LocationMapping";

class WeatherDataExtractorFromApi {
    constructor() {
    }

    static timeToTimeObject(time: string) {
        const timeObject = new Date(time)
        return timeObject;
    };

    static timeObjectToDisplay(timeObject: Date) {
        return timeObject
            .toLocaleDateString(
                'en-US',
                {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                }
            );
    }

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

    static getInCompleteBookings(weatherData: any) {
        weatherData.filter((item: any) => {
            if (item.datetime < new Date()) {
                return false;
            }

            return true;
        })
    }

    static getCompleteBookings(weatherData: any) {
        weatherData.filter((item: any) => {
            if (item.datetime < new Date()) {
                return false;
            }

            return true;
        })
    }
}

export default WeatherDataExtractorFromApi;
