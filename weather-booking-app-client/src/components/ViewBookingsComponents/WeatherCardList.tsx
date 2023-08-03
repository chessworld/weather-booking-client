import { IonList, IonItem, IonCard, IonImg } from "@ionic/react";
import { useState, useEffect } from "react";
import "./WeatherCardList.css";
import arrowRight from "../../assets/Icons/arrow-right.png";
import React from "react";
import BookingEndpoint from "../../endpoint-caller/bookingEndpoint";
import WeatherImageMapper from "./Mappings/WeatherImageMapper";
import { BookingResponse } from "../../endpoint-caller/interfaces/bookings/BookingResponse";
import { Location } from "../../endpoint-caller/interfaces/locations/Location";
import { book } from "ionicons/icons";

const WeatherCardList: React.FC<{ bookingListData: BookingResponse[]; openBookingDetails: (id: number) => void }> = (
  props
) => {
  const [locations, setLocations] = useState<Location[]>([]);
  useEffect(() => {
    BookingEndpoint.getLocation().then((response) => {
      setLocations(response);
    });
  }, []);

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
                      {locations.length !== 0 && locations[bookingDetails.location].suburb}
                    </h1>
                    <p className="card-subtitle">{bookingDetails.date}</p>
                    <p className="card-text">
                      {bookingDetails.weather_option.weather}, {bookingDetails.weather_option.wind},
                      {bookingDetails.weather_option.temperature}
                    </p>
                  </div>
                </div>

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
