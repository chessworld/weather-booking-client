import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonImg } from "@ionic/react";
import formatDate from "../../utility/formatDate";
import WeatherImageMapper from "../../utility/WeatherImageMapper";
import "./BookingDetailsImage.css";
import { WeatherOption } from "../../endpoint-caller/interfaces/bookings/WeatherOption";
import { Location } from "../../endpoint-caller/interfaces/locations/Location";
import { TimePeriod } from "../../endpoint-caller/interfaces/enums/TimePeriod";

interface BookingDetailsImageProps {
  location: Location;
  date: string;
  weather_option: WeatherOption;
  time_period: TimePeriod;
}

const BookingDetailsImage: React.FC<BookingDetailsImageProps> = (props) => {
  let bookingDetailsImageClass;
  let textColor;
  switch (props.weather_option.weather) {
    case "Sunny":
      bookingDetailsImageClass = "sunny";
      textColor = "white";
      break;
    case "Rainy":
      bookingDetailsImageClass = "rainy";
      textColor = "white";
      break;
    case "Cloudy":
      bookingDetailsImageClass = "perfect";
      textColor = "black";
      break;
    case "Stormy":
      bookingDetailsImageClass = "stormy";
      textColor = "white";
      break;
  }

  return (
    <IonCard
      className={`booking-details-image-card hud-background ${bookingDetailsImageClass}`}
      style={{ color: `${textColor} !important` }}
    >
      <IonCardContent>
        <div>
          <div className="booking-details-image-details">
            <IonCardTitle className="booking-details-image-details__title" style={{ color: textColor }}>
              {props.location.suburb}, {props.location.state}
            </IonCardTitle>
            <IonCardSubtitle className="booking-details-image-details__subtitle" style={{ color: textColor }}>
              {props.weather_option.weather}, {props.weather_option.temperature}, {props.weather_option.wind}
            </IonCardSubtitle>
            <IonCardSubtitle className="booking-details-image-details__subtitle" style={{ color: textColor }}>
              {formatDate(props.date, props.time_period)}
            </IonCardSubtitle>
          </div>
          <div className="booking-details-image-img-container">
            <IonImg className="booking-details-image-img" src={WeatherImageMapper[props.weather_option.weather]} />
          </div>
        </div>
        <IonCard className="enjoy-weather-card">Enjoy your weather!</IonCard>
      </IonCardContent>
    </IonCard>
  );
};

export default BookingDetailsImage;
