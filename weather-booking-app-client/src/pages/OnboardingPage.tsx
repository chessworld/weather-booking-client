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

/* const springs: any = useSpring({
*     from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
*     to: { opacity: 1, transform: 'translate3d(0%,0,0)' },
* }) */

class OnboardingPage extends Component<AbcProps, AbcState> {
    constructor(props) {
        super(props);

        //use usestring from react spring to animate the pages

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
        this.stopHandleScroll = this.stopHandleScroll.bind(this);
        this.startHandleScroll = this.startHandleScroll.bind(this);
    }

    startHandleScroll(e: any){
        this.setState({
            ...this.state,
            lastTouchMousePositionX: e.touches[0].clientX,
            hasMovedPagesThisTouch: false
        });

        window.addEventListener('touchmove', this.handleScroll);
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

    };

    stopHandleScroll() {
        window.removeEventListener('touchmove', this.handleScroll);
        this.setState({
            ...this.state,
            lastTouchMousePositionX: undefined,
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
        /* console.log(this.state.currentPage);
* console.log(this.state.lastTouchMousePositionX); */
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
                    <div className="carousel"> <div className="onboarding-page-container">
                        {
                            this.state.pages.map((page, index) => {
                                if (this.state.currentPage === index) {
                                    return (
                                        <div key={index} onTouchStart={this.startHandleScroll} onTouchEnd={this.stopHandleScroll} >
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
                    )
                </Background>
            </IonPage>
        )
    }
}

export default OnboardingPage;
