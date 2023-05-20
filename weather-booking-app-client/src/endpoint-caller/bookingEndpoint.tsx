class BookingEndpoint {
    BASE_URL: string;

    constructor() {
        /* this.BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL || "http://127.0.0.1:8000/weather_api" */
        this.BASE_URL = "http://127.0.0.1:8000/weather_api"
    }

    createBooking = () => {
        const bookingsRoute = "/bookings/"
        const url = this.BASE_URL + bookingsRoute;

        const body = {
            user: '2980e92b-ea7b-4da0-8d2e-c7bce92546bb',
            location: 2,
            day_time: 1,
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

