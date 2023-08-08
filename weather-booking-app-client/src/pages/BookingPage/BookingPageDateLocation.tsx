import { Component, createRef, RefObject } from 'react';
import { format, parseISO } from 'date-fns';
import {
    IonToast,
    IonPage,
    IonDatetime,
    IonIcon
} from '@ionic/react';
import { isBookingDetails } from "./Interface/BookingPageState";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compassOutline, timeOutline, bagOutline } from "ionicons/icons";
import { BookingDetails } from './Interface/BookingPageState';
import Background from '../../components/ScreenComponents/Background';
import BookingPageDateLocationProps from "./Interface/BookingPageDateLocationProps";
import BookingPageDateLocationState from "./Interface/BookingPageDateLocationState";
import DeviceManager from "../../device/DeviceManager";
import UserEndpoint from "../../endpoint-caller/userEndpoint";
import SlideUpPanel from '../../components/SlideUpPanel/SlideUpPanel';

import 'react-calendar/dist/Calendar.css';
import "./BookingPageDateLocation.css"
import "./BookingPage.css"


class BookingPageDateLocation extends Component<BookingPageDateLocationProps, BookingPageDateLocationState> {
    panelRef: RefObject<any>;
    calendarRef: RefObject<any>;


    constructor(props: BookingPageDateLocationProps) {
        super(props);

        let redirectPassInBookingDetails = false;

        this.state = {
            bookingPageInputIds: {
                name: "booking-page-name-input",
                dateTime: "booking-page-date-time-input",
                location: "booking-page-location-input",
            },
            bookingPageInputIconIds: {
                name: "booking-page-name-input-icon",
                dateTime: "booking-page-date-time-input-icon",
                location: "booking-page-location-input-icon"
            },
            showCalendar: false,
            toast: {
                showToast: false,
                toastDuration: 1000,
                toastMessage: ''
            },
            bookingDetails:  {
              location: 'Melbourne',
              dateTime: '12-12-2024',
              name: 'Graduation',
              timePeriod: 'Morning' //TODO make frontend have this input
            }
        }
      

        this.panelRef = createRef();
        this.calendarRef = createRef();
    }

    componentDidUpdate(prevProps: Readonly<BookingPageDateLocationProps>, prevState: Readonly<BookingPageDateLocationState>, snapshot?: any): void {
        /* if (process.env.REACT_APP_ENVIRONMENT  === 'development') { */

        console.table(this.props.location.state);
        if (true) {
            for (const key in prevState) {
                if ((prevState as any)[key] !== (this.state as any)[key]) {
                    console.log('changed property:', key, 'from', (prevState as any)[key], 'to', (this.state as any)[key]);
                }
            }
        }
    }

    componentDidMount() {
        this.verifyDeviceId();
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

        Object.entries(this.state.bookingDetails).forEach((item: [string, string | null]) => {
            const [key, value] = item;

            if (value === '' || value === null) {
                inputIsValid = false;
                this.changeInputBorderValidStyle(inputIsValid, key);
                var error = `The ${key} field is empty.`
                this.showToast(error);
            }
        });

        return inputIsValid;
    }

    changeInputBorderValidStyle(isInputValid: boolean, inputFieldId: string): void {
        const inputElement = document.getElementById(this.state.bookingPageInputIds[inputFieldId as keyof typeof this.state.bookingPageInputIds]);
        const inputIconElement = document.getElementById(this.state.bookingPageInputIconIds[inputFieldId as keyof typeof this.state.bookingPageInputIds]);

        if (!isInputValid) {
            this.applyInvalidInputStyle(inputElement);
            this.applyInvalidInputStyle(inputIconElement, true);
        } else {
            this.resetInputStyle(inputElement);
            this.resetInputStyle(inputIconElement);
        }
    }

    applyInvalidInputStyle(element: HTMLElement | null, isIconElement?: boolean): void {
        if (element) {
            element.style.borderWidth = isIconElement ? "2px 0px 2px 2px" : "2px 2px 2px 0px";
            element.style.borderStyle = "solid";
            element.style.borderColor = "#DD0000";
        }
    }

    resetInputStyle(element: HTMLElement | null): void {
        if (element) {
            element.style.border = "None";
        }
    }

