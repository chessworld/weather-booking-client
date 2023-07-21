import {
    IonContent,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonImg,
} from "@ionic/react";

import React from "react";
import { useState, useEffect } from "react";
import Cloudy from "../components/weatherAnimatedIcons/Cloudy"
import Rainy from "../components/weatherAnimatedIcons/Rainy"
import Stormy from "../components/weatherAnimatedIcons/Stormy"

const TestHarness: React.FC = () => {
    return (
        <>
            <Cloudy />
            <Rainy />
            <Stormy />
        </>
    );
}

export default TestHarness;
