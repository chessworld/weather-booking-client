import { Redirect, Route } from 'react-router-dom';
import { Component } from 'react';
import {
    IonToast,
    IonRange,
    IonPage,
    IonItem,
    IonLabel,
    IonList,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonHeader
} from '@ionic/react';

import "./BookingPageDateLocation.css"
import "./BookingPage.css"
import Clouds from "./Clouds"


interface AbcProps {
    [category: string]: any
}

interface AbcState {
    [category: string]: any
}

class BookingPageDateLocation extends Component<AbcProps, AbcState> {
    constructor(props: AbcProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <IonPage>
                <h1 className="booking-page-date-location-header">
                Book Unique Weather and Experiences
                </h1>
                <Clouds />
                <div className="booking-page-date-location-container">
                    <input type="text" className="booking-page-date-location-location" placeholder="Where" />
                    <input type="text" className="booking-page-date-location-location" placeholder="Check-in" />
                    <div className="book-button">Continue</div>
                </div>

            </IonPage>
        )
    }
}

export default BookingPageDateLocation;
