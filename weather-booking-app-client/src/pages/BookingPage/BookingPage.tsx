import "./BookingPage.css";
import Background from "../../components/ScreenComponents/Background";
import BookingEndpoint from "../../endpoint-caller/bookingEndpoint";
import BookingPageProps from "./Interface/BookingPageProps";
import { BookingDetails, BookingPageState, isBookingDetails } from "./Interface/BookingPageState";
import ConfirmBookingDetails from "../../components/ViewBookingsComponents/ConfirmBookingDetails";
import React from "react";
import { withRouter } from "react-router-dom";
import WeatherHud from "../../components/BookWeatherComponents/WeatherHud";
import { Component } from "react";
import { IonToast, IonRange, IonPage } from "@ionic/react";
import DeviceManager from "../../device/DeviceManager";
import UserEndpoint from "../../endpoint-caller/userEndpoint";
import Cloudy from "../../components/weatherAnimatedIcons/Cloudy";
import Sunny from "../../components/weatherAnimatedIcons/Sunny";
import Rainy from "../../components/weatherAnimatedIcons/Rainy";
import Stormy from "../../components/weatherAnimatedIcons/Stormy";

class BookingPage extends Component<BookingPageProps, BookingPageState> {
  bookingEndpoint: BookingEndpoint | undefined;

constructor(props: BookingPageProps) {
    super(props);

    if (!isBookingDetails(this.props.location.state)) {
        throw new Error('Invalid state object');
    } 

    this.state = {
      bookingDetails: {
        ...this.props.location.state,
        timePeriod: "",
      },
      weatherOptions: [
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
      ],
      temperatureOptions: [{ name: "Freezing" }, { name: "Cool" }, { name: "Mild" }, { name: "Warm" }, { name: "Hot" }],
      windOptions: [{ name: "No Wind" }, { name: "Calm" }, { name: "Windy" }, { name: "Gusty" }],
      selectedWeatherOption: 0,
      selectedWindOption: 0,
      selectedTemperatureOption: 0,
      showSuggestions: false,
      locationSuggestions: [],
      toast: {
        showToast: false,
        toastMessage: "",
      },
      showConfirmation: false, // Default of show confirmation should be set to false
    };

    // Bindings
    this.getWindJson = this.getWindJson.bind(this);
    this.clickBooking = this.clickBooking.bind(this);
    this.toggleConfirmation = this.toggleConfirmation.bind(this);
    this.book = this.book.bind(this);
    this.verifyDeviceId = this.verifyDeviceId.bind(this);
  }

  async componentDidMount(): Promise<any> {
    this.verifyDeviceId();
    this.bookingEndpoint = this.bookingEndpoint ?? (await BookingEndpoint.create());
    console.log(this.state);
  }

  verifyDeviceId() {
    /**
     * Not Sure which page this should be on. It is for verifying device id
     */

    DeviceManager.getOrCreateDeviceId().then((deviceId) => {
      UserEndpoint.getUser(deviceId)
        .then((user) => {
            // User Already exists
            this.showToast(`Welcome back ${user.id}!`);
            console.log(`Welcome back ${user.id}!`);
            if (!user.completed_tutorial) {
              // If user exists but hasn't completed tutorial
              this.props.history.push("/OnboardingPage");
            }
        })
        .catch((error) => {
          console.error(error);

    });
  }).catch((error) => {
      console.error(error);
        UserEndpoint.createUser("New User", false) //TODO: CHANGE THIS FROM HARDCODED
            .then((user) => {
                // If user doesn't exist
                DeviceManager.updateDeviceId(user.id);
                this.showToast(`Created user ${user.id}`);
                this.props.history.push("/OnboardingPage");
            })
            .catch((error) => {
                console.error(error);
            });
    });
  }

  showToast(message: string): void {
    this.setState({
      ...this.state,
      toast: {
        showToast: true,
        toastMessage: message,
      },
    });
  }

  getWindJson(): {
    [category: string]: string | number;
  } {
    const windJson = {
      option_type: "Wind",
      option_name: this.state.windOptions && this.state.windOptions[this.state.selectedWindOption].name,
      value_type: "Km/h"
    };

    return windJson;
  }

