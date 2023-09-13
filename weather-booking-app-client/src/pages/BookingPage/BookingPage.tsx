import "./BookingPage.css";
import Background from "../../components/ScreenComponents/Background";
import BookingEndpoint from "../../endpoint-caller/bookingEndpoint";
import BookingPageProps from "./Interface/BookingPageProps";
import { BookingPageState, isBookingDetails } from "./Interface/BookingPageState";
import ConfirmBookingDetails from "../../components/ConfirmBookingDetails/ConfirmBookingDetails";
import React from "react";
import { withRouter } from "react-router-dom";
import WeatherHud from "../../components/BookWeatherComponents/WeatherHud";
import { Component } from "react";
import { IonToast, IonRange, IonPage, IonButton, IonIcon } from "@ionic/react";
import Cloudy from "../../components/weatherAnimatedIcons/Cloudy";
import Sunny from "../../components/weatherAnimatedIcons/Sunny";
import Rainy from "../../components/weatherAnimatedIcons/Rainy";
import Stormy from "../../components/weatherAnimatedIcons/Stormy";
import SlideUpPanel from "../../components/SlideUpPanel/SlideUpPanel";
import { AppContext, AppContextInterface } from "../../stores/app-context";
import { WeatherType } from "../../endpoint-caller/interfaces/enums/WeatherType";
import { WindLevel } from "../../endpoint-caller/interfaces/enums/WindLevel";
import { TemperatureLevel } from "../../endpoint-caller/interfaces/enums/TemperatureLevel";
import { BookingWeatherOption } from "./Interface/BookingWeatherOptions";
import { chevronBackOutline } from "ionicons/icons";
import { Location } from "../../endpoint-caller/interfaces/locations/Location";
import { abbrState } from "./State";

class BookingPage extends Component<BookingPageProps, BookingPageState> {
  static contextType = AppContext;

  constructor(props: BookingPageProps) {
    super(props);

    if (!isBookingDetails(this.props.location.state)) {
      this.props.history.push("/");
      throw new Error("Invalid state object");
    }

    this.state = {
      bookingDetails: {
        ...this.props.location.state,
      },
      selectedWeatherOption: "Cloudy",
      selectedWindOption: "No Wind",
      selectedTemperatureOption: "Cool",
      showSuggestions: false,
      locationSuggestions: [],
      toast: {
        showToast: false,
        toastMessage: "",
      },
      showConfirmation: false, // Default of show confirmation should be set to false
    };

    // Bindings
    this.clickBooking = this.clickBooking.bind(this);
    this.toggleConfirmation = this.toggleConfirmation.bind(this);
    this.book = this.book.bind(this);
  }

  weatherOptions: BookingWeatherOption[] = [
    {
      name: "Cloudy",
      effectClassName: "cloud",
      backgroundClassName: "perfect",
      svg: Cloudy,
    },
    {
      name: "Sunny",
      effectClassName: "sun",
      backgroundClassName: "sunny",
      svg: Sunny,
    },
    {
      name: "Rainy",
      effectClassName: "rain",
      backgroundClassName: "rainy",
      svg: Rainy,
    },
    {
      name: "Stormy",
      effectClassName: "storm",
      backgroundClassName: "stormy",
      svg: Stormy,
    },
  ];
  temperatureOptions: TemperatureLevel[] = ["Cool", "Warm", "Hot"];
  windOptions: WindLevel[] = ["No Wind", "Calm", "Windy"];

  showToast(message: string): void {
    this.setState({
      ...this.state,
      toast: {
        showToast: true,
        toastMessage: message,
      },
    });
  }

  handleWeatherSelectionUpdate(weatherTypeSelected: WeatherType) {
    this.setState((prev) => {
      return {
        ...prev,
        selectedWeatherOption: weatherTypeSelected,
      };
    });
  }

  clickBooking(): void {
    this.toggleConfirmation();
  }


