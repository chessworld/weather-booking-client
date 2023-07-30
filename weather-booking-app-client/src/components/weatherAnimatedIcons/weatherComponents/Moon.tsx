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

const Moon: React.FC = () => {
    /*
       This will only work inside svg components!
       Since the Moon is a simple shape it is just a path
    */
    return (
        <path id="Moon" className="yellow" d="M15.3,21.4C15,12.1,21.1,4.2,29.7,1.7c-2.8-1.2-5.8-1.8-9.1-1.7C8.9,0.4-0.3,10.1,0,21.9 c0.3,11.7,10.1,20.9,21.9,20.6c3.2-0.1,6.3-0.9,8.9-2.3C22.2,38.3,15.6,30.7,15.3,21.4z" />
    );
}

export default Moon;
