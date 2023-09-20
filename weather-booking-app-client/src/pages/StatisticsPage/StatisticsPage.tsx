import React, { useContext, useState, useEffect, useRef } from 'react';
import { Chart, registerables} from 'chart.js';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import { IonButton, IonInput, IonPage, IonSelect } from '@ionic/react';
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
import { StackedBarChartData, dataField, dataInput } from './ChartData/StackedBarChartData';
import { WeatherTypes } from '../../endpoint-caller/interfaces/enums/WeatherType';
import { TimePeriods } from '../../endpoint-caller/interfaces/enums/TimePeriod';
import { WindLevels } from '../../endpoint-caller/interfaces/enums/WindLevel';
import { TemperatureLevels } from '../../endpoint-caller/interfaces/enums/TemperatureLevel';
import { set } from 'date-fns';

type GraphData = "weather" | "time" | "wind" | "temperature"
const GraphDatas = ["weather", "time", "wind", "temperature"]

const StatisticsPage: React.FC = () => {

    
    // Bar chart dataa
    Chart.register(...registerables)
    //StackedBarChartData holds stacked bar chart data.
    const emptyDataInput: dataInput = {
            dataName: '',
            dataLabel: [],
            dataCount: [],
    }
    const emptyDataField: dataField = {
        labels: [],
        datasets: []
    }

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const hasRun = useRef(false);
    const [selectedValue, setSelectedValue] = useState('weather');
    const [statListData, setStatListData] = useState<StatsResponse[]>([]);
    const [userData, setUserData] = useState<UserEndpointResponse>();
    const appCtx = useContext(AppContext);
    const [chartData, setChartData] = useState<dataField>(emptyDataField)
    const stackedBarChartData = new StackedBarChartData()
    const nameField = document.getElementById('nameField') as HTMLInputElement
    
    

    const weatherData = {
        dataName: 'Weather',
        dataLabel: WeatherTypes,
        dataCount: WeatherTypes.map(() => 0),
    }
    const timeData = {
        dataName: 'Time',
        dataLabel: TimePeriods,
        dataCount: TimePeriods.map(() => 0),
    }
    const windData = {
        dataName: 'Wind',
        dataLabel: WindLevels,
        dataCount: WindLevels.map(() => 0),
    }
    const temperatureData = {
        dataName: 'Temperature',
        dataLabel: TemperatureLevels,
        dataCount: TemperatureLevels.map(() => 0),
    }

    //Edit name function called when EditName button is called
    const editName = () => {
        if (nameField.disabled == true){
            nameField.disabled = false
        }else{
            var updatedName = nameField.value as string
            if (userData == undefined){
                console.log("Cannot edit name")
            }else{
                UserEndpoint.patchUserName(userData?.id as string, updatedName)
            }
            nameField.disabled = true
        }
    }

    //TODO: change graph data according to 
    const changeGraphData = (value: string) => {
        switch (value.toLocaleLowerCase()){
            case "weather": {
                stackedBarChartData.initialiseStatsData(weatherData)
                setChartData(stackedBarChartData.getData())
                break;
            }
            case "time": {
                stackedBarChartData.initialiseStatsData(timeData)
                setChartData(stackedBarChartData.getData())
                break;
            }
                
            case "wind": {
                stackedBarChartData.initialiseStatsData(windData)
                setChartData(stackedBarChartData.getData())
                break;
            }
            case "temperature": {
                stackedBarChartData.initialiseStatsData(temperatureData)
                setChartData(stackedBarChartData.getData())
                break;
            }
        }
    }

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

    useEffect(() => {
        setIsLoading(statListData.length == 0 && userData == undefined && nameField == null);
    }, [statListData, userData, nameField])

    useEffect(() => {
        if(!isLoading && !hasRun.current) {
            console.log(weatherData)
            stackedBarChartData.initialiseStatsData(weatherData);
            setChartData(stackedBarChartData.getData());
            hasRun.current = true  
        }
    }, [isLoading, weatherData]);

    
    //Update booking amount 
    var bookingAmount = statListData.length.toString()
    if (nameField != null && userData != undefined){
        nameField.value = userData.name as string
    }
    // populate record data
    for (let stat of statListData){
        var bookedWeather = stat.weather_option.weather
        var bookedTime = stat.time_period
        var bookedWind = stat.weather_option.wind
        var bookedTempt = stat.weather_option.temperature
            
        //Add data to all dataInput
        weatherData.dataCount[weatherData.dataLabel.indexOf(bookedWeather)] += 1
        timeData.dataCount[timeData.dataLabel.indexOf(bookedTime)] += 1
        windData.dataCount[windData.dataLabel.indexOf(bookedWind)] += 1
        temperatureData.dataCount[temperatureData.dataLabel.indexOf(bookedTempt)] += 1
        //console.log(`${bookedWeather}, ${bookedTime}, ${bookedWind}, ${bookedTempt}`)
    }   
    
    console.log(weatherData)
    
    // stackedBarChartData.initialiseStatsData(weatherData)
    // setChartData(stackedBarChartData.getData())
    //Hi luyang please help with css :) refer to discord for the layout
    return (
        <IonPage>
            <IonContent fullscreen>
                {isLoading ? (
                <div className='loader-container'>
                    <div className='spinner'></div>
                </div>
                ) : (
                <>
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
                        <select onChange={(e) => {
                                changeGraphData(e.target.value);
                                setSelectedValue(e.target.value);
                            }}
                        >
                            <option value="weather">Weather</option>
                            <option value="time">Time</option>
                            <option value="wind">Wind</option>
                            <option value="temperature">Temperature</option>
                        </select>
                    </div>
                    <div>
                        <Bar data={chartData} options={stackedBarChartData.getOption()} />
                    </div>
                </>
                )}
                
            </IonContent>
        </IonPage>
    );

}
export default StatisticsPage;
