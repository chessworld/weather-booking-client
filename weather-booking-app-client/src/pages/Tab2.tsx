import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonImg,
} from "@ionic/react";

import React from "react";
import WeatherCardList from "../components/WeatherCardList";
import "./Tab2.css";
import { useState, useEffect } from "react";
import BookingDetails from "../components/BookingDetails";
import BookingDetailsCompleted from "../components/BookingDetailsCompleted";
import coffee from "../assets/coffee.png";
import BookingEndpoint from "../endpoint-caller/bookingEndpoint";

interface AbcState {
    [category: string]: any;
}

const Tab2: React.FC = (AbcState) => {
    const [selectedTab, setSelectedTab] = useState("upcoming");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookingList, setBookingList] : [any[] | null, any] = useState(null);

    useEffect(() => {
        BookingEndpoint.getBookingList().then((bookings) => {
            setBookingList(bookings);
            console.log(bookings);
        });
    }, []);

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const handleBookingClick = (booking: any) => {
        setSelectedBooking(booking);
        console.log(selectedBooking);
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

    const getAllBookings = () => {
        
    }

    return (
        <IonPage>
            {!selectedBooking && (
                <h1 className="bookings-list-title">Your Bookings</h1>
            )}
            {!selectedBooking && (
                <IonTabBar slot="top" className="bookings-tab-bar">
                    <IonTabButton
                        className={`bookings-tab ${selectedTab === "upcoming" ? "bookings-tab-selected" : ""
                            }`}
                        tab="upcoming"
                        onClick={() => handleTabChange("upcoming")}
                        selected={selectedTab === "upcoming"}
                    >
                        <IonLabel>Upcoming</IonLabel>
                    </IonTabButton>

                    <IonTabButton
                        className={`bookings-tab ${selectedTab === "completed" ? "bookings-tab-selected" : ""
                            }`}
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
                    <BookingDetails
                        data={bookingList && bookingList[selectedBooking - 1]}
                        closeBookingDetail={handleBookingClick}
                    />
                ) : selectedBooking && selectedTab === "completed" ? (
                    <BookingDetailsCompleted
                        data={dummyDataCompleted[selectedBooking - 1]}
                        closeBookingDetail={handleBookingClick}
                    />
                ) : selectedTab === "upcoming" ? (
                    <WeatherCardList
                        data={
                            bookingList && bookingList.filter((item: any) => new Date(item.booking[0].day_time.date) >= new Date())
                        }
                        openBookingDetail={handleBookingClick}
                        upcoming={true}
                    />
                ) : (
                    <div>
                        <WeatherCardList
                            data={
                                bookingList && bookingList.filter((item: any) => {
                                    if (new Date(item.booking[0].day_time.date) < new Date()
                                        && item.weather_option.length > 1) {
                                        return true;
                                    }
                                })
                            }
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
