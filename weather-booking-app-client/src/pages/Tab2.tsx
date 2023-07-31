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

const Tab2: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [selectedBooking, setSelectedBooking] = useState<number>(0);
  const [locationMapping, setLocations] = useState<any>([]);
  const [weatherData, setWeatherData] = useState<any>([]);

  useEffect(() => {
    BookingEndpoint.getLocation()
      .then((response) => {
        return response;
      })
      .then((data) => {
        setLocations(data);
      });
  }, []);

  useEffect(() => {
    BookingEndpoint.getBookingList().then((bookings) => {
      setWeatherData(
        bookings
          .map((item: any, _: number) => {
            return {
              location: WeatherDataExtractorFromApi.getWeatherLocationFromIdUsingMapping(locationMapping, item),
              weather: WeatherDataExtractorFromApi.getWeatherfromApiData(item),
              datetime: WeatherDataExtractorFromApi.timeToTimeObject(item.booking[0].day_time.date),
            };
          })
          .filter((item: any) => item.weather !== undefined)
      );
    });
  }, [locationMapping]);

  const handleTabChange = (tab: string) => {
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
            className={`bookings-tab ${selectedTab === "upcoming" ? "bookings-tab-selected" : ""}`}
            tab="upcoming"
            onClick={() => handleTabChange("upcoming")}
            selected={selectedTab === "upcoming"}
          >
            <IonLabel>Upcoming</IonLabel>
          </IonTabButton>

          <IonTabButton
            className={`bookings-tab ${selectedTab === "completed" ? "bookings-tab-selected" : ""}`}
            tab="completed"
            onClick={() => handleTabChange("completed")}
            selected={selectedTab === "completed"}
          >
            <IonLabel>Completed</IonLabel>
          </IonTabButton>
        </IonTabBar>
      )}

      <IonContent fullscreen>
        {selectedBooking && selectedTab === "upcoming" ? (
          <BookingDetails data={weatherData && weatherData[selectedBooking]} closeBookingDetail={handleBookingClick} />
        ) : selectedBooking && selectedTab === "completed" ? (
          <BookingDetailsCompleted
            data={weatherData && weatherData[selectedBooking]}
            closeBookingDetail={handleBookingClick}
          />
        ) : selectedTab === "upcoming" ? (
          <WeatherCardList
            data={weatherData.filter((item: any) => {
              if (item.datetime < new Date()) {
                return false;
              }

              return true;
            })}
            openBookingDetail={handleBookingClick}
            upcoming={true}
          />
        ) : (
          <div>
            <WeatherCardList
              data={weatherData.filter((item: any) => {
                if (item.datetime < new Date()) {
                  return true;
                }

                return false;
              })}
              openBookingDetail={handleBookingClick}
              upcoming={false}
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
