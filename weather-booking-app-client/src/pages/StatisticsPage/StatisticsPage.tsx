import React from react';
import { Component, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { IonPage } from '@ionic/react';
import './StatisticsPage.css';
import mockData from "./MockData/data.json";

interface AbcProps {
    [category: string]: any;
    bookingAmountData?: {
        labels: string[], // Labels are day of the week
        datasets: {
            data: number[], // Booking for past 8 week
        }[],
    },
    mostGuessedWeather?: {
        labels: string[],
        datasets: {
            data: number[],
        }[]
    },
    correctStreakInfo?: {
        currentStreak: number,
        highestCorrectGuess: number
    },
    bookingAcuracyData?: {
        labels:  string[],
        datasets: {
            data: number[]
        }[]
    }
}

interface AbcState {
    bookingAmountData: any
    mostGuessedWeather: any;
    bookingAcuracyData: any;
}

export default class StatisticsPage extends Component<AbcProps, AbcState> {
    constructor(props: AbcProps) {
        super(props);

        this.state = {
            bookingAmountData: this.props.bookingAmountData ? {
                ...this.props.bookingAmountData,
                datasets: [
                    {
                        label: 'Number of booking this week',
                        backgroundColor: '#1e90ff',
                        borderColor: 'white',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        ...this.props.bookingAmountData
                    }
                ],
                options: {
                    ...mockData.commonOptions
                }
            } : mockData.bookingAmountData,
            mostGuessedWeather: this.props.mostGuessedWeather ? {
                labels: [
                    'Sunny',
                    'Cloudy',
                    'Rainy',
                    'Stormy'
                ],
            } : mockData.mostGuessedWeather,
            bookingAcuracyData: {
                labels: new Array(7).fill().map((_, i) => {
                    return i;
                }),
                datasets: [{
                    label: 'Booking Accuracy',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }],
                options: {
                    ...mockData.commonOptions
                }
            }
        }
    }

    componentDidMount() {
        Chart.register(...registerables);
    }

    render() {
        return (
            <IonPage>
            <div className="global-container">
            <div className="statistics-page-header">

            <h1>Statistics</h1>
            </div>
            <div className='statistic-page-graphs'>
            <div className='statistic-page-streaks'>
            <div className='statistic-page-current-streak'>
            Correct guess streak 🔥
            <p className="statistic-page-date">02-02-2022 - 02-02-2023</p>
            <span className="statistic-page-number" style={{background: 'rgba(118, 115, 220, .6)'}}>
            5
            </span>
            </div>
            <div className='statistic-page-highest-streak'>
            Highest correct guess streak 🔥
            <p className="statistic-page-date">02-02-2022 - 02-02-2023</p>
            <span className="statistic-page-number">
            32 
            </span>
            </div>
            </div>

            <div className="booking-amount-graph-container">
            <Bar
            data={this.state.bookingAmountData}
                options={this.state.bookingAmountData.options}
            />
                </div>

                <div className="booking-accuracy-graph-container">
                    <Line data={this.state.bookingAcuracyData} options={this.state.bookingAcuracyData.options} />
                </div>

                <div className="most-guessed-weather-container">
                    <div className="graph-title">Most Guessed Weather</div>
                    <Doughnut options={this.state.mostGuessedWeather.options} data={this.state.mostGuessedWeather} />
                </div>

            </div>
            </div>
            </IonPage>
        );
    }
}


