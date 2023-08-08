import ApiService from "./apiService";
import { BookingResponse } from "./interfaces/bookings/BookingResponse";
import { WeatherOption } from "./interfaces/bookings/WeatherOption";
import { Location } from "./interfaces/locations/Location";

import DeviceManager from "../device/DeviceManager";

export default class BookingEndpoint {
  static async getBookingList(userId: string): Promise<BookingResponse[]> {
    const bookingList = await ApiService.get(`/bookings/user/${userId}`).then((response) => response.data);
    return bookingList;
  }

  static async getLocations(): Promise<Location[]> {
    const locationData = await ApiService.get("/locations/").then((response) => response.data);
    return locationData;
  }

  static createBooking = (location: number, date: string, timePeriod: string, weatherOption: WeatherOption) => {
    const userId = "7b9d4e65-d545-46f2-9572-19dad9206422";
    const body = {
      location: location,
      date: date,
      time_period: timePeriod,
      weather_option: weatherOption,
    };
    ApiService.post(`/bookings/user/${userId}`, body).then((response) => console.log(response.data));
  };
}
