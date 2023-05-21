import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BookingDetails.css";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonHeader,
    IonIcon,
    IonImg,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

import { chevronBackOutline, arrowForwardOutline } from "ionicons/icons";
import sunImage from "../assets/Icons/slight_touch_happyday.png";
import rainImage from "../assets/Icons/rainy.png";
import BookingEndpoint from "../endpoint-caller/bookingEndpoint";

type map = {
    id: number;
    location: string;
    date: string;
    weather: string;
};

interface IWeatherCardList {
    [category: string]: any;
    closeBookingDetail: (booking: any) => void;
    data: map;
}

const BookingDetails: React.FC<IWeatherCardList> = (props) => {
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
        <div>
            <div className="booking-details-toolbar">
                <IonButton
                    onClick={() => props.closeBookingDetail(null)}
                    className="booking-details-back-button invisible-button"
                >
                    <IonIcon icon={chevronBackOutline} slot="icon-only"></IonIcon>
                </IonButton>
            </div>

            <h1 className="booking-details-title">Booking Details</h1>
            <IonCard className="booking-details-card">
                <IonCardContent>
                    <div className="booking-details-content">
                        <div className="booking-details-details">
                            <IonCardTitle className="booking-details-details__title">
                                {
                                    locations
                                    && (locations[props.data.booking[0].location - 1]
                                        && locations[props.data.booking[0].location - 1].suburb)
                                }
                            </IonCardTitle>
                            <IonCardSubtitle className="booking-details-details__subtitle">
                                {
                                    timeToDisplay(props.data.booking[0].day_time.date)
                                }
                            </IonCardSubtitle>
                            <p className="booking-details-details__weather">
                                {
                                    props.data.weather_option.filter((option: any) => {
                                        return option.option_type === "Weather"
                                    })[0] ? (props.data.weather_option.filter((option: any) => {
                                        return option.option_type === "Weather"
                                    })[0].option_name ?? "None") : 'Rainy'
                                }
                            </p>
                        </div>
                        <div className="booking-details-img-container">
                            <IonImg className="booking-details-img" src={rainImage} />
                        </div>
                    </div>

                    {/* Cards */}
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
        </div>
    );
};

export default BookingDetails;
