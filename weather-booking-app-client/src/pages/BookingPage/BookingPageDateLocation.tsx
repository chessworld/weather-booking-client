import { Router, Redirect } from 'react-router';
import { Component } from 'react';
import { Calendar } from 'react-calendar';
import Background from '../../components/ScreenComponents/Background';
import {
    IonPage,
    IonIcon
} from '@ionic/react';
import { withRouter } from 'react-router-dom';
import { compassOutline, timeOutline, bagOutline } from "ionicons/icons";
import type { Value } from 'react-calendar/dist/cjs/shared/types';
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
            showCalendar: false,
            bookingDateLocation: {
                dateTime: new Date(),
                location: ''
            }
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
            <IonPage keep-alive={false}>
            <Background showClouds={true}>
                <div className="booking-page-date-location-header">
                    Book Unique Weather and Experiences
                </div>
                <div className="booking-page-date-location-container">
                    <div className="input-fields-container">
                        <div className="button-with-icon">
                            <div className="icon-with-outline">
                                <IonIcon
                                    className="button-icons"
                                    icon={bagOutline}
                                    style={{
                                        color: "#555"
                                    }}
                                />
                            </div>
                            <input type="text" onChange={(e) => {
                                console.log(e.target.value);
                            }} className="booking-page-input" placeholder="Event" />
                        </div>


                        <div className="button-with-icon">
                            <div className="icon-with-outline">
                                <IonIcon className="button-icons"
                                    icon={compassOutline}
                                    style={{
                                        color: "#555"
                                    }}
                                />
                            </div>
                            <input type="text" onChange={(e) => {
                                this.setState({
                                    ...this.state,
                                    bookingDateLocation: {
                                        ...this.state.bookingDateLocation,
                                    }
                                })
                            }} className="booking-page-input" placeholder="Where" />
                        </div>


                        <div className="calendar-container">
                            <div className="button-with-icon">
                                <div className="icon-with-outline">
                                    <IonIcon
                                        className="button-icons"
                                        icon={timeOutline}
                                        style={{
                                            color: "#555"
                                        }}
                                    />
                                </div>
                                <input onTouchEnd={
                                    () => this.toggleShowCalendar()
                                }
                                    id="booking-page-datetime-input"
                                    type="text"
                                    className="booking-page-input"
                                    placeholder="Check-in"
                                    readOnly />

                                {
                                    this.state.showCalendar &&
                                    <div className="calendar-only-container">
                                        <Calendar onChange={(date: Date | Value, _: React.MouseEvent<HTMLButtonElement>) => {
                                            this.setState({
                                                ...this.state,
                                                bookingDateLocation: {
                                                    ...this.state.bookingDateLocation,
                                                    datetime: date
                                                }
                                            })
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
                        <div className="book-buttons-container">
                            <div className="book-button">Cancel</div>
                            <div className="book-button" onTouchEnd={() => {
                                console.log(this.props.history);
                                this.props.history.push('/bookingPage')
                            }}>Next</div>
                        </div>
                    </div>
                </div>
            </Background >
            </IonPage>
        )
    }
}

export default withRouter(BookingPageDateLocation);
