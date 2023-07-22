import {
    IonContent,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonImg,
} from "@ionic/react";

import React from "react";
import Cloudy from "../components/weatherAnimatedIcons/Cloudy"
import Rainy from "../components/weatherAnimatedIcons/Rainy"
import Stormy from "../components/weatherAnimatedIcons/Stormy"
import Sunny from "../components/weatherAnimatedIcons/Sunny"

import "./TestHarness.css";

const TestHarness: React.FC = () => {
    return (
        <>
            <Cloudy className="test-icon" isWindy = { true } />
            <Rainy className="test-icon" isWindy = { true } />
            <Stormy className="test-icon" />
            <Sunny className="test-icon" isNight={ false } />
        </>
    );
}

export default TestHarness;
