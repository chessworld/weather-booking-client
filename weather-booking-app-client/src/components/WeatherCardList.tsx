import {
  IonList,
  IonCardHeader,
  IonItem,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonImg,
  IonRouterOutlet,
} from "@ionic/react";
import "./WeatherCardList.css";
import sunImage from "../assets/Icons/Sun.png";
import BookingDetails from "./BookingDetails";
import { Route } from "react-router";
import { Link } from "react-router-dom";

type map = {
  id: number;
  location: string;
  date: string;
  weather: string;
};

interface IWeatherCardList {
  openBookingDetail: (booking: any) => void;
  data: map[];
}

const WeatherCardList: React.FC<IWeatherCardList> = (props) => {
  return (
    <div>
      <IonList>
        <div className="cardContainer">
          {props.data.map(({ id, location, date, weather }: map) => (
            <IonItem key={id} onClick={() => props.openBookingDetail(id)}>
              <IonCard className="weatherBookingCard">
                <IonCardHeader>
                  <div className="imageContainer">
                    <IonImg src={sunImage} />
                  </div>
                  <IonCardTitle>{location}</IonCardTitle>
                  <IonCardSubtitle>{date}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>{weather}</IonCardContent>
              </IonCard>
            </IonItem>
          ))}
        </div>
      </IonList>
    </div>
  );
};

export default WeatherCardList;
