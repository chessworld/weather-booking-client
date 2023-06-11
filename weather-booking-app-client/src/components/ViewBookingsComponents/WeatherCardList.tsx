import { IonList, IonItem, IonCard, IonImg } from "@ionic/react";
import { useState, useEffect } from "react";
import "./WeatherCardList.css";
import arrowRight from "../../assets/Icons/arrow-right.png";
import React from "react";
import BookingEndpoint from "../../endpoint-caller/bookingEndpoint";
import WeatherImageMapper from "./Mappings/WeatherImageMapper";
import IWeatherCardList from "./Interfaces/IWeatherCardList";
import WeatherDataExtractorFromApi from "./Utility/WeatherDataExtractorFromApi";

const WeatherCardList: React.FC<IWeatherCardList> = (props) => {
    // TODO place all card list and card info in useState and update state with API calls.
    // TODO could try https://builtin.com/software-engineering-perspectives/use-query-react useQuery to call API.

    const [locationMapping, setLocations] = useState<any>([]);

    useEffect(() => {
        BookingEndpoint.getLocation().then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            setLocations(data);
        });
    }, []);


    const [weatherData, setWeatherData] = useState<any>([]);

    useEffect(() => {
        setWeatherData(props.data);
    }, [locationMapping])

    return (
        <IonList className="weather-list" lines="none">
            <div className="weather-list-container">
                {
                    weatherData && (weatherData.map((item: any, id: number) => (
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
                                                src={WeatherImageMapper[item.weather]}
                                            />
                                        </div>
                                        <div className="container-group-text">
                                            <h1 className="card-title">
                                                {
                                                    item.location
                                                }
                                            </h1>
                                            <p className="card-subtitle">
                                                {
                                                   WeatherDataExtractorFromApi.timeObjectToDisplay(item.datetime)
                                                }
                                            </p>
                                            <p className="card-text">{
                                                item.weather
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
