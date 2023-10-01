import React, { useContext, useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { IonButton, IonInput, IonPage } from "@ionic/react";
import { IonContent, IonSegment, IonSegmentButton, IonIcon } from "@ionic/react";
import UserEndpoint from "../../endpoint-caller/userEndpoint";
import { AppContext } from "../../stores/app-context";
import BookingEndpoint from "../../endpoint-caller/bookingEndpoint";
import { StatsResponse } from "../../endpoint-caller/interfaces/bookings/StatsResponse";
import { UserEndpointResponse } from "../../endpoint-caller/interfaces/users/UserEndpointResponse";
import GraphDataField from "./Interface/GraphDataField";
import { ChartOptionConfig } from "./Interface/ChartOptionConfig";
import { WeatherTypes } from "../../endpoint-caller/interfaces/enums/WeatherType";
import { TimePeriods } from "../../endpoint-caller/interfaces/enums/TimePeriod";
import { WindLevels } from "../../endpoint-caller/interfaces/enums/WindLevel";
import { TemperatureLevels } from "../../endpoint-caller/interfaces/enums/TemperatureLevel";
import "./StatisticsPage.css";
import Kofi from "../../components/ShareComponents/Kofi";

import {
  timeOutline,
  trailSignOutline,
  thermometerOutline,
  sunnyOutline,
  createOutline,
  checkmarkOutline,
} from "ionicons/icons";

type GraphData = "weather" | "time" | "wind" | "temperature";

const StatisticsPage: React.FC = () => {
  const editableNameField = useRef<null | HTMLInputElement>(null);
  const [isEditingName, setIsEditingName] = useState(false);

  // Bar chart data
  Chart.register(...registerables);

  const appCtx = useContext(AppContext);

  const emptyDataField: GraphDataField = {
    labels: [],
    datasets: [],
  };

  const [chartData, setChartData] = useState<GraphDataField>(emptyDataField);
  const [currentGraphSelection, setCurrentGraphSelection] = useState<GraphData>("weather");
  const nameField = document.getElementById("nameField") as HTMLInputElement;
  const [userData, setUserData] = useState<UserEndpointResponse>();

  //Edit name function called when EditName button is called
  const editName = () => {
    if (userData == undefined || !editableNameField.current?.value.trim()) {
      console.log("Cannot edit name");
    } else {
      userData.name = editableNameField.current!.value;
      UserEndpoint.patchUserName(userData?.id as string, editableNameField.current!.value);
    }
  };

  //Toggle isEditingName
  const toggleIsEditingName = () => {
    if (isEditingName) {
      editName();
    }
    setIsEditingName(!isEditingName);
  };

  const changeGraphData = (value: GraphData) => {
    setCurrentGraphSelection(value);
  };

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
      temperature: TemperatureLevels,
    };
    const tally = initializeTally(graphDataToTallyKeysMap[weatherType]);

    stats.forEach((item) => {
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
      datasets: [
        {
          label: weatherType,
          data: data,
          backgroundColor: "#29abe0",
          borderWidth: 0,
          borderRadius: 10,
          borderSkipped: false,
          barPercentage: 0.4,
          categoryPercentage: 0.4,
          borderDash: [5, 5],
        },
      ],
    };
  };

  // Get stats data
  useEffect(() => {
    BookingEndpoint.getStats().then((stats) => {
      setChartData(() => getWeatherTally(currentGraphSelection, stats));
    });
  }, [currentGraphSelection]);

  // Get user data set
  useEffect(() => {
    if (appCtx.userId !== "") {
      UserEndpoint.getUser(appCtx.userId).then((user) => {
        setUserData(user);
        if (user.name) editableNameField.current!.value = user.name;
      });
    }
  }, [appCtx.userId]);

  return (
    <IonPage>
      <IonContent fullscreen>
        {chartData.datasets.length == 0 ? (
          <div className="loader-container">
            <div className="spinner" />
          </div>
        ) : (
          <>
            {/* <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="home-page-app-name-container">
                <h1 className="home-page-app-name">Mr Bluesky</h1>
                <p className="home-page-app-hook">Book your perfect weather</p>
              </div>
            </div> */}
            <div className="welcome-container">
              <h2 className="welcome-text">
                Welcome{" "}
                {!isEditingName ? (
                  userData?.name
                ) : (
                  <input ref={editableNameField} type="text" id="nameField" placeholder={userData?.name}></input>
                )}
              </h2>
              <IonButton className="invisible-button home-page-edit-button" onClick={toggleIsEditingName}>
                {!isEditingName ? (
                  <IonIcon icon={createOutline} slot="icon-only"></IonIcon>
                ) : (
                  <IonIcon icon={checkmarkOutline} slot="icon-only"></IonIcon>
                )}
              </IonButton>
            </div>
            <div className="grid-container__wrapper">
              <div className="app-icon-container">
                <img src="src/assets/mr_bluesky_logo.png" />
              </div>
              <div className="number-of-bookings-content">
                <p>We've made</p>
                <div className="number-bookings-text">
                  <h1>
                    {chartData.datasets.length == 1
                      ? chartData.datasets[0].data.reduce((sum, current) => sum + current, 0)
                      : 0}
                  </h1>
                </div>
                <p>Bookings this month</p>
              </div>
              <div className="statistics-page__buy-me-a-kofi">
                <Kofi color="#29abe0" id="D1D1PFTTH" label="Support Us on Ko-fi"></Kofi>
              </div>
            </div>
            <div>{/* bookingAmount */}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <IonSegment
                className="weather-selection"
                onIonChange={(e) => changeGraphData(e.target.value as GraphData)}
                value={currentGraphSelection}
              >
                <IonSegmentButton value="weather" className="timeperiod-button">
                  <IonIcon className="time-period-icon" icon={sunnyOutline} />
                  <p>Weather</p>
                </IonSegmentButton>
                <IonSegmentButton value="time" className="timeperiod-button">
                  <IonIcon className="time-period-icon" icon={timeOutline} />
                  <p>Time</p>
                </IonSegmentButton>
                <IonSegmentButton value="wind" className="timeperiod-button">
                  <IonIcon className="time-period-icon" icon={trailSignOutline} />
                  <p>Wind</p>
                </IonSegmentButton>
                <IonSegmentButton value="temperature" className="timeperiod-button">
                  <IonIcon className="time-period-icon" icon={thermometerOutline} />
                  <p>Tempt</p>
                </IonSegmentButton>
              </IonSegment>
            </div>
            <div className="bar-graph">
              <Bar data={chartData} options={ChartOptionConfig} />
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};
export default StatisticsPage;
