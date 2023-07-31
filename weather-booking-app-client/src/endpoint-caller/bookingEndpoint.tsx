import ApiService from "./apiService";

export type WeatherOptionType = "Weather" | "Temperature" | "Wind";
export type WeatherOptionChoices =
  | "Sunny"
  | "Rainy"
  | "Cloudy"
  | "Stormy"
  | "Cool"
  | "Mild"
  | "Warm"
  | "Hot"
  | "Freezing"
  | "No Wind"
  | "Calm"
  | "Windy"
  | "Gusty";
export type WeatherValueType = "Km/h" | "Celsius";

export interface Location {
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}

export interface EnumResponse {
  weather_option_types: {
    [category: string]: WeatherOptionType;
  };
  weather_option_choices: {
    [category: string]: WeatherOptionChoices;
  };
  weather_value_type: {
    [category: string]: WeatherValueType;
  };
}

interface BookingResponse {
  booking: BookingDetails[];
  weather_option: WeatherOption[];
}

interface BookingDetails {
  id: string;
  user: string;
  location: number;
  day_time: {
    date: string;
    time_period: string;
    start_time: string;
    end_time: string;
  };
  status: "Upcoming" | "Completed" | "Cancelled";
  result: "Pending" | "Success" | "Fail";
}

interface WeatherOption {
  option_type: WeatherOptionType;
  option_name: WeatherOptionChoices;
  value_type: WeatherValueType;
}
class BookingEndpoint {
  enums: EnumResponse;
  locations: Location[];

  constructor(locationData: Location[], enums: EnumResponse) {
    /* this.BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL || "http://127.0.0.1:8000/weather_api" */
    this.locations = locationData;
    this.enums = enums;
  }

  static async create(): Promise<BookingEndpoint> {
    const locationData = await ApiService.get("/locations/").then((response) => response.data);
    const enumResponse = await ApiService.get("/enums/").then((response) => response.data);

    return new BookingEndpoint(locationData, enumResponse);
  }

  static async getBookingList(): Promise<BookingResponse[]> {
    const bookingList = await ApiService.get("/bookings").then((response) => response.data);
    return bookingList;
  }

  static async getLocation(): Promise<Location[]> {
    const locationData = await ApiService.get("/locations/").then((response) => response.data);
    return locationData;
  }

  static getCurrentDate(): string {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero based, so we add 1
    var dd = String(today.getDate()).padStart(2, "0"); // padStart adds leading zeros if needed

    var formattedDate = yyyy + "-" + mm + "-" + dd;
    return formattedDate;
  }

  getLocationSuburbs(): string[] {
    return this.locations.map((location) => location.suburb);
  }

  getLocation(): { suburb: string; state: string; postcode: string; country: string }[] {
    return this.locations;
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  createBooking = (
    location: number,
    datetime: Date,
    time_period: string,
    start_time: string,
    end_time: string,
    windJson: { [category: string]: any },
    weatherJson: { [category: string]: any },
    temperatureJson: { [category: string]: any }
  ) => {
    ApiService.post("/bookings/", {
      booking: [
        {
          user: "fab0e9fe-7b6b-41b9-95c4-59badef18c16",
          location: location,
          day_time: {
            date: this.formatDate(datetime),
            time_period: "Morning",
            start_time: start_time,
            end_time: end_time,
          },
          status: "Upcoming",
          result: "Pending",
        },
      ],
      weather_option: [weatherJson, temperatureJson, windJson],
    }).then((response) => console.log(response.data));
  };
}

export default BookingEndpoint;
