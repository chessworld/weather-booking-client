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
import React from "react";
import WeatherCardList from "../components/WeatherCardList";
import "./Tab2.css";
import { useState } from "react";
import BookingDetails from "../components/BookingDetails";

const Tab2: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking);
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
      </IonTabBar>
      <IonContent fullscreen>
        {selectedBooking ? (
          <BookingDetails
            data={dummyDataUpcoming[selectedBooking - 1]}
            closeBookingDetail={handleBookingClick}
          />
        ) : selectedTab === "upcoming" ? (
          <WeatherCardList
            data={dummyDataUpcoming}
            openBookingDetail={handleBookingClick}
          />
        ) : (
          <WeatherCardList
            data={dummyDataCompleted}
            openBookingDetail={handleBookingClick}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
