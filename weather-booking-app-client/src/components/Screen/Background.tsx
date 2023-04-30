import React from 'react';
import { IonContent } from '@ionic/react';
import './Background.css'

interface AbcProps {
    [category: string]: any;
}

class Background extends React.Component<AbcProps, {}> {
    constructor(props: AbcProps) {
        super(props);
    }

    render() {
        return (
            <IonContent className="ion-no-padding">
                {
                    this.props.children
                }
            </IonContent>
        );
    }
}

export default Background;
