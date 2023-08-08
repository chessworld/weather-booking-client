import ApiService from "./apiService";
import { BookingResponse } from "./interfaces/bookings/BookingResponse";
import { EnumResponse } from "./interfaces/enums/EnumResponse";
import { Location } from "./interfaces/locations/Location";

import DeviceManager from "../device/DeviceManager";

export default class BookingEndpoint {
  enums: EnumResponse;
  locations: Location[];
  device: DeviceManager;
  deviceId: string;

  constructor(locationData: Location[], enums: EnumResponse) {
    this.locations = locationData;
    this.enums = enums;
    this.device = DeviceManager.getInstance();
    this.deviceId = "";

    DeviceManager.getOrCreateDeviceId().then((deviceId: string) => {
        this.deviceId = deviceId;
    });
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

  createBooking = (
    location: number,
    datetime: string,
    timePeriod: string,
    windJson: { [category: string]: any },
    weatherJson: { [category: string]: any },
    temperatureJson: { [category: string]: any }
  ) => {
    const body = {
      booking: [
        {
          user: this.deviceId,
          location: location,
          day_time: {
            date: datetime,
            time_period: timePeriod == "" ? "Morning" : timePeriod,
          },
          status: "Upcoming",
          result: "Pending",
        },
      ],
      weather_option: [weatherJson, temperatureJson, windJson],
    };

    console.log(JSON.stringify( body ));

    ApiService.post("/bookings/", body).then((response) => console.log(response.data));
  };

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
}
