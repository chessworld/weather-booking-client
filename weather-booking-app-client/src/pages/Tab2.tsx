import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonTabs,
  IonRouterOutlet,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import WeatherCardList from "../components/WeatherCardList";
import "./Tab2.css";
import { useState } from "react";
import { Redirect } from "react-router";

const Tab2: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const dummyDataUpcoming = [
    {
      id: 1,
      location: "Monash University",
      date: "Monday, 10 July",
      weather: "Sunny, Warm, No Wind",
    },
    {
      id: 2,
      location: "Clayton, VIC",
      date: "Saturday, 1 April",
      weather: "Sunny, Hot, No Wind",
    },
    {
      id: 3,
      location: "Glen Waverley, VIC",
      date: "Thursday, 27 April",
      weather: "Rainy, Cold, Wind",
    },
  ];
  const dummyDataCompleted = [
    {
      id: 1,
      location: "Home",
      date: "Sunday, 13 November",
      weather: "Cloudy, Mild, No Wind",
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Bookings</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonTabBar slot="top">
          <IonTabButton
            tab="upcoming"
            onClick={() => handleTabChange("upcoming")}
            selected={selectedTab === "upcoming"}
          >
            <IonLabel>Upcoming</IonLabel>
          </IonTabButton>

          <IonTabButton
            tab="completed"
            onClick={() => handleTabChange("completed")}
            selected={selectedTab === "completed"}
          >
            <IonLabel>Completed</IonLabel>
          </IonTabButton>

          {/* <IonTabButton tab="library" href="/library">
                <IonIcon icon={library} />
                <IonLabel>Library</IonLabel>
              </IonTabButton> */}
        </IonTabBar>
      <IonContent fullscreen>
      {selectedTab === "upcoming" ? <WeatherCardList data={dummyDataUpcoming} /> : <WeatherCardList data={dummyDataCompleted} />}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
