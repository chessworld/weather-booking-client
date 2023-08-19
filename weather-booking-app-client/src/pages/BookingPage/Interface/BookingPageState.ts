import React from "react";
import { WeatherType } from "../../../endpoint-caller/interfaces/enums/WeatherType";
import { WindLevel } from "../../../endpoint-caller/interfaces/enums/WindLevel";
import { TemperatureLevel } from "../../../endpoint-caller/interfaces/enums/TemperatureLevel";
import { TimePeriod } from "../../../endpoint-caller/interfaces/enums/TimePeriod";
type BookingDetails = {
  dateTime: string | null;
  location: string | null;
  name: string | null;
  timePeriod: TimePeriod | null;
};

interface BookingPageState {
  [category: string]: any;
  bookingDetails: BookingDetails;
  selectedWeatherOption: WeatherType;
  selectedWindOption: WindLevel;
  selectedTemperatureOption: TemperatureLevel;
  showSuggestions?: boolean;
  locationSuggestions: string[];
  toast: {
    showToast: boolean;
    toastMessage: string;
  };
  showConfirmation: boolean;
}

function isBookingDetails(obj: any): obj is BookingDetails {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "dateTime" in obj &&
    typeof obj.dateTime === "string" &&
    "location" in obj &&
    typeof obj.location === "string" &&
    "name" in obj &&
    typeof obj.name === "string"
  );
}

export type { BookingPageState, BookingDetails };
export { isBookingDetails };
