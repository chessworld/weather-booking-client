import ApiService from "./apiService";
import { BookingResponse } from "./interfaces/bookings/BookingResponse";
import { StatsResponse } from "./interfaces/bookings/StatsResponse";
import { WeatherOption } from "./interfaces/bookings/WeatherOption";
import { Location } from "./interfaces/locations/Location";

export default class BookingEndpoint {
  static async getBookingList(userId: string): Promise<BookingResponse[]> {
    const bookingList = await ApiService.get(`/bookings/user/${userId}`).then((response) => response.data);
    return bookingList;
  }

  static async getLocations(): Promise<Location[]> {
    const locationData = await ApiService.get("/locations/").then((response) => response.data);
    return locationData;
  }

  static async getStats(): Promise<StatsResponse[]> {
    const statList = await ApiService.get("/stats/").then((response) => response.data);
    return statList;
  }

  static createBooking = async (
    userId: string,
    bookingName: string,
    location: Location,
    date: string,
    timePeriod: string,
    weatherOption: WeatherOption
  ) => {
    const body = {
      location: location,
      booking_name: bookingName,
      date: date,
      time_period: timePeriod,
      weather_option: weatherOption,
    };

    console.log(JSON.stringify(body));
    ApiService.post(`/bookings/user/${userId}/`, { ...body });
  };
}
