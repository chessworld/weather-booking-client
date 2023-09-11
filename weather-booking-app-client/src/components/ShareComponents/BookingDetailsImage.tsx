import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonImg } from "@ionic/react";
import formatDate from "../../utility/formatDate";
import WeatherImageMapper from "../../utility/WeatherImageMapper";
import { AppContext } from "../../stores/app-context";
import { useContext } from "react";
import { BookingResponse } from "../../endpoint-caller/interfaces/bookings/BookingResponse";
import "./BookingDetailsImage.css";
import { WeatherOption } from "../../endpoint-caller/interfaces/bookings/WeatherOption";

interface BookingDetailsImageProps {
  location: number;
  date: string;
  weather_option: WeatherOption;
}

const BookingDetailsImage: React.FC<BookingDetailsImageProps> = (props) => {
  const appCtx = useContext(AppContext);

  return (
    <IonCard className="booking-details-image-card">
      <IonCardContent>
        <div>
          <div className="booking-details-image-details">
            <IonCardTitle className="booking-details-image-details__title">
              {appCtx.locations.length !== 0 && appCtx.locations[props.location - 1].suburb}
            </IonCardTitle>
            <IonCardSubtitle className="booking-details-image-details__subtitle">
              {formatDate(props.date)}
            </IonCardSubtitle>
            <IonCardSubtitle className="booking-details-image-details__subtitle">
              {props.weather_option.weather}, {props.weather_option.temperature}, {props.weather_option.wind}
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
