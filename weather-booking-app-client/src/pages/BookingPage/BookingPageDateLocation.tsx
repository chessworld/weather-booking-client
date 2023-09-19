import { Component, createRef, RefObject } from "react";
import { format, parseISO } from "date-fns";
import { IonSelectOption, IonText, IonToast, IonSelect, IonPage, IonDatetime, IonIcon } from "@ionic/react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { calendarOutline, compassOutline, timeOutline, bagOutline } from "ionicons/icons";
import { BookingDetails } from "./Interface/BookingPageState";
import Background from "../../components/ScreenComponents/Background";
import BookingPageDateLocationProps from "./Interface/BookingPageDateLocationProps";
import BookingPageDateLocationState from "./Interface/BookingPageDateLocationState";
import DeviceManager from "../../device/DeviceManager";
import SlideUpPanel from "../../components/SlideUpPanel/SlideUpPanel";

//Location search functionality
import { Location } from "../../endpoint-caller/interfaces/locations/Location"
import LocationSearchEndpoint from "../../endpoint-caller/locationEndpoint";
import { debounce } from "../../utility/debounceDelay";

import "react-calendar/dist/Calendar.css";
import "./BookingPageDateLocation.css";
import "./BookingPage.css";
import { api_key } from "./config/config";
import { act } from "react-dom/test-utils";

class BookingPageDateLocation extends Component<BookingPageDateLocationProps, BookingPageDateLocationState> {
  panelRef: RefObject<any>;
  calendarRef: RefObject<any>;
  deviceManager: DeviceManager | undefined;
  calendarOpen: boolean = false;

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

  componentDidUpdate(prevProps: Readonly<BookingPageDateLocationProps>, prevState: Readonly<BookingPageDateLocationState>, snapshot?: any): void {
      for (const key in prevState) {
          if ((prevState as any)[key] !== (this.state as any)[key]) {
              console.log('changed property:', key, 'from', (prevState as any)[key], 'to', (this.state as any)[key]);
          }
      }
  }

  async componentDidMount() {
    /* this.deviceManager = await DeviceManager.getInstance(); */
    /* this.deviceManager.checkUserCompletedTutorial().then((completed) => {
     *     if (!completed) {
     *         this.props.history.push('/onBoardingPage');
     *     }
     * }); */
  }

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
      await LocationSearchEndpoint.searchLocations(query).then((locationList) => this.updateLocationSuggestions(locationList));
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
    console.log(location)
    this.setState({
      ...this.state,
      bookingDetails: {
        ...this.state.bookingDetails,
        suburb: location.suburb,
        postcode: location.postcode,
        state: location.state,
        country: location.country,
        location: location.suburb + ', ' + location.postcode + ' ' + location.state,
      }
    })
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

        <Background showClouds={true}>
          <div className="booking-page-date-location-header">Book Unique Weather and Experiences</div>
          <div className="booking-page-date-location-container">
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
                />
              </div>

              <div className="button-with-icon">
                <div id="booking-page-location-input-icon" className="icon-with-outline">
                  <IonIcon className="button-icons" icon={compassOutline} />
                </div>
                <form>
                  <input
                    type="text"
                    onChange={(e) => {
                      this.handleLocationSearch(e.target.value)
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
                        <li
                          key={index}
                          onTouchEnd={() => this.handleSuggestionSelect(location)}
                          >
                          {location.suburb}, {location.postcode} {location.state}
                        </li>
                      ))}
                    </ul>
                  )}
                </form>
              </div>
              <div className="calendar-container">
                <div className="button-with-icon">
                  <div id="booking-page-date-time-input-icon" className="icon-with-outline">
                    <IonIcon className="button-icons" icon={calendarOutline} />
                  </div>
                  <input
                    onTouchEnd={() => this.toggleShowCalendar()}
                    id="booking-page-date-time-input"
                    value={this.state.bookingDetails.dateTime ?? ""}
                    type="text"
                    className="booking-page-input"
                    placeholder="When"
                    readOnly
                  />
                </div>
              </div>
              <div className="button-with-icon">
                <div id="booking-page-time-period-input-icon" className="icon-with-outline">
                  <IonIcon className="button-icons" icon={timeOutline} />
                </div>
                <IonSelect
                  id="booking-page-time-period-input"
                  placeholder="Time Period"
                  onIonChange={(e) => this.updateBooking(e.target.value, "timePeriod")}
                  interfaceOptions={{ csdsad: "time-period-select" }}
                >
                  <div slot="label">
                    Favorite Fruit <IonText color="danger">(Required)</IonText>
                  </div>
                  <IonSelectOption value="Morning">Morning</IonSelectOption>
                  <IonSelectOption value="Afternoon">Afternoon</IonSelectOption>
                  <IonSelectOption value="Evening">Evening</IonSelectOption>
                  <IonSelectOption value="Night">Night</IonSelectOption>
                </IonSelect>
              </div>
              <div className="book-buttons-container">
                <div
                  className="book-button"
                  onTouchEnd={() => {
                    if (this.validateInput()) {
                      this.props.history.push({
                        pathname: "/bookingPage",
                        state: this.resetInputFields(),
                      });
                    }
                  }}
                >
                  Next
                </div>
              </div>
            </div>
            {
              <SlideUpPanel showPanel={this.state.showCalendar}>
                <div className="calender-container">
                  <div
                    style={{
                      textAlign: "left",
                      fontSize: "1.5rem",
                      marginLeft: "10vw",
                      width: "100vw",
                    }}
                  >
                    Select Date
                  </div>

                  <div className="calendar-only-container">
                    <IonDatetime
                      presentation="date"
                      ref={this.calendarRef}
                      className="react-calendar"
                      onIonChange={(e) => {
                        if (typeof e.detail.value == "string") {
                          this.updateBooking(e.detail.value, "dateTime");
                        }
                      }}
                    ></IonDatetime>
                  </div>
                  <div
                    className="book-button"
                    style={{ marginTop: "10px" }}
                    onTouchEnd={() => this.toggleShowCalendar()}
                  >
                    Select Date
                  </div>
                </div>
              </SlideUpPanel>
            }
          </div>
        </Background>
      </IonPage>
    );
  }
}

export default withRouter(BookingPageDateLocation);
