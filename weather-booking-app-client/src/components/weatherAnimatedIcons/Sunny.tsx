import {
    IonContent,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonImg,
} from "@ionic/react";

import React from "react";
import Moon from "./weatherComponents/Moon";
import Sun from "./weatherComponents/Sun";
import Wind from "./weatherComponents/Wind";
import "./Cloudy.css"

import WeatherIconProps from './interface/WeatherIconProps';

const Sunny: React.FC<WeatherIconProps> = (props) => {
    return (
        <div className={props.className}>
            <svg
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 50 48"
                style={{
                    ...props.style,
                    enableBackground: "new 0 0 60.7 40"
                }}
                xmlSpace="preserve">
                {
                    props.isNight ? (
                        <Moon />
                    ) : (
                        <Sun />
                    )
                }

                {
                    props.isWindy && (
                        <Wind />
                    )
                }
            </svg>
        </div>
    );
}

export default Sunny;
