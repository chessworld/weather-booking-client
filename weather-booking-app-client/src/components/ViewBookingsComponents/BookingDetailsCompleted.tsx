import "./BookingDetails.css";
import "./BookingDetailsCompleted.css";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonImg,
    IonTitle,
} from "@ionic/react";
import {
    chevronBackOutline,
    thumbsUpSharp,
    thumbsDownSharp,
    arrowForwardOutline,
} from "ionicons/icons";

import sunImage from "../../assets/Icons/slight_touch_happyday.png";
import { useState } from "react";
import WeatherDataExtractorFromApi from "./Utility/WeatherDataExtractorFromApi";

type map = {
    id: number;
    location: string;
    date: string;
    weather: string;
    datetime: any
};

interface IWeatherCardList {
    closeBookingDetail: (booking: any) => void;
    data: map;
}

const BookingDetailsCompleted: React.FC<IWeatherCardList> = (props) => {
    const [thumbUp, setThumbUp] = useState<boolean | null>(null);

    const handleThumbUpClick = () => {
        setThumbUp(true);
    };

    const handleThumbDownClick = () => {
        setThumbUp(false);
    };

    return (
        <div>
            <div className="booking-details-toolbar">
                <IonButton
                    onClick={() => props.closeBookingDetail(null)}
                    className="booking-details-back-button invisible-button"
                >
                    <IonIcon icon={chevronBackOutline} slot="icon-only"></IonIcon>
                </IonButton>
            </div>

            <h1 className="booking-details-title"> Booking Details</h1>
            <IonCard className="booking-details-card">
                <IonCardContent>
                    <div className="booking-details-content">
                        <div className="booking-details-details">
                            <IonCardTitle className="booking-details-details__title">
                                {props.data.location}
                            </IonCardTitle>
                            <IonCardSubtitle className="booking-details-details__subtitle">
                                {
                                    WeatherDataExtractorFromApi.timeObjectToDisplay(props.data.datetime)
                                }
                            </IonCardSubtitle>
                            <p className="booking-details-details__weather">
                                {props.data.weather}
                            </p>
                        </div>
                        <div className="booking-details-img-container">
                            <IonImg className="booking-details-img" src={sunImage} />
                        </div>
                    </div>
                    <IonCard className="enjoy-weather-card">
                        <div className="enjoy-weather-content">
                            Enjoy your weather!
                        </div>
                    </IonCard>

                    <IonCard className="share-card">
                        <div className="share-card__title">
                            Share your booking with friends
                        </div>
                        <IonButton className="share-button" href="https://ko-fi.com/">
                            Share Now
                            <IonIcon icon={arrowForwardOutline}></IonIcon>
                        </IonButton>
                    </IonCard>
                </IonCardContent>
            </IonCard>

            <h1 className="booking-details-title"> Feedback</h1>
            <IonCard className="booking-details-card">
                <IonCardContent>
                    <IonCard className="enjoy-weather-card" id="feedback-card">
                        <IonTitle id="feedback-content">
                            Did you enjoy your weather?
                        </IonTitle>
                        <div className="thumb-group">
                            <IonButton
                                className="thumb-button invisible-button"
                                onClick={() => handleThumbUpClick()}
                            >
                                <IonIcon
                                    icon={thumbsUpSharp}
                                    className={`${thumbUp ? "thumb-selected" : ""}`}
                                ></IonIcon>
                            </IonButton>
                            <IonButton
                                className="thumb-button invisible-button"
                                onClick={() => handleThumbDownClick()}
                            >
                                <IonIcon
                                    icon={thumbsDownSharp}
                                    className={`${thumbUp === false ? "thumb-selected" : ""}`}
                                ></IonIcon>
                            </IonButton>
                        </div>
                    </IonCard>

                    <IonCard className="coffee-card">
                        <div className="share-card__title">Buy us a coffee</div>
                        <IonButton className="share-button" href="https://ko-fi.com/">
                            Donate
                            <IonIcon icon={arrowForwardOutline}></IonIcon>
                        </IonButton>
                    </IonCard>
                </IonCardContent>
            </IonCard>
        </div>
    );
};

export default BookingDetailsCompleted;
