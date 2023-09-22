import React, { useContext, useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IonPage, IonSelect } from '@ionic/react';
import { IonContent } from '@ionic/react';
import UserEndpoint from '../../endpoint-caller/userEndpoint';
import { AppContext } from '../../stores/app-context';
import BookingEndpoint from '../../endpoint-caller/bookingEndpoint';
import { StatsResponse } from '../../endpoint-caller/interfaces/bookings/StatsResponse';
import { UserEndpointResponse } from '../../endpoint-caller/interfaces/users/UserEndpointResponse';
import GraphDataField from './Interface/GraphDataField';
import ChartOptionConfig from "./Interface/ChartOptionConfig";
import { WeatherTypes, WeatherType } from '../../endpoint-caller/interfaces/enums/WeatherType';
import { TimePeriods, TimePeriod } from '../../endpoint-caller/interfaces/enums/TimePeriod';
import { WindLevels, WindLevel } from '../../endpoint-caller/interfaces/enums/WindLevel';
import { TemperatureLevels, TemperatureLevel } from '../../endpoint-caller/interfaces/enums/TemperatureLevel';
import './StatisticsPage.css';

type GraphData = "weather" | "time" | "wind" | "temperature"


const StatisticsPage: React.FC = () => {
    const editableNameField = useRef<null | HTMLInputElement>(null);

    // Bar chart data
    Chart.register(...registerables)

    const appCtx = useContext(AppContext);

    const emptyDataField: GraphDataField = {
        labels: [],
        datasets: []
    }

    const [chartData, setChartData] = useState<GraphDataField>(emptyDataField)
    const [currentGraphSelection, setCurrentGraphSelection] = useState<GraphData>("weather");
    const nameField = document.getElementById('nameField') as HTMLInputElement
    const [userData, setUserData] = useState<UserEndpointResponse>();

    //Edit name function called when EditName button is called
    const editName = () => {
        if (nameField.disabled == true) {
            nameField.disabled = false
        } else {
            var updatedName = nameField.value as string
            if (userData == undefined) {
                console.log("Cannot edit name")
            } else {
                UserEndpoint.patchUserName(userData?.id as string, updatedName)
            }
            nameField.disabled = true
        }
    }

    const changeGraphData = (value: GraphData) => {
        setCurrentGraphSelection(value);
    }

    const initializeTally = <T extends string>(typeArray: T[]): { [key in T]: number } => {
        return typeArray.reduce((acc, curr) => {
            acc[curr] = 0;
            return acc;
        }, {} as { [key in T]: number });
    };


    const getWeatherTally = (weatherType: GraphData, stats: StatsResponse[]) => {
        const labels: string[] = [];
        const data: number[] = [];

        const graphDataToTallyKeysMap = {
            weather: WeatherTypes,
            time: TimePeriods,
            wind: WindLevels,
            temperature: TemperatureLevels
        }

        const tally = initializeTally(graphDataToTallyKeysMap[weatherType]);

        stats.forEach(item => {
            switch (weatherType) {
                case "weather":
                    tally[item.weather_option.weather]++;
                    break;
                case "time":
                    tally[item.time_period]++;
                    break;
                case "wind":
                    tally[item.weather_option.wind]++;
                    break;
                case "temperature":
                    tally[item.weather_option.temperature]++;
                    break;
            }
        });

        Object.keys(tally).forEach((key) => {
            data.push(tally[key]);
            labels.push(key);
        });

        return {
            labels: labels,
            datasets: [{
                label: weatherType,
                data: data,
                backgroundColor: '#1e90ff',
                stack: 'Stack 0',
            }]
        };
    };

    // Get stats data
    useEffect(() => {
        BookingEndpoint.getStats().then((stats) => {
            setChartData(() => getWeatherTally(currentGraphSelection, stats));
        });
    }, [currentGraphSelection])

    // Get user data set
    useEffect(() => {
        if (appCtx.userId !== "") {
            UserEndpoint.getUser(appCtx.userId).then((user) => {
                setUserData(user);

                if (user.name)
                    editableNameField.current!.value = user.name;
            });
        }

    }, [appCtx.userId]);

    return (
        <IonPage>
            <IonContent fullscreen>
                {
                    chartData.datasets.length == 0 ? (
                        <div className='loader-container'>
                            <div className='spinner' />
                        </div>
                    ) : (
                        <>
                            <div>
                                Hi <input ref={editableNameField} type='text' id='nameField' disabled></input>
                                <button onClick={editName}>Edit name</button>
                            </div>
                            <div>Maybe some feedback</div>
                            <div>MR Bluesky</div>
                            <div>Kofi Link here</div>
                            <div>{/* bookingAmount */}</div>
                            <div>
                                <select onChange={(e) => changeGraphData(e.target.value as GraphData)}>
                                    <option value="weather">Weather</option>
                                    <option value="time">Time</option>
                                    <option value="wind">Wind</option>
                                    <option value="temperature">Temperature</option>
                                </select>
                            </div>
                            <div>
                                <Bar data={chartData} options={ChartOptionConfig} />
                            </div>
                        </>
                    )}

            </IonContent>
        </IonPage>
    );

}
export default StatisticsPage;