    verifyDeviceId() {
        /**
         * Not Sure which page this should be on. It is for verifying device id
         */

        DeviceManager.getOrCreateDeviceId().then((deviceId) => {
            UserEndpoint.getUser(deviceId)
                .then((user) => {
                    // User Already exists
                    this.showToast(`Welcome back ${user.id}!`);
                    console.log(`Welcome back ${user.id}!`);
                    if (!user.completed_tutorial) {
                        // If user exists but hasn't completed tutorial
                        this.props.history.push("/OnboardingPage");
                    }
                })
                .catch((error) => {
                    console.error(error);

                });
        }).catch((error) => {
            console.error(error);
            UserEndpoint.createUser("New User", false) //TODO: CHANGE THIS FROM HARDCODED
                .then((user) => {
                    // If user doesn't exist
                    DeviceManager.updateDeviceId(user.id);
                    this.showToast(`Created user ${user.id}`);
                    this.props.history.push("/OnboardingPage");
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    showToast(message: string): void {
        this.setState({
            ...this.state,
            toast: {
                ...this.state.toast,
                showToast: true,
                toastMessage: message,
            }
        });
    }

    changeCalendarSelectedDate(type: '1day' | '2day' | '1week' | '1month' | 'today'): void {
        var currentDate = new Date(); // convert to Date object

        if (type === '1day') {
            currentDate.setDate(currentDate.getDate() + 1); // add one day
        } else if (type === '2day') {
            currentDate.setDate(currentDate.getDate() + 2); // add two days
        } else if (type === '1week') {
            currentDate.setDate(currentDate.getDate() + 7); // add one week
        } else if (type === '1month') {
            currentDate.setDate(currentDate.getDate() + 30); // add one month
        }

        this.calendarRef.current.value = currentDate.toISOString(); // convert back to ISO string and set as value
    }

    updateBooking(payload: any, action: 'name' | 'location' | 'dateTime') {

        if (action == 'dateTime') {
            var display = format(
                parseISO(payload),
                'MMM d, yyyy'
            );

            payload = format(
                parseISO(payload),
                'dd-MM-yyyy'
            );
        }

        this.setState({
            ...this.state,
            bookingDetails: {
                ...this.state.bookingDetails,
                [action]: payload
            }
        })

        this.changeInputBorderValidStyle(true, action);
    }

    resetInputFields(): BookingDetails {
        const bookingDetails = this.state.bookingDetails;

        Object.entries(this.state.bookingPageInputIds).forEach((item: [string, string | null]) => {
            const [key, value] = item;


            if (value) {
                const inputElement = document.getElementById(value);

                if (inputElement && this.hasValue(inputElement)) {
                    this.setState({
                        ...this.state,
                        bookingDetails: {
                            ...this.state.bookingDetails,
                            dateTime: '',
                            location: '',
                            name: ''
                        }
                    })
                }
            }
        });

        return bookingDetails;
    }

    render(): React.ReactNode {
        return (
            <IonPage keep-alive="false">
                <IonToast
                    isOpen={this.state.toast.showToast}
                    onDidDismiss={() => this.setState({
                        toast: {
                            ...this.state.toast,
                            toastMessage: '',
                            showToast: false
                        }
                    })
                    }
                    message={this.state.toast.toastMessage}
                    duration={1000}
                />

                <Background showClouds={true}>
                    <div className="booking-page-date-location-header">
                        Book Unique Weather and Experiences
                    </div>
                    <div className="booking-page-date-location-container">
                        <div className="input-fields-container">
                            <div className="button-with-icon">
                                <div
                                    id="booking-page-name-input-icon"
                                    className="icon-with-outline" >
                                    <IonIcon
                                        className="button-icons"
                                        icon={bagOutline} />
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        this.updateBooking(e.target.value, 'name');
                                    }}
                                    value={this.state.bookingDetails.name ?? ''}
                                    id={this.state.bookingPageInputIds.name}
                                    className="booking-page-input"
                                    placeholder="Event" />
                            </div>


                            <div className="button-with-icon">
                                <div
                                    id="booking-page-location-input-icon"
                                    className="icon-with-outline">
                                    <IonIcon className="button-icons"
                                        icon={compassOutline}
                                    />
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        this.updateBooking(e.target.value, 'location');
                                    }}
                                    value={this.state.bookingDetails.location ?? ''}
                                    className="booking-page-input"
                                    id="booking-page-location-input"
                                    placeholder="Where" />
                            </div>
                            <div className="calendar-container" >
                                <div className="button-with-icon">
                                    <div
                                        id="booking-page-date-time-input-icon"
                                        className="icon-with-outline"
                                    >
                                        <IonIcon
                                            className="button-icons"
                                            icon={timeOutline} />
                                </div>
                                <input onTouchEnd={() => this.toggleShowCalendar()}
                                    id="booking-page-date-time-input"
                                    value={this.state.bookingDetails.dateTime ?? ''}
                                    type="text"
                                    className="booking-page-input"
                                    placeholder="Check-in"
                                    readOnly />
                            </div>
                        </div>
                        <div className="book-buttons-container">
                            <div className="book-button">Cancel</div>
                            <div className="book-button" onTouchEnd={() => {
                                if (this.validateInput()) {
                                    this.props.history.push({
                                        pathname: '/bookingPage',
                                        state: this.resetInputFields()
                                    });
                                }
                            }}>
                                Next
                            </div>
                        </div>
                    </div>
                    {
                        <SlideUpPanel showPanel={this.state.showCalendar}>
                            <div style={{
                                textAlign: 'left',
                                fontSize: '1.5rem',
                                marginLeft: '10vw',
                                width: '100vw'
                            }}>
                                Select Dates
                            </div>

                            <div className="calendar-only-container">
                                <IonDatetime
                                    ref={this.calendarRef}
                                    className="react-calendar"
                                    onIonChange={(e) => {
                                        typeof (e.detail.value) == "string" &&
                                            this.updateBooking(e.detail.value, 'dateTime');
                                    }}>
                                </IonDatetime>
                            </div>
                            <div className="small-day-button-container">
                                <div className="button-small" onTouchEnd={() => this.changeCalendarSelectedDate('today')}>
                                    Today
                                </div>
                                <div className="button-small" onTouchEnd={() => this.changeCalendarSelectedDate('1day')}>
                                    +1 day
                                </div>
                                <div className="button-small" onTouchEnd={() => this.changeCalendarSelectedDate('2day')}>
                                    +3 day
                                </div>
                                <div className="button-small" onTouchEnd={() => this.changeCalendarSelectedDate('1week')}>
                                    +1 week
                                </div>
                                <div className="button-small" onTouchEnd={() => this.changeCalendarSelectedDate('1month')}>
                                    +1 month
                                </div>
                            </div>

                            <div className="book-button" onTouchEnd={() => this.toggleShowCalendar()}>
                                Select Dates
                            </div>
                        </SlideUpPanel>
                    }
                </div>
            </Background >
        </IonPage >
    )
}
}

export default withRouter(BookingPageDateLocation);
