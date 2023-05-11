import { useParams } from "react-router-dom";
import "./BookingDetails.css";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonTitle,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import sunImage from "../assets/Icons/Sun.png";

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
  return (
    <div>
      <IonButton onClick={() => props.closeBookingDetail(null)}>
        <IonIcon icon={chevronBackOutline} slot="icon-only"></IonIcon>
      </IonButton>

      <h1 className="booking-details-title">Booking Details</h1>
      <IonCard className="booking-details-card">
        <IonCardHeader>
          <IonCardTitle>{props.data.location}</IonCardTitle>
          <IonCardSubtitle>{props.data.date}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <p>{props.data.weather}</p>
          <div className="img-container">
            <IonImg className="booking-details-img" src={sunImage} />
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default BookingDetails;
