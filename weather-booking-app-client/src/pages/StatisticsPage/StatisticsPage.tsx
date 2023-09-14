import React, { useContext, useState, useEffect } from 'react';
import { Chart, registerables} from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import { IonPage } from '@ionic/react';
import './StatisticsPage.css';
import { IonContent } from '@ionic/react';
import { AppContext} from '../../stores/app-context';
import UserEndpoint from '../../endpoint-caller/userEndpoint';
import BookingEndpoint from '../../endpoint-caller/bookingEndpoint';
import { Link } from 'react-router-dom';
import { StatsResponse } from '../../endpoint-caller/interfaces/bookings/StatsResponse';
import { UserEndpointResponse } from '../../endpoint-caller/interfaces/users/UserEndpointResponse';
import { BookingAmountData } from './ChartData/BookingAmountData';
import { BookingAccuracyData } from './ChartData/BookingAccuracyData';

const StatisticsPage: React.FC = () => {

    
    // API Logic: Get statistic data
    const [statListData, setStatListData] = useState<StatsResponse[]>([]);
    const [userData, setUserData] = useState<UserEndpointResponse>();
    const appCtx = useContext(AppContext);
    
    // Get stats data
    BookingEndpoint.getStats().then((stats) => {
        setStatListData(stats);
            });

    // Get user data set
    useEffect(() => {
        if (appCtx.userId !== "") {
        UserEndpoint.getUser(appCtx.userId).then((user) => {
            setUserData(user);
            });
                }
    }, [appCtx.userId]);

    //Update user name
    const welcomeH1 = document.getElementById("welcome-h1") as HTMLElement
    if (userData != undefined){
        welcomeH1.innerHTML = `Hi ${userData.name as string}!`
    }

    // Stats options
    Chart.register(...registerables)
    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false
    }
    var doughnutChartOptions = {
        plugins: {
            legend: {
                display: false,
                    }
                }
    }
    // NOTE: To add more chart data checkout react-chartjs2 docs and add them seperately in ChartData folder
    var bookingAmountData = BookingAmountData
    var bookingAcurracyData = BookingAccuracyData

    if (statListData.length == 0) {
        return (
            <IonPage>
                <IonContent fullscreen>
                    {/* Innerhtml that were updated in function must be declared and hid, TODO: Improve this one*/}
                    <div className='hidden'>
                        <h1 className='page-header' id="welcome-h1"> </h1>
                        <span className="statistic-page-number" style={{ background: 'rgba(118, 115, 220, .6)' }} id="total-bookings">-</span>
                        <div className="acuracy-value" id='acuracy-value-percentage'>-</div>
                    </div>
                    <div className='loader-container'>
                        <div className='spinner'></div>
                    </div>
                    
                </IonContent>
            </IonPage>
            
        )
    }else{

        //Update total booking stat
        const totalBooking = document.getElementById("total-bookings") as HTMLElement
        totalBooking.innerHTML = statListData.length.toString()

        //Populate stats
        let dataAcc = [0,0,0]
        let dataAmount = [0,0,0,0,0,0,0]
        for (var booking of statListData) {

            //Increment dataAmount 
            let date = new Date(booking.date)
            dataAmount[date.getDay()] += 1
            //TODO: Count accuracy 
            switch (booking.result) {
                case "Successful": {
                    dataAcc[0] += 1;
                    break;
                }
                case "Failed": {
                    dataAcc[1] += 1;
                    break;
                }
                case "Pending": {
                    dataAcc[2] += 1;
                    break;
                }
                default: {
                    //nothing
                    break;
                }
            }
        }

        //Update chart data
        var updatedAmountDataset = {
            ...bookingAmountData.datasets[0],
            data: dataAmount
        }
        bookingAmountData = {
            ...bookingAmountData,
            datasets: [updatedAmountDataset]
        }

        var updatedAcuracyDataset = {
            ...bookingAcurracyData.datasets[0],
            data: dataAcc
        }
        bookingAcurracyData = {
            ...bookingAcurracyData,
            datasets: [updatedAcuracyDataset]

        }

        const acuracyValue = document.getElementById('acuracy-value-percentage') as HTMLElement
        let perc = ((dataAcc[0])/(dataAcc[0] + dataAcc[1]))*100
        if (isNaN(perc)) {
            acuracyValue.innerHTML = `-`
        }else{
            acuracyValue.innerHTML = `${perc.toFixed(0)}%`
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
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
                        <h1 className='page-header' id="welcome-h1"> </h1>
                        <div className='page-body'>
                            Have a nice day 
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='page-header'>App statistics</h1>
                </div>
                <div className='statistic-page-graphs'>    
                    <div className='statistic-page-streaks'>
                        <div className='statistic-page-current-streak'>
                            Total bookings made
                            <span className="statistic-page-number" style={{ background: 'rgba(118, 115, 220, .6)' }} id="total-bookings">
                                -
                            </span>
                        </div>     
                    </div>
                    <div className='graph-title'>
                        Most booked day
                    </div> 
                    
                    <div className="booking-amount-graph-container">
                       <Line data={bookingAmountData} options={chartOptions} />
                    </div>

                    <div className="most-guessed-weather-container">
                        <div className="graph-title">Booking Accuracy</div>
                        <div className="acuracy-graph-content">
                            <Doughnut options={doughnutChartOptions} data={bookingAcurracyData} />
                            <div className="acuracy-value" id='acuracy-value-percentage'>
                                -
                            </div>
                        </div>
                                
                    </div>
                </div>
                    
            </IonContent>
            
        </IonPage>
    );

}
export default StatisticsPage;
