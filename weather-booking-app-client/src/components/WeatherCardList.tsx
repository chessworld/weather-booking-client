import { IonList, IonItem, IonCard, IonImg } from "@ionic/react";

import { useState, useEffect } from "react";
import "./WeatherCardList.css";
import sunImage from "../assets/Icons/slight_touch_happyday.png";
import rainImage from "../assets/Icons/rainy.png";
import cloudImage from "../assets/Icons/cloudy.png";
import arrowRight from "../assets/Icons/arrow-right.png";
import React from "react";
import BookingDetails from "./BookingDetails";

import BookingEndpoint from "../endpoint-caller/bookingEndpoint";

type map = {
    id: number;
    location: string;
    date: string;
    weather: string;
};

interface IWeatherCardList {
    openBookingDetail: (booking: any) => void;
    data: map[];
    upcoming: boolean;
}

const WeatherCardList: React.FC<IWeatherCardList> = (props) => {
    // TODO place all card list and card info in useState and update state with API calls.
    // TODO could try https://builtin.com/software-engineering-perspectives/use-query-react useQuery to call API.

    const [locations, setLocations] = useState<any>([]);

    useEffect(() => {
        BookingEndpoint.getLocation().then(response => {
            return response.json();
        }).then(data => {
            setLocations(data);
            console.log(data);
        })
    }, []);


    const timeToDisplay = (time: string) => {
        const formattedDate = new Date('2023-05-20').toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
        return formattedDate;
    };

    return (
        <IonList className="weather-list" lines="none">
            <div className="weather-list-container">
                {
                    props.data && (props.data.map((item: any, id: number) => (
                        <IonItem
                            key={id}
                            onClick={() => props.openBookingDetail(id + 1)}
                            className="weather-booking-item"
                        >
                            <IonCard className="weather-booking-card">
                                <div className="container-root">
                                    <div className="container-group-right">
                                        <div className="imageContainer">
                                            <IonImg
                                                className="card-weather-image"
                                                src={
                                                    (
                                                        item.weather_option.filter((option: any) => {
                                                            return option.option_type === "Weather"
                                                        })[0] ? (item.weather_option.filter((option: any) => {
                                                            return option.option_type === "Weather"
                                                        })[0].option_name ?? "None") : "None"
                                                    ).toLowerCase() === "sunny"
                                                        ? sunImage
                                                        : (
                                                            item.weather_option.filter((option: any) => {
                                                                return option.option_type === "Weather"
                                                            })[0] ? (item.weather_option.filter((option: any) => {
                                                                return option.option_type === "Weather"
                                                            })[0].option_name ?? "None") : "None"
                                                        ).toLowerCase() === "rainy"
                                                            ? rainImage
                                                            : cloudImage
                                                }
                                            />
                                        </div>
                                        <div className="container-group-text">
                                            <h1 className="card-title">
                                                {
                                                    locations[item.booking[0].location - 1] && locations[item.booking[0].location - 1].suburb
                                                }
                                            </h1>
                                            <p className="card-subtitle">
                                                {
                                                    timeToDisplay(item.booking[0].day_time.date)
                                                }
                                            </p>
                                            <p className="card-text">{
                                                item.weather_option.filter((option: any) => {
                                                    return option.option_type === "Weather"
                                                })[0] && (item.weather_option.filter((option: any) => {
                                                    return option.option_type === "Weather"
                                                })[0].option_name ?? "None")
                                            }</p>
                                        </div>
                                    </div>

                                    <IonImg className="card-arrow-image" src={arrowRight} />
                                </div>
                            </IonCard>
                        </IonItem>
                    )))}
            </div>
        </IonList>
    );
};

export default WeatherCardList;
