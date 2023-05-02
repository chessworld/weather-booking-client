import {
    IonList,
    IonItem,
    IonCard,
    IonImg,
} from "@ionic/react";

import { useState, useEffect } from "react";
import "./WeatherCardList.css";
import sunImage from "../assets/Icons/Sun.png";
import arrowRight from "../assets/Icons/arrow-right.png";
import React from 'react';
import BookingDetails from "./BookingDetails";

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
    // TODO place all card list and card info in useState and update state with API calls.
    // TODO could try https://builtin.com/software-engineering-perspectives/use-query-react useQuery to call API.
    
    return (
        <div>
            <IonList>
                <div className="cardContainer" style={{background: 'transparent'}}>
                    {
                        props.data.map(({ id, location, date, weather }: map) => (
                            <IonItem key={id} onClick={() => props.openBookingDetail(id)}>
                                <IonCard className="weather-booking-card">
                                    <div className="container-root">
                                        <div className="container-group-right">
                                            <div className="imageContainer">
                                                <IonImg className="card-weather-image" src={sunImage} />
                                            </div>
                                            <div className="container-group-text">
                                                <h1 className="card-title">{location}</h1>
                                                <p className="card-subtitle">{date}</p>
                                                <p className="card-text">{weather}</p>
                                            </div>
                                        </div>

                                        <IonImg className="card-arrow-image" src={arrowRight} />
                                    </div>
                                </IonCard>
                            </IonItem>
                        ))
                    }
                </div>
            </IonList>
        </div>
    );
};

export default WeatherCardList;
