import React from 'react';
import { Component } from 'react';
import Background from '../components/Screen/Background';
import { IonPage } from '@ionic/react';
import './OnboardingPage.css';

import Surfing from '../assets/Icons/surfing.png';
import FlyingKite from '../assets/Icons/flying-kite.png';
import EngagementRing from '../assets/Icons/engagement-rings.png';
import Picnic from '../assets/Icons/Picnic.png';
import BookButton from '../assets/Icons/onboarding-book-button.png/';

interface AbcState {
    currentPage: number,
    pages: React.ReactElement[],
    lastTouchMousePositionX?: number,
    hasMovedPagesThisTouch: boolean
}

interface AbcProps {
    [category: string]: any;
}


class OnboardingPage extends Component<AbcProps, AbcState> {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            hasMovedPagesThisTouch: false,
            pages: [
                (
                    <>
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
                    </>
                ), (
                    <>
                    <div className="onboarding-page-text">
                        Need a certain weather...?
                    </div>
                    <div className="onboarding-page-image-container">
                        <img src={BookButton} />
                    </div>
                    <div className="onboarding-page-text">
                        The book it!
                </div>
                    </>
                )
            ]
        }

        this.handleScroll = this.handleScroll.bind(this);
        this.resetScroll = this.resetScroll.bind(this);
    }

    handleScroll(e: any) {
        if (Object.keys(this.state).includes("lastTouchMousePositionX") && !this.state.hasMovedPagesThisTouch) {
            this.state.lastTouchMousePositionX
                && e.touches[0].clientX - this.state.lastTouchMousePositionX > 20
                && this.moveToNextPage()

            this.state.lastTouchMousePositionX
                && e.touches[0].clientX - this.state.lastTouchMousePositionX < -20
                && this.moveToPrevPage()
        }

        this.setState({
            lastTouchMousePositionX: e.touches[0].clientX
        });

    };

    resetScroll() {
        this.setState({
            lastTouchMousePositionX: undefined,
            hasMovedPagesThisTouch: false
        });
    }

    moveToNextPage() {
        this.setState(prev => {
            return {
                ...prev,
                currentPage: (prev.currentPage + 1) % this.state.pages.length,
                hasMovedPagesThisTouch: true,
                lastTouchMousePositionX: undefined
            }
        });
    }

    componentDidUpdate() {
        console.log(this.state.currentPage);
        console.log(this.state.lastTouchMousePositionX);
    }

    moveToPrevPage() {
        this.setState(prev => {
            return {
                ...prev,
                currentPage: Math.abs((prev.currentPage - 1) % this.state.pages.length),
                hasMovedPagesThisTouch: true,
                lastTouchMousePositionX: undefined
            }
        });
    }

    render(): React.ReactNode {
        return (
            <IonPage>
                <Background>
                    <div className="carousel" draggable={true} onTouchMove={this.handleScroll} onTouchStart={this.resetScroll}>

                        <div className="onboarding-page-container">
                            {
                                this.state.pages.map((page, index) => {
                                    if (this.state.currentPage === index) {
                                        return (
                                            <div key={index}>
                                                {page}
                                            </div>
                                        )
                                    }
                                })
                            }

                        </div>
                        {/* Page indicators */}
                        <div className="page-indicator-container">
                            {
                                this.state.pages.map((page, i) => {
                                    i == this.state.currentPage ?
                                        page = (<div key={i} className="page-indiator page-indicator-active"></div>)
                                        :
                                        page = (<div key={i} className="page-indiator"></div>)
                                    return page
                                })
                            }
                        </div>
                    </div>
                </Background>
            </IonPage>
        )
    }
}

export default OnboardingPage;
