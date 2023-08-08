import { BookingDetails } from "./BookingPageState"

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
    bookingDetails: BookingDetails
}

export default BookingPageDateLocationState;
