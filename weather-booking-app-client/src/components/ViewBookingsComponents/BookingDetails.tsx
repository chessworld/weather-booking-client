import { useContext, useEffect, useRef, useState } from "react";
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
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
} from "@ionic/react";
import { chevronBackOutline, arrowForwardOutline, thumbsDownSharp, thumbsUpSharp } from "ionicons/icons";
import WeatherImageMapper from "../../utility/WeatherImageMapper";
import { BookingResponse } from "../../endpoint-caller/interfaces/bookings/BookingResponse";
import { AppContext } from "../../stores/app-context";
import formatDate from "../../utility/formatDate";
import BookingDetailsImage from "../ShareComponents/BookingDetailsImage";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { toBlob } from "html-to-image";
import ShareCard from "../ShareComponents/ShareCard";

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
                {appCtx.locations.length !== 0 && appCtx.locations[props.bookingDetails.location - 1].suburb}
              </IonCardTitle>
              <IonCardSubtitle className="booking-details-details__subtitle">
                {formatDate(props.bookingDetails.date)}
              </IonCardSubtitle>
              <IonCardSubtitle className="booking-details-details__subtitle">
                {props.bookingDetails.weather_option.weather}, {props.bookingDetails.weather_option.temperature},{" "}
                {props.bookingDetails.weather_option.wind}
              </IonCardSubtitle>
            </div>
            <div className="booking-details-img-container">
              <IonImg
                className="booking-details-img"
                src={WeatherImageMapper[props.bookingDetails.weather_option.weather]}
              />
            </div>
          </div>

          <IonCard className="enjoy-weather-card">Enjoy your weather!</IonCard>

          <ShareCard {...props.bookingDetails} />
        </IonCardContent>
      </IonCard>

      {props.bookingDetails.status === "Completed" && (
        <div>
          <h1 className="booking-details-title"> Feedback</h1>
          <IonCard className="booking-details-card">
            <IonCardContent>
              {props.bookingDetails.result === "Failed" && (
                <p className="apology-text">
                  Sorry we couldn't fulfill your request!
                  <br /> We will try to do better next time. Please give us your feedback.
                </p>
              )}
              <IonCard className="enjoy-weather-card feedback-card" id="feedback-card">
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
