import "./BookingDetails.css";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonImg,
} from "@ionic/react";

import {useState, useEffect} from 'react';
import { closeOutline, arrowForwardOutline } from "ionicons/icons";
import BookingEndpoint from "../../endpoint-caller/bookingEndpoint";
import Background from '../../components/ScreenComponents/Background';

interface IWeatherCardList {
    [category: string]: any;
    closeBookingDetail: (booking: any) => void;
}


const confirmBookingDetails: React.FC<IWeatherCardList> = (props) => {
    const [locations, setLocations] = useState<any>([]);

    useEffect(() => {
        console.log(props)
        console.log(props)
        console.log(props)
        console.log(props)
        console.log(props)
        console.log(props)
        BookingEndpoint.getLocation().then(response => {
            return response.json();
        }).then(data => {
            setLocations(data);
        })
    }, []);

    const timeToDisplay = (time: string) => {
        const formattedDate = new Date('2023-05-20')
            .toLocaleDateString('en-US', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        return formattedDate;
    };

    const monthToString = (month: number) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        if (month >= 1 && month <= 12) {
            return monthNames[month - 1];
        } else {
            return "Invalid month";
        }
    }

    const dateToDisplay = (dateTime: Date) => {
        if (dateTime instanceof Date) {
            return `${ dateTime.getDate() } ${ monthToString(dateTime.getMonth() + 1) } ${ dateTime.getFullYear() }`;
        }

        return '';
    }

    return (
        <Background>
            <div className="booking-details-toolbar">
                <IonButton
                    onClick={() => props.closeBookingDetail(null)}
                    className="booking-details-back-button invisible-button"
                >
                    <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
                </IonButton>
            </div>

            <h1 className="booking-details-title">Booking Details</h1>
            <IonCard className="booking-details-card">
                <IonCardContent>
                    <div className="booking-details-content">
                        <div className="booking-details-details">
                            <IonCardTitle className="booking-details-details__title">
                                {props.data.bookingDetails.location}
                            </IonCardTitle>
                            <IonCardSubtitle className="booking-details-details__subtitle">
                                {dateToDisplay(props.data.bookingDetails.datetime)}
                            </IonCardSubtitle>
                            <p className="booking-details-details__weather">
                            </p>
                        </div>
                        <div className="booking-details-img-container">
                            <IonImg className="booking-details-img" src={
                                props.data.weatherOptions[props.data.selectedWeatherOption].image
                            } />
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
            <div
                className="button-container"
                style={{
                    marginBottom: 'vh',
                    marginTop: '10vh',
                    width: "100vw"
                }}>

                <div className="book-button"
                    style={{
                        width: "50vw"
                    }}
                    onTouchEnd={props.book}
                >
                    Confirm
                </div>
            </div>
        </Background>
    );
};

export default confirmBookingDetails;