  book(): void {
    if (!this.state.bookingDetails && !isBookingDetails(this.state.bookingDetails)) {
      console.error("Invalid state object");
      this.props.history.push("/");
    }
    const appCtx = this.context as AppContextInterface;

    //Form Validation
    if (!this.state.selectedWeatherOption || !this.state.selectedWindOption || !this.state.selectedTemperatureOption) {
      this.showToast("Please select all options");
      return;
    }

    //let stateString: string = this.state.bookingDetails.state ?? 'Victoria'
    let stateString = abbrState(this.state.bookingDetails.state ?? 'Victoria', 'abbr')
    
    const location: Location = {
      suburb: this.state.bookingDetails.suburb ?? '',
      state: stateString ?? '',
      postcode: this.state.bookingDetails.postcode ?? '',
      country: this.state.bookingDetails.country ?? ''
    }

    BookingEndpoint.createBooking(
      appCtx.userId,
      location,
      this.state.bookingDetails.dateTime ?? "",
      this.state.bookingDetails.timePeriod ?? "",
      {
        weather: this.state.selectedWeatherOption,
        wind: this.state.selectedWindOption,
        temperature: this.state.selectedTemperatureOption,
      }
    );

    this.redirectToBookListPage();

    this.showToast("Booking has been successfully created");
  }

  redirectToBookListPage(): void {
    this.props.history.push("/viewBookingsPage");
  }

  toggleConfirmation(): void {
    this.setState({
      ...this.state,
      showConfirmation: !this.state.showConfirmation,
    });
  }

  render(): React.ReactNode {
    return (
      <IonPage keep-alive="false">
        <IonButton onClick={() => this.props.history.goBack()} className="booking-page-back-button invisible-button">
          <IonIcon icon={chevronBackOutline} slot="icon-only"></IonIcon>
        </IonButton>
        <IonToast
          isOpen={this.state.toast.showToast}
          onDidDismiss={() =>
            this.setState({
              toast: {
                toastMessage: "",
                showToast: false,
              },
            })
          }
          message={this.state.toast.toastMessage}
          duration={1000}
        />

        <Background showClouds={false}>
          {
            <SlideUpPanel showPanel={this.state.showConfirmation}>
              <ConfirmBookingDetails
                weatherBookingDetails={this.state}
                weatherOptions={this.weatherOptions}
                closeBookingDetail={this.toggleConfirmation}
                book={this.book}
              />
            </SlideUpPanel>
          }

          <div className="page-content">
            <div className="input-container">
              {/* Vertical Buttons */}
              <div className="button-container">
                {this.weatherOptions.map((weatherOption: BookingWeatherOption, i: number) => {
                  return (
                    <div
                      className={`weather-choose-container`}
                      key={`${i}`}
                      onClick={() => {
                        this.handleWeatherSelectionUpdate(weatherOption.name);
                      }}
                    >
                      <div
                        className={`hud-background weather-choose-option ${
                          this.weatherOptions[i].backgroundClassName
                        } ${
                          this.weatherOptions[i].name == this.state.selectedWeatherOption
                            ? "weather-choose-option-selected"
                            : "no-animation"
                        }`}
                      >
                        {React.createElement(weatherOption.svg, {
                          showAnimation: this.weatherOptions[i].name === this.state.selectedWeatherOption,
                          className: "weather-icon",
                        })}
                      </div>
                      <span
                        className={`${
                          this.weatherOptions[i].name == this.state.selectedWeatherOption
                            ? "weather-choose-text-selected"
                            : "weather-choose-text"
                        }`}
                      >
                        {weatherOption.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Sliders */}
              <div className="slider-container">
                <span className="weather-slider-text">Temperature</span>
                <IonRange
                  className="weather-slider"
                  ticks={true}
                  snaps={true}
                  min={0}
                  max={this.temperatureOptions.length - 1}
                  onIonChange={(e: any) => {
                    this.setState((prev) => {
                      return {
                        ...prev,
                        selectedTemperatureOption: this.temperatureOptions[e.detail.value],
                      };
                    });
                  }}
                ></IonRange>

                <span className="weather-slider-text">Wind</span>

                <IonRange
                  className="weather-slider"
                  ticks={true}
                  snaps={true}
                  min={0}
                  onIonChange={(e: any) => {
                    this.setState((prev) => {
                      return { ...prev, selectedWindOption: this.windOptions[e.detail.value] };
                    });
                  }}
                  max={this.windOptions.length - 1}
                />
              </div>
            </div>

            {/* Weatherhud */}
            <WeatherHud
              weatherData={this.state}
              weatherOptions={this.weatherOptions}
              windOptions={this.windOptions}
              temperatureOptions={this.temperatureOptions}
              isWindy={
                this.state.selectedWindOption !== "No Wind" // If wind is more than 1, it is windy
              }
            />

            {/* Book Button */}
            <div className="book-buttons-container">
              <div onTouchEnd={this.clickBooking} className="book-button">
                Book
              </div>
            </div>
          </div>
        </Background>
      </IonPage>
    );
  }
}

export default withRouter(BookingPage);
