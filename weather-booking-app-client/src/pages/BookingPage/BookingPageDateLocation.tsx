import { Component, createRef, RefObject } from "react";
import { format, parseISO } from "date-fns";
import { IonToast, IonPage, IonDatetime, IonIcon, IonButton, IonSegment, IonSegmentButton } from "@ionic/react";
import { withRouter } from "react-router-dom";
import {
  compassOutline,
  bagOutline,
  sunnyOutline,
  moonOutline,
  partlySunnyOutline,
  cloudyNightOutline,
  diceOutline,
} from "ionicons/icons";
import { BookingDetails } from "./Interface/BookingPageState";
import Background from "../../components/ScreenComponents/Background";
import BookingPageDateLocationProps from "./Interface/BookingPageDateLocationProps";
import BookingPageDateLocationState from "./Interface/BookingPageDateLocationState";
import DeviceManager from "../../device/DeviceManager";
import SlideUpPanel from "../../components/SlideUpPanel/SlideUpPanel";
//Location search functionality
import { Location } from "../../endpoint-caller/interfaces/locations/Location";
import LocationSearchEndpoint from "../../endpoint-caller/locationEndpoint";
import { debounce } from "../../utility/debounceDelay";

import "react-calendar/dist/Calendar.css";
import "./BookingPageDateLocation.css";
import "./BookingPage.css";

class BookingPageDateLocation extends Component<BookingPageDateLocationProps, BookingPageDateLocationState> {
  panelRef: RefObject<any>;
  calendarRef: RefObject<any>;
  deviceManager: DeviceManager | undefined;
  calendarOpen: boolean = false;
  sampleEvents = [
    "Beach Day",
    "Cozy night in",
    "Picnic",
    "Hike",
    "Camping Trip",
    "Skiing",
    "Surfing",
    "Fun Night Out",
    "Outdoor Celebration",
    "Graduation",
  ];

  constructor(props: BookingPageDateLocationProps) {
    super(props);

    this.state = {
      bookingPageInputIds: {
        name: "booking-page-name-input",
        dateTime: "booking-page-date-time-input",
        location: "booking-page-location-input",
        timePeriod: "booking-page-time-period-input",
      },
      bookingPageInputIconIds: {
        name: "booking-page-name-input-icon",
        dateTime: "booking-page-date-time-input-icon",
        location: "booking-page-location-input-icon",
        timePeriod: "booking-page-time-period-input-icon",
      },
      showCalendar: false,
      toast: {
        showToast: false,
        toastDuration: 1000,
        toastMessage: "",
      },
      bookingDetails: {
        location: null,
        suburb: null,
        state: null,
        postcode: null,
        country: null,
        dateTime: null,
        name: null,
        timePeriod: null,
      },
      locationSuggestions: [],
    };

    this.panelRef = createRef();
    this.calendarRef = createRef();
  }

  // componentDidUpdate(
  //   prevProps: Readonly<BookingPageDateLocationProps>,
  //   prevState: Readonly<BookingPageDateLocationState>,
  //   snapshot?: any
  // ): void {
  //   for (const key in prevState) {
  //     if ((prevState as any)[key] !== (this.state as any)[key]) {
  //       console.log("changed property:", key, "from", (prevState as any)[key], "to", (this.state as any)[key]);
  //     }
  //   }
  // }

  toggleShowCalendar(): void {
    this.setState({
      ...this.state,
      showCalendar: !this.state.showCalendar,
    });
  }

