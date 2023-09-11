import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon, IonImg } from "@ionic/react";
import { withRouter } from "react-router-dom";
import { createElement } from "react";
import { arrowForwardOutline } from "ionicons/icons";
import "./ConfirmBookingDetails.css";
import formatDate from "../../utility/formatDate";
import ConfirmBookingDetailsProps from "./Interface/ConfirmBookingDetailsProps";
import ShareCard from "../ShareComponents/ShareCard";

const ConfirmBookingDetails: React.FC<ConfirmBookingDetailsProps> = (props) => {
  const timeToDisplay = (time: string) => {
    const formattedDate = new Date("2023-05-20").toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  const monthToString = (month: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (month >= 1 && month <= 12) {
      return monthNames[month - 1];
    } else {
      return "Invalid month";
    }
  };

  const dateToDisplay = (dateTime: Date) => {
    if (dateTime instanceof Date) {
      return `${dateTime.getDate()} ${monthToString(dateTime.getMonth() + 1)} ${dateTime.getFullYear()}`;
    }

    return "";
  };

  const selectedBookingWeatherOption = props.weatherOptions.find((weatherOption) => {
    return weatherOption.name == props.weatherBookingDetails.selectedWeatherOption;
  });

  return (
    <>
      <h1 className="booking-details-title">Booking Details</h1>
      <IonCard className="booking-details-card">
        <IonCardContent className="booking-detail-container">
          <div className="booking-details-content">
            <div className="booking-details-details">
              <IonCardTitle className="booking-details-details__title">
                {props.weatherBookingDetails.bookingDetails.location}
              </IonCardTitle>
              <IonCardSubtitle className="booking-details-details__subtitle">
                {formatDate(props.weatherBookingDetails.bookingDetails.dateTime as string)}
              </IonCardSubtitle>
              <p className="booking-details-details__weather"></p>
            </div>
            <div className="booking-details-img-container">
              {/* <IonImg
                className="booking-details-img"
                src={props.weatherBookingDetails.weatherOptions[props.data.selectedWeatherOption].image}
              /> */}
              <div className="confirm-booking-weather-icon-container">
                {selectedBookingWeatherOption &&
                  createElement(selectedBookingWeatherOption?.svg, {
                    showAnimation: true,
                    className: "weather-icon",
                  })}
              </div>
            </div>
          </div>
          <ShareCard
            location={1}
            date={props.weatherBookingDetails.bookingDetails.dateTime!}
            weather_option={{
              weather: props.weatherBookingDetails.selectedWeatherOption,
              temperature: props.weatherBookingDetails.selectedTemperatureOption,
              wind: props.weatherBookingDetails.selectedWindOption,
            }}
          />
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
    </>
  );
};

export default withRouter(ConfirmBookingDetails);
