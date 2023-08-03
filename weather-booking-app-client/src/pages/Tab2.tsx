import { IonContent, IonPage, IonTabBar, IonTabButton, IonLabel, IonImg } from "@ionic/react";

import "./Tab2.css";
import BookingDetails from "../components/ViewBookingsComponents/BookingDetails";
import BookingDetailsCompleted from "../components/ViewBookingsComponents/BookingDetailsCompleted";
import BookingEndpoint from "../endpoint-caller/bookingEndpoint";
import React from "react";
import WeatherCardList from "../components/ViewBookingsComponents/WeatherCardList";
import WeatherDataExtractorFromApi from "../components/ViewBookingsComponents/Utility/WeatherDataExtractorFromApi";
import coffee from "../assets/coffee.png";
import { useState, useEffect } from "react";
import { Location } from "../endpoint-caller/interfaces/locations/Location";
import { BookingResponse } from "../endpoint-caller/interfaces/bookings/BookingResponse";
import { BookingStatus } from "../endpoint-caller/interfaces/enums/BookingStatus";
import { key } from "ionicons/icons";

const Tab2: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<BookingStatus>("Upcoming");
  const [selectedBooking, setSelectedBooking] = useState<number>(0);
  const [locations, setLocations] = useState<Location[]>([]);
  const [bookingListData, setBookingListData] = useState<BookingResponse[]>([]);

  useEffect(() => {
    BookingEndpoint.getLocation().then((response) => {
      setLocations(response);
    });
  }, []);

  useEffect(() => {
    BookingEndpoint.getBookingList("db66adee-b24d-4491-963f-bfdacdde4cfa").then((bookings) => {
      console.log(bookings);
      setBookingListData(bookings);
    });
  }, [locations]);

  const handleTabChange = (tab: BookingStatus) => {
    console.log(bookingListData);
    setSelectedTab(tab);
  };

  const handleBookingClick = (bookingId: number) => {
    setSelectedBooking(bookingId);
  };

  return (
    <IonPage>
      {!selectedBooking && <h1 className="bookings-list-title">Your Bookings</h1>}

      {!selectedBooking && (
        <IonTabBar slot="top" className="bookings-tab-bar">
          <IonTabButton
            className={`bookings-tab ${selectedTab === "Upcoming" ? "bookings-tab-selected" : ""}`}
            tab="Upcoming"
            onClick={() => handleTabChange("Upcoming")}
            selected={selectedTab === "Upcoming"}
          >
            <IonLabel>Upcoming</IonLabel>
          </IonTabButton>

          <IonTabButton
            className={`bookings-tab ${selectedTab === "Completed" ? "bookings-tab-selected" : ""}`}
            tab="Completed"
            onClick={() => handleTabChange("Completed")}
            selected={selectedTab === "Completed"}
          >
            <IonLabel>Completed</IonLabel>
          </IonTabButton>
        </IonTabBar>
      )}

      <IonContent fullscreen>
        {selectedBooking && selectedTab === "Upcoming" ? (
          <BookingDetails bookingDetails={bookingListData[selectedBooking]} closeBookingDetails={handleBookingClick} />
        ) : selectedBooking && selectedTab === "Completed" ? (
          <BookingDetailsCompleted
            data={weatherData && weatherData[selectedBooking]}
            closeBookingDetail={handleBookingClick}
          />
        ) : selectedTab === "Upcoming" ? (
          <WeatherCardList
            bookingListData={bookingListData.filter((bookingDetails) => bookingDetails.status === "Upcoming")}
            openBookingDetails={handleBookingClick}
            key="upcoming"
          />
        ) : (
          <div>
            <WeatherCardList
              bookingListData={bookingListData.filter((bookingDetails) => bookingDetails.status === "Completed")}
              openBookingDetails={handleBookingClick}
              key="completed"
            />
            <a href="https://ko-fi.com/" className="coffee-img-container">
              <p className="coffee-text">Support Us!</p>
              <IonImg src={coffee} className="coffee-img"></IonImg>
            </a>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
