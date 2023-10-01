import { IonPage } from "@ionic/react";
import Background from "../components/ScreenComponents/Background";
import "./LanadingPage.css";
import Kofi from "../components/ShareComponents/Kofi";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <IonPage>
      <Background showClouds={true}>
        <div className="landing-page-content landing-page-filter">
          <div className="landing-page-app-icon-container">
            <img src="src/assets/mr_bluesky_logo_and_name_2.png" />
          </div>
          <div className="landing-page-buttons">
            <Link to="/bookingPageDateLocation">
              <button className="landing-page-button">Make a Booking!</button>
            </Link>
            <Link to="/statisticPage">
              <button className="landing-page-button--inverse">Check out our Stats</button>
            </Link>
            <p className="or-text">OR</p>
            <div>
              <Kofi color="#29abe0" id="D1D1PFTTH" label="Support Us on Ko-fi"></Kofi>
            </div>
          </div>
        </div>
      </Background>
    </IonPage>
  );
};

export default LandingPage;
