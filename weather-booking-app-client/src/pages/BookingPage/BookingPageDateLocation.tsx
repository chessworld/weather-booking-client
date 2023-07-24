import { Redirect, Route } from 'react-router-dom';
import { Component } from 'react';
import { Calendar } from 'react-calendar';
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
    IonIcon,
    IonHeader
} from '@ionic/react';



import { compassOutline, timeOutline } from "ionicons/icons";


import 'react-calendar/dist/Calendar.css';
import "./BookingPageDateLocation.css"
import "./BookingPage.css"
/* import Clouds from "./Clouds" */


interface AbcProps {
    [category: string]: any
}

interface AbcState {
    [category: string]: any
}

class BookingPageDateLocation extends Component<AbcProps, AbcState> {
    constructor(props: AbcProps) {
        super(props);
        this.state = {
            showCalendar: false
        }
    }

    toggleShowCalendar(): void {
        this.setState({
            ...this.state,
            showCalendar: !this.state.showCalendar,
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="booking-page-date-location-header">Book Unique Weather and Experiences</div>
                <div className="booking-page-date-location-container">
                    <div className="button-with-icon">
                        <div className="icon-with-outline">
                            <IonIcon className="button-icons" icon={compassOutline} />
                        </div>
                        <input type="text" className="booking-page-date-location-location" placeholder="Where" />
                    </div>


                    <div className="calendar-container">
                        <div className="button-with-icon">
                            <div className="icon-with-outline">
                                <IonIcon className="button-icons" icon={timeOutline} />
                            </div>
                            <input onClick={
                                () => this.toggleShowCalendar()
                            } type="text" className="booking-page-date-location-location" placeholder="Check-in" />

                            {
                                this.state.showCalendar &&
                                <div className="calendar-only-container">
                                    <Calendar />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="book-button">Continue</div>
                </div>
            </>
        )
    }
}

export default BookingPageDateLocation;
