import {
    IonContent,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonImg,
} from "@ionic/react";

import React from "react";
import "../Cloudy.css"

const Wind: React.FC = () => {
    /*
       This will only work inside svg components!
    */
    return (
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
            dur="1.5s"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="0.3;0.9"
            calcMode="linear"/>
        </g>
    );
}

export default Wind;
