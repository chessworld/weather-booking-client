import React, { useContext, useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonSelect, NavManager } from "@ionic/react";
import { IonContent } from "@ionic/react";
import UserEndpoint from "../../endpoint-caller/userEndpoint";
import { AppContext } from "../../stores/app-context";
import BookingEndpoint from "../../endpoint-caller/bookingEndpoint";
import { StatsResponse } from "../../endpoint-caller/interfaces/bookings/StatsResponse";
import { UserEndpointResponse } from "../../endpoint-caller/interfaces/users/UserEndpointResponse";
import GraphDataField from "./Interface/GraphDataField";
import { ChartOptionConfig } from "./Interface/ChartOptionConfig";
import { WeatherTypes, WeatherType } from "../../endpoint-caller/interfaces/enums/WeatherType";
import { TimePeriods, TimePeriod } from "../../endpoint-caller/interfaces/enums/TimePeriod";
import { WindLevels, WindLevel } from "../../endpoint-caller/interfaces/enums/WindLevel";
import { TemperatureLevels, TemperatureLevel } from "../../endpoint-caller/interfaces/enums/TemperatureLevel";
import "./StatisticsPage.css";
import Kofi from "../../components/ShareComponents/Kofi";

type GraphData = "weather" | "time" | "wind" | "temperature";

const StatisticsPage: React.FC = () => {
  const editableNameField = useRef<null | HTMLInputElement>(null);

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
    if (nameField.disabled == true) {
      nameField.disabled = false;
    } else {
      var updatedName = nameField.value as string;
      if (userData == undefined) {
        console.log("Cannot edit name");
      } else {
        UserEndpoint.patchUserName(userData?.id as string, updatedName);
      }
      nameField.disabled = true;
    }
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
          backgroundColor: "#1e90ff",
          stack: "Stack 0",
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
            {/* <div className="home-page-heading-container">
              <h2 className="statistic-page-title">
                {`Welcome `}
                <input ref={editableNameField} type="text" id="nameField" className="name-field" disabled></input>{" "}
              </h2>
              <button onClick={editName} className="edit-name-button">
                <svg className="svg-class" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
                  <path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
                </svg>
              </button>
            </div> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="home-page-app-name-container">
                <h1 className="home-page-app-name">Mr Bluesky</h1>
                <p className="home-page-app-hook">Book your perfect weather</p>
              </div>
            </div>
            <div className="grid-container__wrapper">
              <div className="app-icon-container">
                <img src="src/assets/icons/sun_cloud_rain.png" />
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
              <select
                className="home-page-select-option"
                onChange={(e) => changeGraphData(e.target.value as GraphData)}
              >
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
};
export default StatisticsPage;
