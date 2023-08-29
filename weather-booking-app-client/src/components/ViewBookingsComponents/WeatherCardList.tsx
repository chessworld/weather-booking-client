import { IonList, IonItem, IonCard, IonImg, IonIcon } from "@ionic/react";
import "./WeatherCardList.css";
import arrowRight from "../../assets/Icons/arrow-right.png";
import React, { useContext } from "react";
import WeatherImageMapper from "../../utility/WeatherImageMapper";
import { BookingResponse } from "../../endpoint-caller/interfaces/bookings/BookingResponse";
import { AppContext } from "../../stores/app-context";
import formatDate from "../../utility/formatDate";
import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";

const WeatherCardList: React.FC<{ bookingListData: BookingResponse[]; openBookingDetails: (id: number) => void }> = (
  props
) => {
  const appCtx = useContext(AppContext);
  return (
    <IonList className="weather-list" lines="none">
      <div className="weather-list-container">
        {props.bookingListData.map((bookingDetails, id: number) => (
          <IonItem key={id} onClick={() => props.openBookingDetails(id + 1)} className="weather-booking-item">
            <IonCard className="weather-booking-card">
              <div className="container-root">
                <div className="container-group-right">
                  <div className="imageContainer">
                    <IonImg
                      className="card-weather-image"
                      src={WeatherImageMapper[bookingDetails.weather_option.weather]}
                    />
                  </div>
                  <div className="container-group-text">
                    <h1 className="card-title">
                      {appCtx.locations.length !== 0 && appCtx.locations[bookingDetails.location - 1].suburb}
                    </h1>
                    <p className="card-subtitle">{formatDate(bookingDetails.date)}</p>
                    <p className="card-text">
                      {bookingDetails.weather_option.weather}, {bookingDetails.weather_option.wind},{" "}
                      {bookingDetails.weather_option.temperature}
                    </p>
                  </div>
                </div>
                {bookingDetails.result !== "Pending" && (
                  <div className="result-container">
                    {bookingDetails.result === "Successful" && (
                      <IonIcon className="result-success-icon" icon={checkmarkCircleOutline} slot="icon-only"></IonIcon>
                    )}
                    {bookingDetails.result === "Failed" && (
                      <IonIcon className="result-fail-icon" icon={closeCircleOutline} slot="icon-only"></IonIcon>
                    )}
                  </div>
                )}
                <IonImg className="card-arrow-image" src={arrowRight} />
              </div>
            </IonCard>
          </IonItem>
        ))}
      </div>
    </IonList>
  );
};

export default WeatherCardList;
