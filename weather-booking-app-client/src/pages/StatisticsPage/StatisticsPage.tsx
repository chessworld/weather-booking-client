import React, { useContext, useState, useEffect } from 'react';
import { Chart, registerables} from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import { IonButton, IonInput, IonPage } from '@ionic/react';
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
    const nameField = document.getElementById('nameField') as HTMLInputElement
    const editName = () => {
        if (nameField.disabled == true){
            nameField.disabled = false
        }else{
            //Patch user here.
            nameField.disabled = true
        }
    }

    const barchartdata = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [10, 20, 15, 30, 40, 20, 45],
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0',
          },
          {
            label: 'Dataset 2',
            data: [-10, -20, -15, -30, -40, -20, -45],
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Stack 0',
          },
        //   {
        //     label: 'Dataset 3',
        //     data: [10, 20, -15, -30, 40, 20, 45],
        //     backgroundColor: 'rgb(53, 162, 235)',
        //     stack: 'Stack 1',
        //   },
        ],
      };
    
    const stacked_barchart_options = {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
        },
        responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
    };

    const [statListData, setStatListData] = useState<StatsResponse[]>([]);
    const [userData, setUserData] = useState<UserEndpointResponse>();
    const appCtx = useContext(AppContext);
    
    // Get stats data
    useEffect(() => {
        if (statListData.length == 0) {
            BookingEndpoint.getStats().then((stats) => {
                setStatListData(stats);
                    });
        }
        
    })
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
    // if (userData != undefined){
    //     welcomeH1.innerHTML = `Hi ${userData.name as string}!`
    // }

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

    if (statListData.length == 0 && userData == undefined) {
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
        //totalBooking.innerHTML = statListData.length.toString()
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
                    //Not tracking pending
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
        // if (isNaN(perc)) {
        //     acuracyValue.innerHTML = `-`
        // }else{
        //     acuracyValue.innerHTML = `${perc.toFixed(0)}%`
        //}

        //Start of new code
        var bookingAmount = statListData.length.toString()
        if (userData != undefined){
            nameField.value = userData.name as string
            // userField = userData.name as string
        }

        
        // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        
        
        
    }

    //Hi luyang please help with css :) refer to discord for the layout
    return (
        <IonPage>
            <IonContent fullscreen>
                <div>
                    Hi <input type='text' id='nameField' disabled></input> 
                    <button onClick={editName}>Edit name</button>
                </div>
                <div>
                    Maybe some feedback 
                </div>
                <div>
                    MR Bluesky
                </div>
                <div>
                    Kofi Link here
                </div>
                <div>
                    {bookingAmount}
                </div>
                <div>
                    Graph data to show dropdown
                </div>
                <div>
                <Bar data={barchartdata} options={stacked_barchart_options} />
                </div>
            </IonContent>
            
        </IonPage>
    );

}
export default StatisticsPage;
