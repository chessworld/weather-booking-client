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
      <IonHeader>
        <IonToolbar className="booking-details-toolbar">
          <IonButton
            onClick={() => props.closeBookingDetail(null)}
            style={{ display: "inline-block" }}
          >
            <IonIcon icon={chevronBackOutline} slot="icon-only"></IonIcon>
          </IonButton>
          <IonTitle style={{ display: "inline-block" }}>
            Booking Details
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* <h1 className="booking-details-title">Booking Details</h1> */}
      <IonCard className="booking-details-card">
        <IonCardHeader>
            <IonCardTitle>{props.data && props.data.location}</IonCardTitle>
          <IonCardSubtitle>{props.data && props.data.date}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <p>{props.data && props.data.weather}</p>
          <div className="img-container">
            <IonImg className="booking-details-img" src={sunImage} />
          </div>
          <IonCard className="enjoy-weather-card">
            <IonTitle style={{ fontSize: "14px", fontWeight: "bolder" }}>
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
