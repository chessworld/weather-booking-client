import { BookingDetails } from "./BookingPageState"
import { Location } from "../../../endpoint-caller/interfaces/locations/Location"

interface BookingPageDateLocationState {
    bookingPageInputIds: {
        name: string,
        dateTime: string,
        location: string,
        timePeriod: string
    },
    bookingPageInputIconIds: {
        name: string,
        dateTime: string,
        location: string,
        timePeriod: string
    },
    showCalendar: boolean,
    toast: {
        showToast: boolean,
        toastDuration: number,
        toastMessage: string
    },
    bookingDetails: BookingDetails,
    locationSuggestions: Location[],
}

export default BookingPageDateLocationState;
