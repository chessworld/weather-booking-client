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

const Rainy: React.FC = () => {
    return (
        <div className="element">
            <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 55.1 60"
                style={{
                    "enableBackground": "new 0 0 55.1 49.5"
                }}
                xmlSpace="preserve"
            >
                <g id="Cloud_2">
                    <g id="Rain_2">
                        <path id="rain_2_left" className="white" d="M20.7,46.4c0,1.7-1.4,3.1-3.1,3.1s-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S20.7,44.7,20.7,46.4z"></path>
                        <path id="rain_2_mid" className="white" d="M31.4,46.4c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S31.4,44.7,31.4,46.4z"></path>
                        <path id="rain_2_right" className="white" d="M41.3,46.4c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S41.3,44.7,41.3,46.4z"></path>
                        <animateTransform attributeName="transform"
                            attributeType="XML"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            type="translate"
                            values="0 0;0 10"
                            calcMode="linear">
                        </animateTransform>
                        <animate attributeType="CSS"
                            attributeName="opacity"
                            attributeType="XML"
                            dur="1s"
                            keyTimes="0;1"
                            repeatCount="indefinite"
                            values="1;0"
                            calcMode="linear" />
                    </g>
                    <g id="White_cloud_2">
                        <path id="XMLID_14_" className="white" d="M47.2,34.5H7.9c-4.3,0-7.9-3.5-7.9-7.9l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9 v0C55.1,30.9,51.6,34.5,47.2,34.5z" />
                        <circle id="XMLID_13_" className="white" cx="17.4" cy="17.3" r="9.3" />
                        <circle id="XMLID_10_" className="white" cx="34.5" cy="15.6" r="15.6" />
                    </g>
                </g>
            </svg>
        </div>
    );
}

export default Rainy;
