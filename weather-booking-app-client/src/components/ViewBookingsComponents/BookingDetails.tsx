import { useContext, useState } from "react";
import "./BookingDetails.css";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonTitle,
} from "@ionic/react";
import { chevronBackOutline, arrowForwardOutline, thumbsDownSharp, thumbsUpSharp } from "ionicons/icons";
import WeatherImageMapper from "../../utility/WeatherImageMapper";
import { BookingResponse } from "../../endpoint-caller/interfaces/bookings/BookingResponse";
import { AppContext } from "../../stores/app-context";
import formatDate from "../../utility/formatDate";

interface BookingDetailsProps {
  bookingDetails: BookingResponse;
  closeBookingDetails: (id: number) => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = (props) => {
  const appCtx = useContext(AppContext);

  // Completed Booking Details Logic
  const [thumbUp, setThumbUp] = useState<boolean | null>(null);
  const handleThumbUpClick = () => {
    setThumbUp(true);
  };
  const handleThumbDownClick = () => {
    setThumbUp(false);
  };

  return (
    <div>
      <div className="booking-details-toolbar">
        <IonButton
          onClick={() => props.closeBookingDetails(0)}
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
                {appCtx.locations.length !== 0 && appCtx.locations[props.bookingDetails.location].suburb}
              </IonCardTitle>
              <IonCardSubtitle className="booking-details-details__subtitle">
                {formatDate(props.bookingDetails.date)}
              </IonCardSubtitle>
              <p className="booking-details-details__weather">
                {props.bookingDetails.weather_option.weather}, {props.bookingDetails.weather_option.temperature},{" "}
                {props.bookingDetails.weather_option.wind}
              </p>
            </div>
            <div className="booking-details-img-container">
              <IonImg
                className="booking-details-img"
                src={WeatherImageMapper[props.bookingDetails.weather_option.weather]}
              />
            </div>
          </div>

          <IonCard className="enjoy-weather-card">
            <div className="enjoy-weather-content">Enjoy your weather!</div>
          </IonCard>

          <IonCard className="share-card">
            <div className="share-card__title">Share your booking with friends</div>
            <IonButton className="share-button" href="https://ko-fi.com/">
              Share Now
              <IonIcon icon={arrowForwardOutline}></IonIcon>
            </IonButton>
          </IonCard>
        </IonCardContent>
      </IonCard>

      {props.bookingDetails.status === "Completed" && (
        <div>
          <h1 className="booking-details-title"> Feedback</h1>
          <IonCard className="booking-details-card">
            <IonCardContent>
              <IonCard className="enjoy-weather-card" id="feedback-card">
                <IonTitle id="feedback-content">Did you enjoy your weather?</IonTitle>
                <div className="thumb-group">
                  <IonButton className="thumb-button invisible-button" onClick={() => handleThumbUpClick()}>
                    <IonIcon icon={thumbsUpSharp} className={`${thumbUp ? "thumb-selected" : ""}`}></IonIcon>
                  </IonButton>
                  <IonButton className="thumb-button invisible-button" onClick={() => handleThumbDownClick()}>
                    <IonIcon
                      icon={thumbsDownSharp}
                      className={`${thumbUp === false ? "thumb-selected" : ""}`}
                    ></IonIcon>
                  </IonButton>
                </div>
              </IonCard>

              <IonCard className="coffee-card">
                <div className="share-card__title">Buy us a coffee</div>
                <IonButton className="share-button" href="https://ko-fi.com/">
                  Donate
                  <IonIcon icon={arrowForwardOutline}></IonIcon>
                </IonButton>
              </IonCard>
            </IonCardContent>
          </IonCard>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
