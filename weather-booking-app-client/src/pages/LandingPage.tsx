import { IonPage } from "@ionic/react";
import Background from "../components/ScreenComponents/Background";
import "./LanadingPage.css";
import Kofi from "../components/ShareComponents/Kofi";

const LandingPage: React.FC = () => {
  return (
    <IonPage>
      <Background showClouds={true}>
        <div className="landing-page-content">
          <div className="landing-page-app-icon-container">
            <img src="src/assets/mr_bluesky_logo_and_name.png" />
          </div>
          <div className="landing-page-buttons">
            <button className="landing-page-button">Book Now</button>
            <button className="landing-page-button">Check out our Stats</button>
            <Kofi color="#29abe0" id="D1D1PFTTH" label="Support Us on Ko-fi"></Kofi>
          </div>
        </div>
      </Background>
    </IonPage>
  );
};

export default LandingPage;
