import React from 'react';

type BookingDetails = {
  dateTime: string | null;
  location: string | null;
  name: string | null;
  timePeriod?: string | null;
}

interface BookingPageState {
    [category: string]: any;
    bookingDetails: BookingDetails;
    temperatureOptions: { [catagory: string]: any };
    weatherOptions: {
        name: string,
        effectClassName: string,
        backgroundClassName: string,
        svg: React.FC<any>,
        image?: any,
    }[];
    selectedWeatherOption: number;
    selectedWindOption: number;
    selectedTemperatureOption: number;
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
    typeof obj === 'object' &&
    'dateTime' in obj &&
    typeof obj.dateTime === 'string' &&
    'location' in obj &&
    typeof obj.location === 'string' &&
    'name' in obj &&
    typeof obj.name === 'string'
    //   &&
    // 'timePeriod' in obj &&
    // typeof obj.timePeriod === 'string'
  );
}

export type { BookingPageState, BookingDetails };
export { isBookingDetails};

