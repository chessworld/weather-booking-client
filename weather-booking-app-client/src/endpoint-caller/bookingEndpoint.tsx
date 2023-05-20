class BookingEndpoint {
    BASE_URL: string;

    enums: {
        "weather_option_types": {
            [category: string]: string
        },
        "weather_option_choices": {
            [category: string]: string
        },
        "weather_value_type": {
            [category: string]: string
        }
    }

    constructor() {
        /* this.BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL || "http://127.0.0.1:8000/weather_api" */
        this.BASE_URL = "http://127.0.0.1:8000/weather_api";

        (async () => {
            try {
                const enums = await this.getEnums();
                console.log(enums);
                this.enums = enums;
            } catch (error) {
                console.error('Error:', error);
            }
        })();

        console.log(this.getCurrentDate());
    }

    options(method: string, body?: { [category: string]: any }): any {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    };

    getCurrentDate(): string {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero based, so we add 1
        var dd = String(today.getDate()).padStart(2, '0'); // padStart adds leading zeros if needed

        var formattedDate = yyyy + '-' + mm + '-' + dd;

        return formattedDate
    }

    getEnums = (): any => {
        if (this.enums == undefined) {
            const enumsRoute = "/enums/"
            const url = this.BASE_URL + enumsRoute;

            return fetch(url, this.options('GET'))
                .then(response => response.json())
                .catch(error => console.error('Error:', error));
        }
    }

    createBooking = (
        location: number,
        time_period: string,
        start_time: string,
        end_time: string,
        windJson: { [category: string]: any },
        weatherJson: { [category: string]: any },
        temperatureJson: { [category: string]: any },
        /* option_type: keyof typeof this.enums.weather_option_types, */
        /* option_name: keyof typeof this.enums.weather_option_choices, */
        /* value_type: keyof typeof this.enums.weather_value_types, */
        /* min_value: number, */
        /* max_value: number */
    ): void => {
        const bookingsRoute = "/bookings/"
        const url = this.BASE_URL + bookingsRoute;

        const body = {
            "booking": [
                {
                    "user": "fab0e9fe-7b6b-41b9-95c4-59badef18c16",
                    "location": location,
                    "day_time": {
                        "date": this.getCurrentDate(),
                        "time_period": time_period,
                        "start_time": start_time,
                        "end_time": end_time
                    }
                }
            ],
            "weather_option": [
                weatherJson,
                temperatureJson,
                windJson
                
            ]
        };

        console.log(JSON.stringify(body));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
}

export default BookingEndpoint;

