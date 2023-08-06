import "./BookingDetails.css";
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon, IonImg } from "@ionic/react";
import { useContext, useState } from "react";
import { closeOutline, arrowForwardOutline } from "ionicons/icons";
import Background from "../../components/ScreenComponents/Background";
import { BookingResponse } from "../../endpoint-caller/interfaces/bookings/BookingResponse";
import { AppContext } from "../../stores/app-context";
import formatDate from "../../utility/formatDate";
import WeatherImageMapper from "../../utility/WeatherImageMapper";

interface confirmBookingDetailsProps {
  bookingDetails: BookingResponse;
  closeBookingDetails: (id: number) => void;
  book: () => void;
}

const confirmBookingDetails: React.FC<confirmBookingDetailsProps> = (props) => {
  const appCtx = useContext(AppContext);

  return (
    <Background>
      <div className="booking-details-toolbar">
        <IonButton
          onClick={() => props.closeBookingDetails(0)}
          className="booking-details-back-button invisible-button"
        >
          <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
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

          {/* Cards */}
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
      <div
        className="button-container"
        style={{
          marginBottom: "vh",
          marginTop: "10vh",
          width: "100vw",
        }}
      >
        <div
          className="book-button"
          style={{
            width: "50vw",
          }}
          onTouchEnd={props.book}
        >
          Confirm
        </div>
      </div>
    </Background>
  );
};

export default confirmBookingDetails;
