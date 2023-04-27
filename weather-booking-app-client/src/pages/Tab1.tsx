import { Component } from 'react';
import { IonContent, IonRange, IonPage, IonTitle, IonToolbar, IonicSafeString } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

interface AbcState {
    [category: string]: any;
    date: string;
    location: string;
    weatherOptions: { name: string }[];
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
                { name: "Cloudy" },
                { name: "Sunny" },
                { name: "Rainy" },
                { name: "Windy" },
                { name: "Stormy" }
            ],
            selectedWeatherOption: 3
        };
    }

    componentDidMount(): void {

    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {

    }

    render() {
        return (
            <IonPage>
                <IonContent fullscreen className="ion-padding">
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
                                    <div className="weather-choose-container" key={`weather-choose-${i}`} >
                                        <div
                                            className={`weather-choose-option ${i == this.state.selectedWeatherOption && 'weather-choose-option weather-choose-option-focus'}`}
                                        >
                                        </div>
                                        <span className="weather-choose-text">{option.name}</span>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="slider-container">
                        <span className="weather-slider-text">Temperature</span>
                        <IonRange className="weather-slider"></IonRange>

                        <span className="weather-slider-text">Wind</span>
                        <IonRange className="weather-slider"></IonRange>
                    </div>

                    {/* <div className="weather-rhombus-container">
                        <div className="weather-rhombus-container-bottom">
                        </div>
                    </div> */}
                </IonContent>
            </IonPage>
        );
    }
};

export default Tab1;
