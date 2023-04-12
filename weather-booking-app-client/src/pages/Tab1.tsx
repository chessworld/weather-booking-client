import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                Hello
            </IonHeader>
            <IonContent fullscreen>
                <div className="overall-container">
                    <div className="button-container">
                        <div className="button">Monday 10 July</div>
                        <div className="button">Monash University, 3800</div>
                    </div>

                    <div className="button-container">
                            <div className="weather-choose-container"></div>
                            <div className="weather-choose-container"></div>
                            <div className="weather-choose-container"></div>
                            <div className="weather-choose-container-focus"></div>
                            <div className="weather-choose-container"></div>
                            <div className="weather-choose-container"></div>
                    </div>

                        <div className="weather-rhombus-container">
                    <div className="weather-rhombus-container-bottom">
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
