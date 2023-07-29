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
            bookingDetails: {
                name: '',
                dateTime: new Date(),
                location: ''
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<AbcProps>, prevState: Readonly<AbcState>, snapshot?: any): void {
        if (this.state != prevState) console.log(this.state);
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

    updateBooking(payload: any, action: 'name' | 'location' | 'dateTime') {
        this.setState({
            ...this.state,
            bookingTimeLocation: {
                ...this.state.bookingTimeLocation,
                [action]: payload
            }
        })

        if (payload instanceof Date && action == 'dateTime') {
            var el = (document.getElementById("booking-page-datetime-input") as HTMLInputElement)
            if (el) {
                el.value = `${payload.getDate()} ${this.monthToString(payload.getMonth() + 1)} ${payload.getFullYear()}`;
            }
        }
    }

    render(): React.ReactNode {
        return (
            <IonPage keep-alive="false">
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
                                    this.updateBooking(JSON.stringify(e.target.value), 'name');
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
                                    this.updateBooking(e.target.value, 'location');
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
                                                if (date instanceof Date) this.updateBooking(date, 'dateTime');
                                            }}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="book-buttons-container">
                                <div className="book-button">Cancel</div>
                                <div className="book-button" onTouchEnd={() => {
                                    this.props.history.push({
                                        pathname: '/bookingPage',
                                        state: { ...this.state.bookingTimeLocation }
                                    });
                                }}>
                                    Next
                                </div>
                            </div>
                        </div>
                    </div>
                </Background >
            </IonPage>
        )
    }
}

export default withRouter(BookingPageDateLocation);