  getWeatherJson(): { [category: string]: string | number } {
    const weatherJson = {
      option_type: "Weather",
      option_name: this.state.weatherOptions && this.state.weatherOptions[this.state.selectedWeatherOption].name,
    };

    return weatherJson;
  }

  getTemperatureJson(): { [category: string]: string | number } {
    const temperatureJson = {
      option_type: "Temperature",
      option_name:
        this.state.temperatureOptions && this.state.temperatureOptions[this.state.selectedTemperatureOption].name,
      value_type: "Celsius"
    };

    return temperatureJson;
  }

  handleWeatherSelectionUpdate(weatherSelectionNumber: number) {
    this.setState((prev) => {
      return {
        ...prev,
        selectedWeatherOption: weatherSelectionNumber,
      };
    });
  }

  clickBooking(): void {
    this.toggleConfirmation();
  }

  book(): void {
    if (!this.state.bookingDetails && !isBookingDetails(this.state.bookingDetails)) {
      throw new Error('Invalid state object');
    }

    this.bookingEndpoint?.createBooking(
      this.bookingEndpoint?.getLocationSuburbs().findIndex((suburb: string) => {
          return suburb.toLowerCase() === this.state.bookingDetails.location && this.state.bookingDetails.location.toLowerCase();
      }) + 1,
      this.state.bookingDetails.dateTime ?? '',
      this.state.bookingDetails.timePeriod ?? "Morning",
      this.getWeatherJson(),
      this.getTemperatureJson(),
      this.getWindJson()
    );

    this.showToast("Booking has been successfully created");
  }

  toggleConfirmation(): void {
    this.setState({
      ...this.state,
      showConfirmation: !this.state.showConfirmation,
    });
  }

  render(): React.ReactNode {
    const svgWeatherIconComponent = this.state.weatherOptions[0].svg;

    return (
      <IonPage keep-alive="false">
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
          {this.state.showConfirmation && (
            <div
              style={{
                background: "#FFF",
                position: "fixed",
                width: "100%",
                height: "100%",
                zIndex: 3,
              }}
            >
              <ConfirmBookingDetails data={this.state} closeBookingDetail={this.toggleConfirmation} book={this.book} />
            </div>
          )}

          <div className="page-content">
            <div className="input-container">
              {/* Vertical Buttons */}
              <div className="button-container">
                {this.state.weatherOptions.map((option: any, i: number) => {
                  return (
                    <div
                      className="weather-choose-container"
                      key={`${i}`}
                      onClick={() => {
                        this.handleWeatherSelectionUpdate(i);
                      }}
                    >
                      <div
                    className={`hud-background weather-choose-option ${
                          this.state.weatherOptions[i].backgroundClassName
                        } ${
                          i == this.state.selectedWeatherOption ? "weather-choose-option-focus" : "no-animation"
                        }`}
                      >
                        <div className={`${this.state.weatherOptions[i].effectClassName}`}>
                          <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                        </div>
                        {
                          React.createElement(option.svg, {
                          showAnimation: this.state.selectedWeatherOption == i,
                          className: "weather-icon",
                            })
                        }
                      </div>
                      <span className="weather-choose-text">{option.name}</span>
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
                  max={this.state.temperatureOptions.length - 1}
                  onIonChange={(e: any) => {
                    this.setState((prev) => {
                      return {
                        ...prev,
                        selectedTemperatureOption: e.detail.value,
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
                      return { ...prev, selectedWindOption: e.detail.value };
                    });
                  }}
                  max={this.state.windOptions.length - 1}
                />
              </div>
            </div>

            {/* Weatherhud */}
            <WeatherHud
              weatherData={this.state}
              isWindy={
                this.state.selectedWindOption > 1 // If wind is more than 1, it is windy
              }
            />

            {/* Book Button */}
            <div
              style={{
                width: "95vw",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2vw",
              }}
            >
              <div
                className="book-button"
                onTouchEnd={() => {
                  this.props.history.goBack();
                }}
              >
                Back
              </div>

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
