interface Tab1State {
    [category: string]: any;
    date: string;
    location: string;
    temperatureOptions: { [catagory: string]: any };
    weatherOptions: { name: string, image?: any }[];
    selectedWeatherOption: number;
    selectedWindOption: number;
    selectedTemperatureOption: number;
    showSuggestions?: boolean;
    locationSuggestions: string[];
    timePeriod: string;
    toast: {
        showToast: boolean;
        toastMessage: string;
    };
    showConfirmation: boolean;
}

export default Tab1State;
