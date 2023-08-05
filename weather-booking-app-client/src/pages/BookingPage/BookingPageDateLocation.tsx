import { Component, createRef, RefObject } from 'react';
import { format, parseISO } from 'date-fns';
import Background from '../../components/ScreenComponents/Background';
import BookingPageDateLocationState from "./Interface/BookingPageDateLocationState";
import DeviceManager from "../../device/DeviceManager";
import UserEndpoint from "../../endpoint-caller/userEndpoint";
import Draggable, { DraggableEventHandler } from 'react-draggable';
import {
    IonToast,
    IonPage,
    IonDatetime,
    IonIcon
} from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compassOutline, timeOutline, bagOutline } from "ionicons/icons";

import SlideUpPanel from '../../components/SlideUpPanel/SlideUpPanel';

import 'react-calendar/dist/Calendar.css';
import "./BookingPageDateLocation.css"
import "./BookingPage.css"


class BookingPageDateLocation extends Component<RouteComponentProps, BookingPageDateLocationState> {
    panelRef: RefObject<any>;
    calendarRef: RefObject<any>;

    constructor(props: RouteComponentProps) {
        super(props);

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
            showCalendar: true,
            toast: {
                showToast: false,
                toastDuration: 1000,
                toastMessage: ''
            },
            bookingDetails: {
                name: null,
                dateTime: null,
                location: null
            }
        }

        this.panelRef = createRef();
        this.calendarRef = createRef();
        /* this.hideCalendar.bind(this); */
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps>, prevState: Readonly<BookingPageDateLocationState>, snapshot?: any): void {
        /* if (process.env.REACT_APP_ENVIRONMENT  === 'development') { */
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

        var a = document.querySelectorAll(".slide-up-panel")[0];

        window.addEventListener("click", (e) => {
            if (a && !a.contains(e.target as Node)) {
                this.setState({ showCalendar: false })
            }
        });
    }

    showCalendar(): void {
        this.setState({
            ...this.state,
            showCalendar: true,
        })
    }


    hideCalendar(): void {
        this.setState({
            ...this.state,
            showCalendar: false,
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
                console.error(error);
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


            var el = (document.getElementById("booking-page-date-time-input") as HTMLInputElement)

            if (payload instanceof Date) {
                el.value = `
${payload.getDate()} \
${this.monthToString(payload.getMonth() + 1)} \
${payload.getFullYear()}`;
            } else if (action == 'dateTime') {
                el.value = display;
            }

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
                                        this.updateBooking(JSON.stringify(e.target.value), 'name');
                                    }}
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
                                    <input onTouchEnd={() => this.showCalendar()}
                                        id="booking-page-date-time-input"
                                        type="text"
                                        className="booking-page-input"
                                        placeholder="Check-in"
                                        readOnly />
                                </div>
                            </div>
                            <div className="book-buttons-container">
                                <div className="book-button">Cancel</div>
                                <div className="book-button" onTouchEnd={() => {
                                    this.validateInput()
                                        && this.props.history.push({
                                            pathname: '/bookingPage',
                                            state: { ...this.state.bookingDetails }
                                        });
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
                                }}>Select Dates</div>
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

                                <div className="book-button" onTouchEnd={() => this.hideCalendar()}>
                                    Select Dates
                                </div>
                            </SlideUpPanel>
                        }
                    </div>
                </Background >
            </IonPage>
        )
    }
}

export default withRouter(BookingPageDateLocation);
