import React from 'react';
import { Component, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { IonPage } from '@ionic/react';
import './StatisticsPage.css';
import mockData from "./MockData/data.json";

interface StatisticsPageProps {
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

interface StatisticPageState {
    chartOptions: {
        responsive: boolean,
        maintainAspectRatio: boolean
    };
    doughnutChartOptions: {
	plugins: {
	    legend: {
		position: string
	    }
	}
    } | StatisticPageState.chartOptions;
    bookingAmountData: any;
    mostGuessedWeather: any;
    bookingAcuracyData: any;
}

export default class StatisticsPage extends Component<StatisticsPageProps, StatisticPageState> {
    constructor(props: StatisticsPageProps) {
        super(props);

        this.state = {
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
	    doughnutChartOptions: {
		"responsive": true,
		"maintainAspectRatio": false,
		"plugins": {
		    "legend": {
			"position": "right"
		    }
		}
	    },
            bookingAmountData: this.props.bookingAmountData ? {
                ...this.props.bookingAmountData,
                datasets: [
                    {
                        ...this.props.bookingAmountData.datasets[0],
                        label: 'Number of booking this week',
                        backgroundColor: '#1e90ff',
                        borderColor: 'white',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                    }
                ]
            } : mockData.bookingAmountData,
            mostGuessedWeather: this.props.mostGuessedWeather ? {
		...this.props.mostGuessedWeather,
                labels: [
                    'Sunny',
                    'Cloudy',
                    'Rainy',
                    'Stormy'
                ],
                datasets: [{
                    "label": "My First Dataset",
                    "backgroundColor": [
                        "rgb(255,99,132)",
                        "rgb(54,162,235)",
                        "rgb(255,205,86)"
                    ],
                    "hoverOffset": 4,
                    ...this.props.mostGuessedWeather.datasets[0],
                }]
            } : mockData.mostGuessedWeather,
            bookingAcuracyData: this.props.bookingAcuracyData ? {
                ...this.props.bookingAcuracyData,
                datasets: [{
                    label: 'Booking Accuracy',
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    ...this.props.bookingAcuracyData.datasets[0]
                }]
            } : mockData.bookingAcurracyData
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
                options={this.state.chartOptions}
            />
                </div>

                <div className="booking-accuracy-graph-container">
                    <Line data={this.state.bookingAcuracyData} options={this.state.chartOptions} />
                </div>

                <div className="most-guessed-weather-container">
                    <div className="graph-title">Most Guessed Weather</div>
                    <Doughnut options={this.state.doughnutChartOptions} data={this.state.mostGuessedWeather} />
                </div>

            </div>
            </div>
            </IonPage>
        );
    }
}