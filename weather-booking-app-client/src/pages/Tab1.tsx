import React from 'react';
import WeatherHud from '../components/BookingPage/WeatherHud';
import { Component } from 'react';
import { IonRange, IonPage } from '@ionic/react';
import Background from '../components/Screen/Background';
import './Tab1.css';

import Sunny from '../assets/Icons/slight_touch_happyday.png';
import Rain from '../assets/Icons/rainy.png';
import Cloud from '../assets/Icons/cloudy.png';
import Windy from '../assets/Icons/sparkle_storm.png';
import Stormy from '../assets/Icons/thnderstorm.png';

interface AbcState {
    [category: string]: any;
    date: string;
    location: string;
    weatherOptions: { name: string, image?: any }[];
    selectedWeatherOption: number
}

interface AbcProps {
    [category: string]: any;
}

class Tab1 extends Component<AbcProps, AbcState> {
    constructor(props: any) {
        super(props);

        this.state = {
            date: props.date || 'Monday 10 July',
            location: 'Monash University, 3800',
            weatherOptions: [
                { name: "Cloudy", image: Cloud },
                { name: "Sunny", image: Sunny },
                { name: "Rainy", image: Rain },
                { name: "Windy", image: Windy },
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
            selectedWindOption: 0
        };
    }

    componentDidMount(): void {
        /* this.drawRhombus(); */
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    }

    handleWeatherSelectionUpdate(weatherSelectionNumber: number) {
        this.setState(prev => {
            return {
                ...prev,
                selectedWeatherOption: weatherSelectionNumber
            }
        });
    }

    render() {
        return (
            <IonPage>
                {/* <IonContent fullscreen className="ion-no-padding"> */}
                <Background>

                    <div className="button-container">
                        <div className="button">
                            {this.state.date}
                        </div>

                        <div className="button">
                            {this.state.location}
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
                                            <img src={option.image} style={{ width: "10vw" }} />
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
                        ></IonRange>
                    </div>

                    <WeatherHud weatherData={this.state} />

                    <div
                        className="button-container"
                        style={{
                            marginBottom: 'vh',
                            marginTop: '10vh'
                        }}>

                        <div className="book-button">
                            Book
                        </div>
                    </div>
                </Background>
            </IonPage >
        );
    }
};

export default Tab1;
