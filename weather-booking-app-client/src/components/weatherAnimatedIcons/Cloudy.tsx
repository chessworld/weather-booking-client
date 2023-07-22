import {
    IonContent,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonImg,
} from "@ionic/react";

import React from "react";
import "./Cloudy.css"

import WeatherIconProps from './interface/WeatherIconProps';

const Cloudy: React.FC<WeatherIconProps> = (props) => {
    return (
        <div className={props.className}>
            <svg
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 65 58"
                style={{
                    ...props.style,
                    enableBackground: "new 0 0 60.7 40"
                }}
                xmlSpace="preserve">

                <g id="Cloud_1">
                    <g id="White_cloud_1">
                        <path id="XMLID_2_" className="white" d="M47.2,40H7.9C3.5,40,0,36.5,0,32.1l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9v0 C55.1,36.5,51.6,40,47.2,40z" />
                        <circle id="XMLID_3_" className="white" cx="17.4" cy="22.8" r="9.3" />
                        <circle id="XMLID_4_" className="white" cx="34.5" cy="21.1" r="15.6" />
                        <animateTransform attributeName="transform"
                            attributeType="XML"
                            dur="6s"
                            keyTimes="0;0.5;1"
                            repeatCount="indefinite"
                            type="translate"
                            values="0;5;0"
                            calcMode="linear">
                        </animateTransform>
                    </g>
                    <g id="Gray_cloud_1">
                        <path id="XMLID_6_" className="gray" d="M54.7,22.3H33.4c-3.3,0-6-2.7-6-6v0c0-3.3,2.7-6,6-6h21.3c3.3,0,6,2.7,6,6v0 C60.7,19.6,58,22.3,54.7,22.3z" />
                        <circle id="XMLID_7_" className="gray" cx="45.7" cy="10.7" r="10.7" />
                        <animateTransform attributeName="transform"
                            attributeType="XML"
                            dur="6s"
                            keyTimes="0;0.5;1"
                            repeatCount="indefinite"
                            type="translate"
                            values="0;-3;0"
                            calcMode="linear">
                        </animateTransform>
                    </g>
                </g>

                {
                    props.isWindy && (
                        <g id="Wind">
                            <path id="XMLID_27_" className="st1" d="M1.3,33.1h19.3c2.1,0,3.8-1.3,3.8-3v0v0c0-1.7-1.7-3-3.8-3h-2.1"/>
                            <path id="XMLID_40_" className="st1" d="M2.4,42.4h18.2c2,0,3.6,0.9,3.6,2.1l0,0v0c0,1.2-1.6,2.1-3.6,2.1h-2"/>
                            <line id="XMLID_28_" className="st1" x1="5.3" y1="36.3" x2="25.5" y2="36.3"/>
                            <line id="XMLID_29_" className="st1" x1="0" y1="39.3" x2="27" y2="39.3"/>
                            <animateTransform attributeName="transform"
                            attributeType="XML"
                            dur="1.5s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            type="translate"
                            values="0;3"
                            calcMode="linear">
                            </animateTransform>
                            <animate attributeType="CSS"
                            attributeName="opacity"
                            attributeType="XML"
                            dur="1.5s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            values="0.3;0.9"
                            calcMode="linear"/>
                        </g>
                    )
                }

            </svg>
        </div>
    );
}

export default Cloudy;
