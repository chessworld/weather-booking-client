import { Component } from 'react';
import { Calendar } from 'react-calendar';
import { format, parseISO } from 'date-fns';
import Background from '../../components/ScreenComponents/Background';
import {
    IonToast,
    IonPage,
    IonDatetime,
    IonIcon
} from '@ionic/react';
import { withRouter } from 'react-router-dom';
import { compassOutline, timeOutline, bagOutline } from "ionicons/icons";
import type { Value } from 'react-calendar/dist/cjs/shared/types';
import 'react-calendar/dist/Calendar.css';
import "./BookingPageDateLocation.css"
import "./BookingPage.css"
import Toast from "../../components/Toast/Toast";

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
            bookingPageInputIds: {
                name: "booking-page-name-input",
                dateTime: "booking-page-date-time-input",
                location: "booking-page-location-input"
            },
            showCalendar: false,
            toast: {
                showToast: false,
                toastDuration: 1000,
                toastMessage: ''
            },
            bookingDetails: {
                name: '',
                dateTime: '',
                location: ''
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<AbcProps>, prevState: Readonly<AbcState>, snapshot?: any): void {
        if (this.state != prevState) console.log(this.state);
    }

    componentDidMount() {
        var a = document.querySelectorAll(".calendar-only-container")[0];

        window.addEventListener("click", (e) => {
            if (a && !a.contains(e.target as Node)) {
                console.log(e.target);
                this.setState({ showCalendar: false })
            }
        });
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

    validateInput(): Boolean {
        let inputIsValid = true;

        Object.entries(this.state.bookingDetails).forEach((item: any) => {
            const [key, value] = item;

            if (value == '') {
                inputIsValid = false;
                var error = `The ${key} field is empty.`
                console.error(error);
                this.showToast(error);

                var a = document.getElementById(this.state.bookingPageInputIds[key]);
                if (a) a.style.border = "2px solid #DD0000";
            }
        });


        return inputIsValid;
    }

    showToast(message: string): void {
        this.setState({
            ...this.state,
            toast: {
                showToast: true,
                toastMessage: message,
            }
        });
    }

    updateBooking(payload: any, action: 'name' | 'location' | 'dateTime') {
        this.setState({
            ...this.state,
            bookingDetails: {
                ...this.state.bookingDetails,
                [action]: payload
            }
        })


        var a = document.getElementById(this.state.bookingPageInputIds[action]);
        if (a) a.style.border = "1px solid black";

        if (action == 'dateTime') {

            var el = (document.getElementById("booking-page-date-time-input") as HTMLInputElement)

            if (payload instanceof Date) {
                el.value = `
${payload.getDate()} \
${this.monthToString(payload.getMonth() + 1)} \
${payload.getFullYear()}`;
            } else if (action == 'dateTime') {
                el.value = payload;
            }
        }
    }

    render(): React.ReactNode {
        return (
            <IonPage keep-alive="false">
                <IonToast
                    isOpen={this.state.toast.showToast}
                    onDidDismiss={() => this.setState({
                        toast: {
                            toastMessage: '',
                            showToast: false
                        }
                    })
                    }
                    message={this.state.toast.toastMessage}
                    duration={this.state.toast.toastDuration}
                />

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
                                        icon={bagOutline} />
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        this.updateBooking(JSON.stringify(e.target.value), 'name');
                                    }}
                                    id={this.state.bookingPageInputIds.name}
                                    className="booking-page-input"
                                    placeholder="Event" />
                            </div>


                            <div className="button-with-icon">
                                <div className="icon-with-outline">
                                    <IonIcon className="button-icons"
                                        icon={compassOutline}
                                    />
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        this.updateBooking(e.target.value, 'location');
                                    }}
                                    className="booking-page-input"
                                    id="booking-page-location-input"
                                    placeholder="Where" />
                            </div>
                            <div className="calendar-container">
                                <div className="button-with-icon">
                                    <div className="icon-with-outline">
                                        <IonIcon
                                            className="button-icons"
                                            icon={timeOutline} />
                                    </div>
                                    <input onTouchEnd={() => this.toggleShowCalendar()}
                                        id="booking-page-date-time-input"
                                        type="text"
                                        className="booking-page-input"
                                        placeholder="Check-in"
                                        readOnly />

                                    {
                                        this.state.showCalendar &&
                                        (
                                            <div className="calendar-only-container" >
                                                <IonDatetime onIonChange={(e) => {
                                                    if (typeof (e.detail.value) == "string") {
                                                        var newValue = format(
                                                            parseISO(e.detail.value),
                                                            'MMM d, yyyy'
                                                        );

                                                        this.updateBooking(newValue, 'dateTime');
                                                    }
                                                }}>
                                                </IonDatetime>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="book-buttons-container">
                                <div className="book-button">Cancel</div>
                                <div className="book-button" onTouchEnd={() => {
                                    this.validateInput() &&
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
