import './BookingPage.css';
import Background from '../../components/ScreenComponents/Background';
import BookingEndpoint from "../../endpoint-caller/bookingEndpoint";
import BookingPageProps from "./Interface/BookingPageProps";
import BookingPageState from "./Interface/BookingPageState";
import ConfirmBookingDetails from "../../components/ViewBookingsComponents/ConfirmBookingDetails";
import React from 'react';
import WeatherHud from '../../components/BookWeatherComponents/WeatherHud';
import { Component } from 'react';
import { IonToast, IonRange, IonPage } from '@ionic/react';
import DeviceManager from "../../device/DeviceManager";

import Cloudy from "../../components/weatherAnimatedIcons/Cloudy";
import Sunny from "../../components/weatherAnimatedIcons/Sunny";
import Rainy from "../../components/weatherAnimatedIcons/Rainy";
import Stormy from "../../components/weatherAnimatedIcons/Stormy";

class BookingPage extends Component<BookingPageProps, BookingPageState> {
    bookingEndpoint: BookingEndpoint | undefined;

    constructor(props: any) {
        super(props);

        this.state = {
            date: props.date || 'Monday 10 July',
            location: "",
            weatherOptions: [
                {
                    name: "Cloudy",
                    effectClassName: "cloud",
                    backgroundClassName: "perfect",
                    svg: Cloudy
                },
                {
                    name: "Sunny",
                    effectClassName: "sun",
                    backgroundClassName: "sunny",
                    svg: Sunny
                },
                {
                    name: "Rainy",
                    effectClassName: "rain",
                    backgroundClassName: "rainy",
                    svg: Rainy
                },
                {
                    name: "Stormy",
                    effectClassName: "storm",
                    backgroundClassName: "stormy",
                    svg: Stormy
                }
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

        // TODO If device id is not verified, redirect user to onboarding page as well
        DeviceManager.getOrCreateDeviceId().then(deviceId => {
            this.setState({
                ...this.state,
                showToast: true,
                toastMessage: `Device unique id is: ${deviceId}`,
            });
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
        const svgWeatherIconComponent = this.state.weatherOptions[0].svg;

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

                    <div className="page-content">

                        {/* Vertical Buttons */}
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
                                                className={`hud-background ${this.state.weatherOptions[i].backgroundClassName} weather-choose-option ${i == this.state.selectedWeatherOption
                                                    && 'weather-choose-option-focus'}`}
                                            >
                                                <div className={`${this.state.weatherOptions[i].effectClassName}`}>
                                                    <ul>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>
                                                        <li></li>
                                                    </ul>
                                                </div>
                                                {
                                                    React.createElement(option.svg, {
                                                        className: 'weather-icon'
                                                    })
                                                }
                                            </div>
                                            <span className="weather-choose-text">
                                                {option.name}
                                            </span>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        {/* Sliders */}
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

                        {/* Weatherhud */}
                        <WeatherHud weatherData={this.state} isWindy={
                            this.state.selectedWindOption > 1 // If wind is more than 1, it is windy
                        } />

                        {/* Book Button */}
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "2vw"
                        }}>
                            <div onTouchEnd={this.confirmBooking} className="book-button">Book</div>
                        </div>

                    </div>
                </Background>
            </IonPage >
        );
    }
};

export default BookingPage;
