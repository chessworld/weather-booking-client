import { BookingDetails } from "./BookingPageState"
import { RouteComponentProps } from 'react-router-dom';

interface BookingPageDateLocationProps extends RouteComponentProps {
    bookingDetails?: BookingDetails
}

export default BookingPageDateLocationProps;