  monthToString(month: Number | any) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (month >= 1 && month <= 12) {
      return monthNames[month - 1];
    } else {
      return "Invalid month";
    }
  }

  generateRandomEvent() {
    const randomEvent = this.sampleEvents[Math.floor(Math.random() * this.sampleEvents.length)];
    this.updateBooking(randomEvent, "name");
  }

  hasValue(el: unknown): el is HTMLInputElement {
    return el instanceof HTMLInputElement && typeof el.value === "string";
  }

  validateInput(): Boolean {
    let inputIsValid = true;

    Object.entries(this.state.bookingDetails).forEach((item: [string, string | null]) => {
      const [key, value] = item;
      if (value === "" || value === null) {
        inputIsValid = false;
        this.changeInputBorderValidStyle(inputIsValid, key);
        var error = `The ${key} field is empty.`;
        this.showToast(error);
      }
    });

    return inputIsValid;
  }

  changeInputBorderValidStyle(isInputValid: boolean, inputFieldId: string): void {
    const inputElement = document.getElementById(
      this.state.bookingPageInputIds[inputFieldId as keyof typeof this.state.bookingPageInputIds]
    );
    const inputIconElement = document.getElementById(
      this.state.bookingPageInputIconIds[inputFieldId as keyof typeof this.state.bookingPageInputIds]
    );

    if (!isInputValid) {
      this.applyInvalidInputStyle(inputElement);
      this.applyInvalidInputStyle(inputIconElement, true);
    } else {
      this.resetInputStyle(inputElement);
      this.resetInputStyle(inputIconElement);
    }
  }

  applyInvalidInputStyle(element: HTMLElement | null, isIconElement?: boolean): void {
    if (element) {
      element.style.borderWidth = isIconElement ? "2px 0px 2px 2px" : "2px 2px 2px 0px";
      if (element.id === "booking-page-time-period-input" || element.id === "booking-page-date-time-input") {
        element.style.borderWidth = "2px 2px 2px 2px";
      }
      element.style.borderStyle = "solid";
      element.style.borderColor = "#DD0000";
    }
  }

  resetInputStyle(element: HTMLElement | null): void {
    if (element) {
      element.style.border = "None";
    }
  }

  showToast(message: string): void {
    this.setState({
      ...this.state,
      toast: {
        ...this.state.toast,
        showToast: true,
        toastMessage: message,
      },
    });
  }

  changeCalendarSelectedDate(type: "1day" | "2day" | "1week" | "1month" | "today"): void {
    var currentDate = new Date(); // convert to Date object

    if (type === "1day") {
      currentDate.setDate(currentDate.getDate() + 1); // add one day
    } else if (type === "2day") {
      currentDate.setDate(currentDate.getDate() + 2); // add two days
    } else if (type === "1week") {
      currentDate.setDate(currentDate.getDate() + 7); // add one week
    } else if (type === "1month") {
      currentDate.setDate(currentDate.getDate() + 30); // add one month
    }

    this.calendarRef.current.value = currentDate.toISOString(); // convert back to ISO string and set as value
  }

  updateBooking(
    payload: any,
    action: "name" | "location" | "dateTime" | "timePeriod" | "suburb" | "state" | "postcode" | "country"
  ) {
    //Check if autocomplete is running - update location.value to show on input form
    if (action == "suburb" || action == "state" || action == "country" || action == "postcode") {
      let suburb = "";
      let postcode = "";
      if (action == "suburb") {
        suburb = payload;
      } else {
        suburb = this.state.bookingDetails.suburb ?? "";
      }
      if (action == "postcode") {
        postcode = payload;
      } else {
        postcode = this.state.bookingDetails.postcode ?? "";
      }

      this.setState({
        ...this.state,
        bookingDetails: {
          ...this.state.bookingDetails,
          // location: `${suburb}, ${postcode}`,
          [action]: payload,
        },
      });
    } else if (action == "location") {
      //Reset location state.
      this.setState({
        ...this.state,
        bookingDetails: {
          ...this.state.bookingDetails,
          suburb: null,
          state: null,
          postcode: null,
          country: null,
          [action]: payload,
        },
      });
    } else {
      if (action == "dateTime") {
        payload = format(parseISO(payload), "yyyy-MM-dd");
      }

      this.setState({
        ...this.state,
        bookingDetails: {
          ...this.state.bookingDetails,
          [action]: payload,
        },
      });
    }
    this.changeInputBorderValidStyle(true, action);
  }

  resetInputFields(): BookingDetails {
    const bookingDetails = this.state.bookingDetails;

    Object.entries(this.state.bookingPageInputIds).forEach((item: [string, string | null]) => {
      const [key, value] = item;

      if (value) {
        const inputElement = document.getElementById(value);

        if (inputElement && this.hasValue(inputElement)) {
          this.setState({
            ...this.state,
            bookingDetails: {
              ...this.state.bookingDetails,
              dateTime: null,
              suburb: null,
              state: null,
              postcode: null,
              country: null,
              name: null,
            },
          });
        }
      }
    });

    return bookingDetails;
  }

  getLocationSuggestions = debounce(async (query: string) => {
    this.updateLocationSuggestions([]);
    if (query.length >= 4) {
      await LocationSearchEndpoint.searchLocations(encodeURIComponent(query.trim())).then((locationList) =>
        this.updateLocationSuggestions(locationList)
      );
    }
  }, 1000);

  handleLocationSearch(query: string) {
    this.updateBooking(query, "location");
    this.getLocationSuggestions(query);
  }

  updateLocationSuggestions(suggestions: Location[]) {
    this.setState({
      ...this.state,
      locationSuggestions: suggestions,
    });
  }

  handleSuggestionSelect(location: Location) {
    this.setState({
      ...this.state,
      bookingDetails: {
        ...this.state.bookingDetails,
        suburb: location.suburb,
        postcode: location.postcode,
        state: location.state,
        country: location.country,
        location: location.suburb + ", " + location.postcode + " " + location.state,
      },
    });
  }

  render(): React.ReactNode {
    return (
      <IonPage keep-alive="false">
        <IonToast
          isOpen={this.state.toast.showToast}
          onDidDismiss={() =>
            this.setState({
              toast: {
                ...this.state.toast,
                toastMessage: "",
                showToast: false,
              },
            })
          }
          message={this.state.toast.toastMessage}
          duration={1000}
        />

        <Background showClouds={false}>
          {/* <div className="booking-page-date-location-header">Book Unique Weather and Experiences</div> */}
          <h2 className="booking-page-date-location-title">Book Your Weather</h2>
          <div className="booking-page-date-location-container">
            <h3 className="step-heading">Step 1 - What, Where and When</h3>
            <div className="input-fields-container">
              <div className="button-with-icon">
                <div id="booking-page-name-input-icon" className="icon-with-outline">
                  <IonIcon className="button-icons" icon={bagOutline} />
                </div>
                <input
                  type="text"
                  onChange={(e) => {
                    this.updateBooking(e.target.value, "name");
                  }}
                  value={this.state.bookingDetails.name ?? ""}
                  id={this.state.bookingPageInputIds.name}
                  className="booking-page-input"
                  placeholder="Event"
                ></input>
                <IonButton onClick={() => this.generateRandomEvent()} className="dice-button invisible-button">
                  <IonIcon icon={diceOutline} slot="icon-only"></IonIcon>
                </IonButton>
              </div>

              <div className="button-with-icon" style={{ paddingBottom: "1rem" }}>
                <div id="booking-page-location-input-icon" className="icon-with-outline">
                  <IonIcon className="button-icons" icon={compassOutline} />
                </div>
                <form>
                  <input
                    type="text"
                    onChange={(e) => {
                      this.handleLocationSearch(e.target.value);
                    }}
                    value={this.state.bookingDetails.location ?? ""}
                    className="booking-page-input"
                    id="booking-page-location-input"
                    placeholder="Where"
                    autoComplete="off"
                  />
                  {this.state.locationSuggestions.length > 0 && (
                    <ul className="suggestion-list">
                      {this.state.locationSuggestions.map((location, index) => (
                        <li key={index} onTouchEnd={() => this.handleSuggestionSelect(location)}>
                          {location.suburb}, {location.postcode} {location.state}
                        </li>
                      ))}
                    </ul>
                  )}
                </form>
              </div>
              <div className="button-with-icon">
                <IonSegment
                  className="timeperiod-container"
                  onIonChange={(e) => {
                    this.updateBooking(e.target.value, "timePeriod");
                  }}
                  id={this.state.bookingPageInputIds.timePeriod}
                >
                  <IonSegmentButton data-testid="segment-button-morning" value="Morning" className="timeperiod-button">
                    <IonIcon className="time-period-icon" icon={partlySunnyOutline} />
                    <p>Morning</p>
                  </IonSegmentButton>
                  <IonSegmentButton data-testid="segment-button-afternoon" value="Afternoon" className="timeperiod-button">
                    <IonIcon className="time-period-icon" icon={sunnyOutline} />
                    <p>Afternoon</p>
                  </IonSegmentButton>
                  <IonSegmentButton data-testid="segment-button-evening" value="Evening" className="timeperiod-button">
                    <IonIcon className="time-period-icon" icon={cloudyNightOutline} />
                    <p>Evening</p>
                  </IonSegmentButton>
                  <IonSegmentButton data-testid="segment-button-night" value="Night" className="timeperiod-button">
                    <IonIcon className="time-period-icon" icon={moonOutline} />
                    <p>Night</p>
                  </IonSegmentButton>
                </IonSegment>
              </div>
              <div className="calendar-container">
                <IonDatetime
                  presentation="date"
                  ref={this.calendarRef}
                  min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()}
                  max={new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString()}
                  className="react-calendar"
                  onIonChange={(e) => {
                    if (typeof e.detail.value == "string") {
                      this.updateBooking(e.detail.value, "dateTime");
                    }
                  }}
                  id={this.state.bookingPageInputIds.dateTime}
                ></IonDatetime>
              </div>
              <div className="book-buttons-container">
                <div
                  className="book-button"
                  onClick={() => {
                    if (this.validateInput()) {
                      this.props.history.push({
                        pathname: "/bookingPage",
                        state: this.resetInputFields(),
                      });
                    }
                  }}
                  style={{
                    bottom: "10px",
                    position: "relative",
                  }}
                >
                  Next
                </div>
              </div>
            </div>
          </div>
        </Background>
      </IonPage>
    );
  }
}

export default withRouter(BookingPageDateLocation);
