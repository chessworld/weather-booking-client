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
      <h1 className="booking-details-title" style={{ padding: "1rem 0 0 1.5rem" }}>
        Confirm Booking
      </h1>
      <IonCard className="confirm-booking-details-card">
        <IonCardContent className="booking-detail-container">
          <div className="booking-details-content">
            <div className="booking-details-details" style={{ paddingTop: 0 }}>
              <IonCardTitle className="booking-details-details__title" style={{ fontSize: "1rem" }}>
                {props.weatherBookingDetails.bookingDetails.location}
              </IonCardTitle>
              <IonCardSubtitle className="booking-details-details__weather">
                {props.weatherBookingDetails.selectedWeatherOption},{" "}
                {props.weatherBookingDetails.selectedTemperatureOption},{" "}
                {props.weatherBookingDetails.selectedWindOption}
              </IonCardSubtitle>
              <IonCardSubtitle className="booking-details-details__subtitle">
                {formatDate(
                  props.weatherBookingDetails.bookingDetails.dateTime as string,
                  props.weatherBookingDetails.bookingDetails.timePeriod!
                )}
              </IonCardSubtitle>
            </div>
            <div className="booking-details-img-container">
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
            location={{
              suburb: props.weatherBookingDetails.bookingDetails.suburb!,
              state: props.weatherBookingDetails.bookingDetails.state!,
              postcode: props.weatherBookingDetails.bookingDetails.postcode!,
              country: props.weatherBookingDetails.bookingDetails.country!,
            }}
            date={props.weatherBookingDetails.bookingDetails.dateTime!}
            weather_option={{
              weather: props.weatherBookingDetails.selectedWeatherOption,
              temperature: props.weatherBookingDetails.selectedTemperatureOption,
              wind: props.weatherBookingDetails.selectedWindOption,
            }}
            time_period={props.weatherBookingDetails.bookingDetails.timePeriod!}
            booking_name={props.weatherBookingDetails.bookingDetails.name!}
          />
        </IonCardContent>
      </IonCard>
      <div
        className="button-container"
        style={{
          width: "100vw",
        }}
      >
        <div className="book-button" onTouchEnd={props.book}>
          Confirm
        </div>
      </div>
    </>
  );
};

export default withRouter(ConfirmBookingDetails);
