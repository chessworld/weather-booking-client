import { useParams } from "react-router-dom";
import "./BookingDetails.css";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonHeader,
  IonIcon,
  IonImg,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import sunImage from "../assets/Icons/slight_touch_happyday.png";

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
      <div className="booking-details-toolbar">
        <IonButton
          onClick={() => props.closeBookingDetail(null)}
          className="booking-details-back-button invisible-button"
        >
          <IonIcon icon={chevronBackOutline} slot="icon-only"></IonIcon>
        </IonButton>
      </div>

      <h1 className="booking-details-title">Booking Details</h1>
      <IonCard className="booking-details-card">
        <IonCardContent>
          <div className="booking-details-content">
            <div className="booking-details-details">
              <IonCardTitle className="booking-details-details__title">
                {props.data.location}
              </IonCardTitle>
              <IonCardSubtitle className="booking-details-details__subtitle">
                {props.data.date}
              </IonCardSubtitle>
              <p className="booking-details-details__weather">
                {props.data.weather}
              </p>
            </div>
            <div className="booking-details-img-container">
              <IonImg className="booking-details-img" src={sunImage} />
            </div>
          </div>
          <IonCard className="enjoy-weather-card">
            <IonTitle className="enjoy-weather-content">
              Enjoy your weather!
            </IonTitle>
          </IonCard>

          <IonCard className="share-card">
            <IonTitle
              style={{
                display: "inline",
                fontSize: "14px",
                fontWeight: "bolder",
              }}
            >
              Share your booking with friends
            </IonTitle>
            <IonButton className="share-button" href="https://ko-fi.com/">
              Share Now!
            </IonButton>
          </IonCard>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default BookingDetails;
