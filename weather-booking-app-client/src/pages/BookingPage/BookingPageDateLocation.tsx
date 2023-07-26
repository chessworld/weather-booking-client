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
import type { Value } from 'react-calendar/dist/cjs/shared/types';

import 'react-calendar/dist/Calendar.css';
import "./BookingPageDateLocation.css"
import "./BookingPage.css"
/* import Clouds from "./Clouds" */


type HTMLElement = {
    [category: string]: any
}

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

    monthToString(month: Number | any) {
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

    hasValue(el: unknown): el is HTMLInputElement {
        return el instanceof HTMLInputElement && typeof el.value === "string";
    }


    render(): React.ReactNode {
        return (
            <>
                <div className="booking-page-date-location-header">
                    Book Unique Weather and Experiences
                </div>
                <div className="booking-page-date-location-container">
                    <div>
                        <div className="button-with-icon">
                            <div className="icon-with-outline">
                                <IonIcon className="button-icons" icon={compassOutline} />
                            </div>
                            <input type="text" className="booking-page-input" placeholder="Where" />
                        </div>


                        <div className="calendar-container">
                            <div className="button-with-icon">
                                <div className="icon-with-outline">
                                    <IonIcon className="button-icons" icon={timeOutline} />
                                </div>
                                <input onTouchEnd={
                                    () => this.toggleShowCalendar()
                                }
                                    id="booking-page-datetime-input"
                                    type="text"
                                    className="booking-page-input"
                                    placeholder="Check-in" readOnly />

                                {
                                    this.state.showCalendar &&
                                    <div className="calendar-only-container">
                                        <Calendar onChange={(date: Date | Value, _: React.MouseEvent<HTMLButtonElement>) => {
                                            var el = (document.getElementById("booking-page-datetime-input") as HTMLInputElement)
                                            if (el && (date instanceof Date)) {
                                                el.value = `${date.getDate()} ${this.monthToString(date.getMonth() + 1)} ${date.getFullYear()}`;
                                            }
                                        }}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="book-button">Continue</div>
                </div>
            </>
        )
    }
}

export default BookingPageDateLocation;
