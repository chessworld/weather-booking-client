import { useParams } from "react-router-dom";
import { IonButton, IonIcon } from "@ionic/react";

type map = {
  id: number;
  location: string;
  date: string;
  weather: string;
};

interface IWeatherCardList {
  closeBookingDetail: (booking: any) => void;
  data: map;
}

const BookingDetails: React.FC<IWeatherCardList> = (props) => {
  console.log(props);

  return (
    <div>
      <IonButton onClick={() => props.closeBookingDetail(null)}>
        <IonIcon slot="icon-only" name="chevron-back-outline"></IonIcon>
      </IonButton>
      <h1>Booking Details</h1>
      <h2>{props.data.location}</h2>
      <h2>{props.data.date}</h2>
      <h2>{props.data.weather}</h2>
    </div>
  );
};

export default BookingDetails;
