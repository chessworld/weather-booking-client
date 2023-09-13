import React, { useContext, useState } from 'react';
import { Component, useRef } from 'react';
import { Chart, registerables, ChartOptions } from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import { IonButton, IonPage } from '@ionic/react';
import './StatisticsPage.css';
import defaultData from "./MockData/data.json";
import { IonContent } from '@ionic/react';
import { AppContext, AppContextInterface } from '../../stores/app-context';
import DeviceManager from '../../device/DeviceManager';
import UserEndpoint from '../../endpoint-caller/userEndpoint';
import BookingEndpoint from '../../endpoint-caller/bookingEndpoint';
import { BookingResponse } from '../../endpoint-caller/interfaces/bookings/BookingResponse';
import Background from '../../components/ScreenComponents/Background';
import { Link } from 'react-router-dom';

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
        labels: string[],
        datasets: {
            data: number[]
        }[]
    }
}

interface StatisticPageState {
    chartOptions: ChartOptions,
    doughnutChartOptions: ChartOptions;
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
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            },
            bookingAmountData: this.props.bookingAmountData ? {
                ...this.props.bookingAmountData,
                datasets: [
                    {
                        ...this.props.bookingAmountData.datasets[0],
                        label: 'Number of booking',
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ]

            } : defaultData.bookingAmountData,
            // bookingAmountData: this.props.bookingAmountData ? {
            //     ...this.props.bookingAmountData,
            //     datasets: [
            //         {
            //             ...this.props.bookingAmountData.datasets[0],
            //             label: 'Number of booking this week',
            //             backgroundColor: 'rgba(255, 99, 132)',
            //             borderColor: 'rgba(255, 99, 132)',
            //             borderWidth: 1,
            //             fill: false,
            //             tension: 0.1
            //         }
        
            // mockData.bookingAmountData,

            // mostGuessedWeather: this.props.mostGuessedWeather ? {
            //     ...this.props.mostGuessedWeather,
            //     datasets: [{
            //         ...this.props.mostGuessedWeather,
            //         datasets: [
            //           {
            //             label: '# of Votes',
            //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
            //             borderColor: 'rgba(255, 99, 132, 1)',
            //             borderWidth: 1,
            //           },
            //         ],
            //       }]
            // } : defaultData.mostGuessedWeather,
            mostGuessedWeather: this.props.mostGuessedWeather ? {
                ...this.props.mostGuessedWeather,
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
            } : defaultData.mostGuessedWeather,
            bookingAcuracyData: this.props.bookingAcuracyData ? {
                ...this.props.bookingAcuracyData,
                datasets: [{
                    label: 'Booking Accuracy',
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    ...this.props.bookingAcuracyData.datasets[0]
                }]
            } : defaultData.bookingAcurracyData
        }

    }

    componentDidMount() {
        Chart.register(...registerables);
        // this.getUserStats()
    }

    // getUserStats(){
    //     DeviceManager.getOrCreateDeviceId()
    //   .then((deviceId) => {
    //     UserEndpoint.getUser(deviceId)
    //       .then((user) => {
    //         //Change welcome message
    //         const welcomeH1 = document.getElementById("welcome-h1") as HTMLElement
    //         welcomeH1.innerHTML = `Hi ${user.name as string}!`

    //         //Get user booking
    //         BookingEndpoint.getBookingList(user.id as string).then((bookingList) => {
    //             const totalBooking = document.getElementById("total-bookings") as HTMLElement
    //             totalBooking.innerHTML = bookingList.length.toString()

    //             //Update Stats
    //             //Used for bookingAmountData
    //             let dataAmount = [0,0,0,0,0,0,0]
    //             let bookingAmountData = this.state.bookingAmountData
    //             let amountDataset = bookingAmountData.datasets.pop()

    //             //Used for bookingAcuracyData
    //             let dataAcc = [0,0,0]
    //             let bookingAccuracy = this.state.mostGuessedWeather
    //             let accuracyDataset = bookingAccuracy.datasets.pop()
                
    //             for (var booking of bookingList) {
    //                 //Increment dataAmount 
    //                 let date = new Date(booking.date)
    //                 dataAmount[date.getDay()] += 1
    //                 //TODO: Count accuracy 
    //                 switch (booking.result) {
    //                     case "Successful": {
    //                         dataAcc[0] += 1;
    //                         break;
    //                     }
    //                     case "Failed": {
    //                         dataAcc[1] += 1;
    //                         break;
    //                     }
    //                     case "Pending": {
    //                         dataAcc[2] += 1;
    //                         break;
    //                     }
    //                     default: {
    //                         //nothing
    //                         break;
    //                     }
    //                 }
    //             }

    //             //Update amount dataset
    //             amountDataset.data = dataAmount
    //             bookingAmountData.datasets.push(amountDataset)

    //             //Update acuracy dataset
    //             accuracyDataset.data = dataAcc
    //             dataAcc[0] = 7
    //             dataAcc[1] = 3
    //             bookingAccuracy.datasets.push(accuracyDataset)
    //             const acuracyValue = document.getElementById('acuracy-value-percentage') as HTMLElement
    //             let perc = ((dataAcc[0])/(dataAcc[0] + dataAcc[1]))*100
    //             if (isNaN(perc)) {
    //                 acuracyValue.innerHTML = `-%`
    //             }else{
    //                 acuracyValue.innerHTML = `${perc.toFixed(0)}%`
    //             }

    //             //Update state
    //             this.setState({
    //                 ...this.state,
    //                 bookingAmountData: bookingAmountData,
    //                 mostGuessedWeather: bookingAccuracy
    //             })

    //             //TODO: Update Booking Accuracy


    //             //TODO: Update Guessed weather 
    //         })
    //     })
    // })
    // }

    render() {
        
        return (
            <IonPage>
                <IonContent fullscreen>
                    <IonContent className='welcome-content'>
                        <div className='welcome-view'>
                            <div className='welcome-card'>
                                    <div className='card-content'>
                                        <h1 id='card-header'>No sun tommorow?</h1>
                                        <div id='card-subtitle'>Lets fix that</div>
                                        <Link to="/bookingPageDateLocation" style={{ textDecoration: 'none' }}>
                                            <button className='booknow-button'>
                                                Start Booking
                                            </button>
                                        </Link>
                                    </div>
                            </div>
                            <div>
                                <h1 className='page-header' id="welcome-h1"> 
                                </h1>
                                <div className='page-body'>
                                    Have a nice day 
                                </div>
                            </div>
                        </div>
                        
                        
                    </IonContent>
                    
                    <IonContent className='statistic-content'>
                            <div>
                                <h1 className='page-header'>Your Stats</h1>
                            </div>
                            <div className='statistic-page-graphs'>
                                    
                                <div className='statistic-page-streaks'>
                                    <div className='statistic-page-current-streak'>
                                        Total bookings made
                                        <span className="statistic-page-number" style={{ background: 'rgba(118, 115, 220, .6)' }} id="total-bookings">
                                            5
                                        </span>
                                    </div>
                                    
                                </div>
                                <div className='graph-title'>
                                    Most booked day
                                </div>
                                
                                <div className="booking-amount-graph-container">
                                    
                                    <Line
                                        data={this.state.bookingAmountData}
                                        options={this.state.chartOptions}
                                    />
                                </div>

                                <div className="most-guessed-weather-container">
                                    <div className="graph-title">Booking Accuracy</div>
                                    <div className="acuracy-graph-content">
                                        <Doughnut options={this.state.doughnutChartOptions} data={this.state.mostGuessedWeather} />
                                        <div className="acuracy-value" id='acuracy-value-percentage'>
                                            0%
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        
                    </IonContent>
                </IonContent>
                
            </IonPage>
        );
    }
}
