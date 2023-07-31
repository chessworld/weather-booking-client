import React from 'react';

interface Tab1State {
    [category: string]: any;
    bookingDetails: {
        dateTime: Date;
        location: string;
        timePeriod: string;
        name: string
    };
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

export default Tab1State;
