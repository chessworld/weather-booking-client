import { RouteComponentProps } from "react-router-dom";
import { BookingPageState } from "../../../pages/BookingPage/Interface/BookingPageState";
import { BookingWeatherOption } from "../../../pages/BookingPage/BookingPage";

interface ConfirmBookingDetailsProps extends RouteComponentProps {
  weatherBookingDetails: BookingPageState;
  weatherOptions: BookingWeatherOption[];
  closeBookingDetail: (booking: any) => void;
  book: () => void;
}

export default ConfirmBookingDetailsProps;
