import React from 'react';

interface Tab1State {
    [category: string]: any;
    date: string;
    location: string;
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
    timePeriod: string;
    showToast: boolean;
    toastMessage: string;
    showConfirmation: boolean;
}

export default Tab1State;
