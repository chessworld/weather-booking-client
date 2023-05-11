import React from 'react';
import { Component } from 'react';
import Background from '../components/Screen/Background';
import { IonPage } from '@ionic/react';
import './OnboardingPage.css';

import Surfing from '../assets/Icons/surfing.png';
import FlyingKite from '../assets/Icons/flying-kite.png';
import EngagementRing from '../assets/Icons/engagement-rings.png';
import Picnic from '../assets/Icons/Picnic.png';

interface AbcState {
    date: string;
    location: string;
    weatherOptions: { name: string, image?: any }[];
    selectedWeatherOption: number
}

interface AbcProps {
    [category: string]: any;
}


class OnboardingPage extends Component<AbcProps, AbcState> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <IonPage>
                <Background>
                    <div className="onboarding-page-container">
                        <div className="onboarding-page-image-container">
                            <img src={EngagementRing} />
                            <img src={Picnic} />
                        </div>
                        <div className="onboarding-page-text">
                            Do you have a special occasion coming up?
                        </div>
                        <div className="onboarding-page-image-container">
                            <img src={Surfing} />
                            <img src={FlyingKite} />
                        </div>
                    </div>
                </Background>
            </IonPage>
        )
    }
}

export default OnboardingPage;
