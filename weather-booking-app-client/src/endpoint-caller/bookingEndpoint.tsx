import ApiService from "./apiService";
import { BookingResponse } from "./interfaces/bookings/BookingResponse";
import { WeatherOption } from "./interfaces/bookings/WeatherOption";
import { Location } from "./interfaces/locations/Location";
import { TimePeriod } from "./interfaces/enums/TimePeriod";

export default class BookingEndpoint {
  static async getBookingList(userId: string): Promise<BookingResponse[]> {
    const bookingList = await ApiService.get(`/bookings/user/${userId}`).then((response) => response.data);
    return bookingList;
  }

  static async getLocations(): Promise<Location[]> {
    const locationData = await ApiService.get("/locations/").then((response) => response.data);
    return locationData;
  }

  static createBooking = (
    userId: string,
    location: number,
    date: string,
    timePeriod: TimePeriod,
    weatherOption: WeatherOption
  ) => {
    const body = {
      location: location,
      date: date,
      time_period: timePeriod,
      weather_option: weatherOption,
    };

    console.log(JSON.stringify(body));
    ApiService.post(`/bookings/user/${userId}/`, { ...body });
  };
}
