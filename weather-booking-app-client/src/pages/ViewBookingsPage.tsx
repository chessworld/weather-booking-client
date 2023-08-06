import { IonContent, IonPage, IonTabBar, IonTabButton, IonLabel, IonImg } from "@ionic/react";
import "./ViewBookingsPage.css";
import BookingDetails from "../components/ViewBookingsComponents/BookingDetails";
import BookingEndpoint from "../endpoint-caller/bookingEndpoint";
import React from "react";
import WeatherCardList from "../components/ViewBookingsComponents/WeatherCardList";
import coffee from "../assets/coffee.png";
import { useState, useEffect, useContext } from "react";
import { BookingResponse } from "../endpoint-caller/interfaces/bookings/BookingResponse";
import { BookingStatus } from "../endpoint-caller/interfaces/enums/BookingStatus";
import { AppContext } from "../stores/app-context";

const ViewBookingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<BookingStatus>("Upcoming");
  const [selectedBooking, setSelectedBooking] = useState<number>(0);
  const [bookingListData, setBookingListData] = useState<BookingResponse[]>([]);
  const appCtx = useContext(AppContext);

  useEffect(() => {
    if (appCtx.userId !== "") {
      BookingEndpoint.getBookingList(appCtx.userId).then((bookings) => {
        setBookingListData(bookings);
      });
    }
  }, [appCtx.locations]);

  const handleTabChange = (tab: BookingStatus) => {
    setSelectedTab(tab);
  };

  const handleBookingClick = (bookingId: number) => {
    setSelectedBooking(bookingId);
  };

  // JSX Logic
  let yourBookingsHeading;
  yourBookingsHeading = <h1 className="bookings-list-title">Your Bookings</h1>;

  let selectedTabHeader;
  selectedTabHeader = (
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
  );

  return (
    <IonPage>
      {!selectedBooking && yourBookingsHeading}
      {!selectedBooking && selectedTabHeader}

      <IonContent fullscreen>
        {selectedBooking ? (
          <BookingDetails
            bookingDetails={
              bookingListData.filter((bookingDetails) => bookingDetails.status === selectedTab)[selectedBooking - 1]
            }
            closeBookingDetails={handleBookingClick}
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

export default ViewBookingsPage;
