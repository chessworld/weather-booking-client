import { Component, useState } from 'react';
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
import "./BookingPageDateLocation.css";
import "./BookingPage.css";
import {api_key} from "./config/config";
/* import Clouds from "./Clouds" */

import { AddressAutofill } from '@mapbox/search-js-react';
import path from 'path';

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
            },
            bookingTimeLocation: {
                location: {
                    address: '',
                    postCode: '',
                    suburb: ''
                }
            },
            locationInputValue: ''
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

    updateBookingLocation(payload: any, action: 'address') {

        this.setState({
            ...this.state,
            bookingTimeLocation: {
                ...this.state.bookingTimeLocation,
                ['location']:{
                    ...this.state.bookingTimeLocation['location'],
                    [action]: payload
                }
            },
            locationInputValue: payload
        })
    
    }

    updateAutoComplete(payload: any, action: 'postCode' | 'suburb') {
        //Only change when autocomplete is triggered
        this.setState({
            ...this.state,
            bookingTimeLocation: {
                ...this.state.bookingTimeLocation,
                ['location']:{
                    ...this.state.bookingTimeLocation['location'],
                    [action]: payload
                }
            }
        })

        //Updates adderess input element
        var postCodeEl = document.getElementById("postal-code-input") as HTMLInputElement
        var suburbEl = document.getElementById("suburb-input") as HTMLInputElement
        this.setState({
            ...this.state,
            locationInputValue: `${suburbEl.value} ${postCodeEl.value}`
        })

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
                                <form>
                                <AddressAutofill accessToken={api_key}>
                                <input type="text" onChange={(e) => {
                                    this.updateBookingLocation(e.target.value, 'address');
                                }} className="booking-page-input" placeholder="Where" autoComplete="address-line1" value={this.state.locationInputValue}/>
                                </AddressAutofill>
                                <div className='hidden'>
                                    <input type="text" autoComplete="postal-code" id="postal-code-input" onChange={(e) => {
                                        this.updateAutoComplete(e.target.value, 'postCode');
                                    }} disabled placeholder='Postal Code'/>
                                    <input type="text" autoComplete='address-level2' id="suburb-input" onChange={(e) => {
                                        this.updateAutoComplete(e.target.value, 'suburb');
                                    }} disabled placeholder='Suburb'/>
                                    
                                </div>
                                </form>
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
                                    <input onTouchEnd={() => this.toggleShowCalendar()}
                                        id="booking-page-datetime-input"
                                        type="text"
                                        className="booking-page-input"
                                        placeholder="Check-in"
                                        readOnly />

                                    {
                                        this.state.showCalendar &&
                                        <div className="calendar-only-container">
                                            <div onBlur={() => this.toggleShowCalendar() }>
                                                <Calendar 
                                                        onChange={(date: Date | Value, _: React.MouseEvent<HTMLButtonElement>) => {
                                                    if (date instanceof Date) this.updateBooking(date, 'dateTime');
                                                }} />
                                            </div>
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
