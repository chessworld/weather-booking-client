import DeviceManager from '../device/DeviceManager';

class BookingEndpoint {
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
    } | undefined;

    location: {
        suburb: string,
        state: string,
        postcode: string,
        country: string
    }[];

    device: string

    static BASE_URL: string = "http://127.0.0.1:8000/weather_api";

    constructor(locationData: any, enums: any) {
        /* this.BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL || "http://127.0.0.1:8000/weather_api" */
        this.location = locationData;
        this.enums = enums;
        this.device = DeviceManager.getInstance();
    }

    static async getLocation(): Promise<{[category:string]: any}> {
        const locationsRoute = "/locations/"
        const url = BookingEndpoint.BASE_URL + locationsRoute;

        return fetch(url, BookingEndpoint.options('GET'))
    }


    static async getEnums(): Promise<any> {
        const enumsRoute = "/enums/"
        const url = BookingEndpoint.BASE_URL + enumsRoute;

        return fetch(url, BookingEndpoint.options('GET'));
    }

    static async create(): Promise<BookingEndpoint> {
        const response = await BookingEndpoint.getLocation();
        const locationData: any = await response.json();

        const response2 = await BookingEndpoint.getEnums();
        const enumResponse: any = await response2.json();

        return new BookingEndpoint(locationData, enumResponse);
    }

    static options(method: string, body?: { [category: string]: any }): any {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    };

    static async getBookingList(): Promise<any> {
        const bookingsRoute = "/bookings"
        const url = BookingEndpoint.BASE_URL + bookingsRoute;

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return fetch(url, options)
            .then(response => response.json())
            .catch(error => console.error('Error:', error));
    }

    static getCurrentDate(): string {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero based, so we add 1
        var dd = String(today.getDate()).padStart(2, '0'); // padStart adds leading zeros if needed

        var formattedDate = yyyy + '-' + mm + '-' + dd;
        return formattedDate
    }

    getLocationSuburbs(): string[] {
        return this.location.map((location) => location.suburb);
    }

    getLocation(): { suburb: string, state: string, postcode: string, country: string }[] {
        return this.location;
    }


    formatDate(date: Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    createBooking = (
        location: number,
        datetime: Date,
        time_period: string,
        start_time: string,
        end_time: string,
        windJson: { [category: string]: any },
        weatherJson: { [category: string]: any },
        temperatureJson: { [category: string]: any },
    ): void => {
        const bookingsRoute = "/bookings/"
        const url = BookingEndpoint.BASE_URL + bookingsRoute;

        // TODO get the user to use current device
        const body = {
            "booking": [
                {
                    "user": this.device.getDeviceId(),
                    "location": location,
                    "day_time": {
                        "date": this.formatDate( datetime ),
                        "time_period": 'Morning',
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

