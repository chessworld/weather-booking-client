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
            <IonContent className="ion-no-padding no-scroll">
                {
                    this.props.showClouds && (
                        <div className="background-clouds-in-the-sky">
                            <div className="background-cloud large background-cloud-1">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud normal background-cloud-2">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud small background-cloud-3">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud tiny background-cloud-4">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud large background-cloud-5">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud normal background-cloud-6">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud small background-cloud-7">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud tiny background-cloud-8">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud small background-cloud-9">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud normal background-cloud-10">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud tiny background-cloud-11">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud small background-cloud-12">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud normal background-cloud-13">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud small background-cloud-14">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud large background-cloud-15">
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="background-cloud large background-cloud-16">
                                <div></div><div></div><div></div><div></div>
                            </div>
                        </div>
                    )
                }
                {
                    this.props.children
                }
            </IonContent>
        );
    }
}

export default Background;
