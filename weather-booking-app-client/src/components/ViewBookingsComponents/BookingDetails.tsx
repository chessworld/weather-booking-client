import { useContext, useEffect, useRef, useState } from "react";
import "./BookingDetails.css";
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon, IonImg } from "@ionic/react";
import { chevronBackOutline, arrowForwardOutline, thumbsDownSharp, thumbsUpSharp } from "ionicons/icons";
import WeatherImageMapper from "../../utility/WeatherImageMapper";
import { BookingResponse } from "../../endpoint-caller/interfaces/bookings/BookingResponse";
import formatDate from "../../utility/formatDate";
import { toBlob } from "html-to-image";
import ShareCard from "../ShareComponents/ShareCard";

interface BookingDetailsProps {
  bookingDetails: BookingResponse;
  closeBookingDetails: (id: number) => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = (props) => {
  // Completed Booking Details Logic
  const [thumbUp, setThumbUp] = useState<boolean | null>(null);
  const handleThumbUpClick = () => {
    setThumbUp(true);
  };
  const handleThumbDownClick = () => {
    setThumbUp(false);
  };

  return (
    <div className="booking-details-container">
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
                {props.bookingDetails.location.suburb}, {props.bookingDetails.location.state}
              </IonCardTitle>
              <IonCardSubtitle className="booking-details-details__subtitle">
                {props.bookingDetails.weather_option.weather}, {props.bookingDetails.weather_option.temperature},{" "}
                {props.bookingDetails.weather_option.wind}
              </IonCardSubtitle>
              <IonCardSubtitle className="booking-details-details__subtitle">
                {formatDate(props.bookingDetails.date, props.bookingDetails.time_period)}
              </IonCardSubtitle>
            </div>
            <div className="booking-details-img-container">
              <IonImg
                className="booking-details-img"
                src={WeatherImageMapper[props.bookingDetails.weather_option.weather]}
              />
            </div>
          </div>
          <IonCard className="enjoy-weather-card">
            <p>Enjoy your</p>
            <p>Weather</p>
          </IonCard>
          <div className="share-card-container">
            <ShareCard {...props.bookingDetails} />
          </div>
        </IonCardContent>
      </IonCard>

      {props.bookingDetails.status === "Completed" && (
        <div>
          <h1 className="booking-details-title"> Feedback</h1>
          <IonCard className="booking-details-card">
            <IonCardContent>
              {props.bookingDetails.result === "Failed" && (
                <p className="apology-text">
                  We're sorry we couldn't fulfill your request...
                  <br /> We will try to do better next time.
                  <br /> Please give us your feedback.
                </p>
              )}
              <IonCard className="feedback-card" id="feedback-card">
                <IonCardTitle className="feedback-title">Did you enjoy your weather?</IonCardTitle>
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
