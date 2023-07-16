import './BookingPage.css';
import Background from '../../components/ScreenComponents/Background';
import BookingEndpoint from "../../endpoint-caller/bookingEndpoint";
import UserEndpoint from "../../endpoint-caller/userEndpoint";
import BookingPageProps from "./Interface/BookingPageProps";
import BookingPageState from "./Interface/BookingPageState";
import Cloud from '../../assets/Icons/cloudy.png';
import ConfirmBookingDetails from "../../components/ViewBookingsComponents/ConfirmBookingDetails";
import Rain from '../../assets/Icons/rainy.png';
import React from 'react';
import Stormy from '../../assets/Icons/thnderstorm.png';
import Sunny from '../../assets/Icons/slight_touch_happyday.png';
import WeatherHud from '../../components/BookWeatherComponents/WeatherHud';
import { Component } from 'react';
import { IonToast, IonRange, IonPage, IonItem, IonLabel, IonList, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/react';
import DeviceManager from "../../device/DeviceManager";

class BookingPage extends Component<BookingPageProps, BookingPageState> {
    bookingEndpoint: BookingEndpoint | undefined;

    constructor(props: any) {
        super(props);

        this.state = {
            date: props.date || 'Monday 10 July',
            location: "",
            weatherOptions: [
                { name: "Cloudy", image: Cloud },
                { name: "Sunny", image: Sunny },
                { name: "Rainy", image: Rain },
                { name: "Stormy", image: Stormy }
            ],
            temperatureOptions: [
                { name: "Freezing" },
                { name: "Cool" },
                { name: "Mild" },
                { name: "Warm" },
                { name: "Hot" }
            ],
            windOptions: [
                { name: "No Wind" },
                { name: "Calm" },
                { name: "Windy" },
                { name: "Gusty" }
            ],
            selectedWeatherOption: 0,
            selectedWindOption: 0,
            selectedTemperatureOption: 0,
            showSuggestions: false,
            locationSuggestions: [],
            timePeriod: '',
            showToast: false,
            toastMessage: '',
            showConfirmation: false, // Default of show confirmation should be set to false
        };

        // Bindings
        this.getWindJson = this.getWindJson.bind(this);
        this.confirmBooking = this.confirmBooking.bind(this);
        this.toggleConfirmation = this.toggleConfirmation.bind(this);
        this.book = this.book.bind(this);
        this.verifyDeviceId = this.verifyDeviceId.bind(this);
    }

    async componentDidMount(): Promise<any> {
        this.verifyDeviceId()

        this.bookingEndpoint = this.bookingEndpoint ?? await BookingEndpoint.create();

        setTimeout(
            () => {
                this.setState({
                    ...this.state,
                    locationSuggestions: this.bookingEndpoint?.getLocationSuburbs() ?? []
                });
            }
        )
    }

    verifyDeviceId() {
        /**
         * Not Sure which page this should be on. It is for verifying device id
         */

        DeviceManager.getOrCreateDeviceId().then(deviceId => {
            UserEndpoint.getUser(deviceId)
                .then(user => {
                    if (user.status === 404) {
                        console.log("User does not exist. Creating new user.");
                        UserEndpoint.createUser()
                            .then(user => {
                                user.json().then(user => {
                                    DeviceManager.updateDeviceId(user.id)
                                    this.showToast(`Created user ${user.id}`);
                                });
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    } else {
                        // User Already exists
                        this.showToast(`Welcome back!`);
                    }
                });
                })
                .catch(error => {
        });

    }

    showToast(message: string): void {
        this.setState({
            ...this.state,
            showToast: true,
            toastMessage: message,
        });
    }


    getWindJson(): {
        [category: string]: string | number
    } {
        const windJson = {
            "option_type": 'Wind',
            "option_name": this.state.windOptions
                && this.state.windOptions[this.state.selectedWindOption].name,
            "value_type": 'Km/h',
            "min_value": 30, //TODO backend
            "max_value": 40 // TODO backend
        }

        return windJson;
    }

    getWeatherJson(): { [category: string]: string | number } {
        const weatherJson = {
            "option_type": 'Weather',
            "option_name": this.state.weatherOptions
                && this.state.weatherOptions[this.state.selectedWeatherOption].name,
        }

        return weatherJson;
    }

    getTemperatureJson(): { [category: string]: string | number } {
        const temperatureJson = {
            "option_type": 'Temperature',
            "option_name": this.state.temperatureOptions
                && this.state.temperatureOptions[this.state.selectedTemperatureOption].name,
            "value_type": 'Celsius',
            "min_value": 30, //TODO backend
            "max_value": 40 // TODO backend
        }

        return temperatureJson;
    }

    handleWeatherSelectionUpdate(weatherSelectionNumber: number) {
        this.setState(prev => {
            return {
                ...prev,
                selectedWeatherOption: weatherSelectionNumber
            }
        });
    }

    confirmBooking(): void {
        this.setState({
            ...this.state,
            showConfirmation: true
        });
    }

    book(): void {
        this.bookingEndpoint?.createBooking(
            this.bookingEndpoint?.getLocationSuburbs().findIndex((obj: any) => {
                return obj.toLowerCase() === this.state.location.toLowerCase();
            }) + 1,
            this.state.timePeriod,
            "06:00:00", //TODO backend
            "12:00:00", //TODO backend
            this.getWeatherJson(),
            this.getTemperatureJson(),
            this.getWindJson()
        );

        this.setState({
            ...this.state,
            showToast: true,
            toastMessage: 'Booking has been successfully created',
            showConfirmation: true
        });
    }

    toggleConfirmation(): void {
        this.setState({
            ...this.state,
            showConfirmation: !this.state.showConfirmation
        });
    }

    render(): React.ReactNode {
        return (
            <IonPage>
                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState({ showToast: false })}
                    message={this.state.toastMessage}
                    duration={1000}
                />

                <Background>
                    {
                        this.state.showConfirmation && (
                            <div style={{
                                background: "#FFF",
                                "position": "fixed",
                                "width": "100%",
                                "height": "100%",
                                "zIndex": 3
                            }}>
                                <ConfirmBookingDetails data={this.state}
                                    closeBookingDetail={this.toggleConfirmation}
                                    book={this.book}
                                />
                            </div>
                        )
                    }

                    <div className="button-container-vertical">
                        <br />
                        <IonSearchbar
                            className="search-bar"
                            placeholder='Search Location'
                            onIonChange={e => this.setState({
                                ...this.state,
                                location: e.detail.value!
                            })}

                            value={this.state.location}

                            onFocus={() => this.setState({
                                ...this.state,
                                showSuggestions: true
                            })}

                            onBlur={() => this.setState({
                                ...this.state,
                                showSuggestions: false
                            })}
                        />
                        {
                            this.state.showSuggestions && (
                                <IonList style={{
                                    position: 'absolute',
                                    width: '90%',
                                    zIndex: 10,
                                    top: "10vh",
                                    background: "transparent"
                                }}>
                                    {this.state.locationSuggestions
                                        .filter((suggestion: string) => {
                                            return suggestion.toLowerCase()
                                                .includes(this.state.location.toLowerCase())
                                        })
                                        .map((suggestion: string, i: number) => (
                                            <IonItem key={i} button onTouchEnd={() => {
                                                this.setState({
                                                    ...this.state,
                                                    location: suggestion,
                                                });
                                            }}>
                                                <IonLabel>
                                                    {suggestion}
                                                </IonLabel>
                                            </IonItem>
                                        ))}

                                </IonList>
                            )
                        }

                        {/* TODO make this use backend enum */}
                        <div className="selector-container">
                            <IonSelect
                                label="Time Period"
                                className="selector"
                                aria-label="time-period"
                                placeholder="Select Time Period"
                                onIonChange={e => this.setState({
                                    ...this.state,
                                    timePeriod: e.detail.value
                                })}
                            >
                                <IonSelectOption value="Morning">Morning</IonSelectOption>
                                <IonSelectOption value="Afternoon">Afternoon</IonSelectOption>
                                <IonSelectOption value="Evening">Evening</IonSelectOption>
                                <IonSelectOption value="Night">Night</IonSelectOption>
                            </IonSelect>
                        </div>

                    </div>

                    <div className="button-container">
                        {
                            this.state.weatherOptions.map((option: any, i: number) => {
                                return (
                                    <div className="weather-choose-container" key={`${i}`}
                                        onClick={() => {
                                            this.handleWeatherSelectionUpdate(i);
                                        }}
                                    >
                                        <div
                                            className={`weather-choose-option ${i == this.state.selectedWeatherOption
                                                && 'weather-choose-option weather-choose-option-focus'}`}
                                        >
                                            <img src={option.image} style={{ width: "15vw" }} />
                                        </div>
                                        <span className="weather-choose-text">
                                            {option.name}
                                        </span>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="slider-container">
                        <span className="weather-slider-text">
                            Temperature
                        </span>
                        <IonRange
                            className="weather-slider"
                            ticks={true}
                            snaps={true}
                            min={0}
                            max={
                                this.state.temperatureOptions.length - 1
                            }
                            onIonChange={(e: any) => {
                                this.setState(prev => {
                                    return {
                                        ...prev,
                                        selectedTemperatureOption: e.detail.value
                                    };
                                })
                            }}
                        ></IonRange>

                        <span className="weather-slider-text">Wind</span>

                        <IonRange
                            className="weather-slider"
                            ticks={true}
                            snaps={true}
                            min={0}
                            onIonChange={(e: any) => {
                                this.setState(prev => {
                                    return { ...prev, selectedWindOption: e.detail.value };
                                })
                            }}
                            max={
                                this.state.windOptions.length - 1
                            }
                        />
                    </div>
                    <WeatherHud weatherData={this.state} />
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "2vw"
                    }}>
                        <div onTouchEnd={this.confirmBooking} className="book-button">Book</div>
                    </div>
                </Background>
            </IonPage >
        );
    }
};

export default BookingPage;
