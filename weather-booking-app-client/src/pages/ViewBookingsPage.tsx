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
  // API Logic: Getting Booking List Data
  const [bookingListData, setBookingListData] = useState<BookingResponse[]>([]);
  const appCtx = useContext(AppContext);
  useEffect(() => {
    if (appCtx.userId !== "") {
      BookingEndpoint.getBookingList(appCtx.userId).then((bookings) => {
        setBookingListData(bookings);
      });
    }
  }, [appCtx.userId]);

  // Selected Tab Logic
  const [selectedTab, setSelectedTab] = useState<BookingStatus>("Upcoming");
  const handleTabChange = (tab: BookingStatus) => {
    setSelectedTab(tab);
  };

  // Show Booking Details Logic
  const [selectedBooking, setSelectedBooking] = useState<number>(0);
  const handleBookingClick = (bookingId: number) => {
    setSelectedBooking(bookingId);
  };

  // JSX Logic
  const yourBookingsHeading = <h1 className="bookings-list-title">Your Bookings</h1>;
  const selectedTabHeader = (
    <IonTabBar slot="top" className="bookings-tab-bar">
      <IonTabButton
        className={`bookings-tab ${selectedTab === "Upcoming" ? "bookings-tab-selected" : ""}`}
        tab="Upcoming"
        onClick={() => handleTabChange("Upcoming")}
        selected={selectedTab === "Upcoming"}
      >
        <IonLabel className="bookings-tab__text">Upcoming</IonLabel>
      </IonTabButton>

      <IonTabButton
        className={`bookings-tab ${selectedTab === "Completed" ? "bookings-tab-selected" : ""}`}
        tab="Completed"
        onClick={() => handleTabChange("Completed")}
        selected={selectedTab === "Completed"}
      >
        <IonLabel className="bookings-tab__text">Completed</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );

  // Show Booking Details if booking is selected
  if (selectedBooking) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <BookingDetails
            bookingDetails={
              bookingListData.filter((bookingDetails) => bookingDetails.status === selectedTab)[selectedBooking - 1]
            }
            closeBookingDetails={handleBookingClick}
          />
        </IonContent>
      </IonPage>
    );
  }

  // Show weather card list if no booking is selected
  return (
    <IonPage>
      {yourBookingsHeading}
      {selectedTabHeader}

      <IonContent fullscreen>
        {selectedTab === "Upcoming" ? (
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
