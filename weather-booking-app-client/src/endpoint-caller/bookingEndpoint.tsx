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

  static createBooking = (
    userId: string,
    location: number,
    date: string,
    timePeriod: string,
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

// BookingEndpoint.getBookingList("dc1e8b64-8ea9-4e60-871d-2b35c518313a");

// BookingEndpoint.createBooking("dc1e8b64-8ea9-4e60-871d-2b35c518313a", 2, "2023-08-08", "Morning", {
//   weather: "Sunny",
//   wind: "Calm",
//   temperature: "Warm",
// });
