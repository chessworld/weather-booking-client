import React from 'react';
import { Component, useRef } from 'react';
import Background from '../../components/ScreenComponents/Background';
import { IonPage } from '@ionic/react';
import './OnboardingPage.css';


import Surfing from '../../assets/Icons/surfing.png';
import FlyingKite from '../../assets/Icons/flying-kite.png';
import EngagementRing from '../../assets/Icons/engagement-rings.png';
import Picnic from '../../assets/Icons/Picnic.png';
import BookButton from '../../assets/Icons/onboarding-book-button.png';
import Cup from '../../assets/Icons/Cup.png';
import Weather from '../../assets/Icons/sun_cloud_rain.png';

interface EventTarget {
    style: {
        [category: string]: string;
    };
}

interface SyntheticEvent {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: EventTarget;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: Event;
    preventDefault(): void;
    stopPropagation(): void;
    target: EventTarget;
    timeStamp: Date;
    touches: any[];
    type: string;
}

interface AbcState {
    currentPageNumber: number,
    currentPage?: any,
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
    constructor(props: AbcProps) {
        super(props);

        //use usestring from react spring to animate the pages

        this.state = {
            currentPageNumber: 0,
            currentPage: React.createRef(),
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
                            <img onTouchEnd={() => alert("Take yo to booking page")} src={BookButton} />
                        </div>
                        <div className="onboarding-page-text">
                            The book it!
                        </div>
                    </>
                ),
                (
                    <>
                        <div className="onboarding-page-text">
                            Buy us a coffee if we fullfill your weather needs
                        </div>
                        <div className="onboarding-page-image-container">
                            <img onTouchEnd={() => alert("Take yo to coffee page")} src={Cup} />
                        </div>
                        <div className="onboarding-page-text">
                            https://ko-fi.com
                        </div>
                    </>
                ),
                (
                    <>
                        <div className="onboarding-page-image-container">
                            <img onTouchEnd={() => alert("Weather!")} src={Weather} />
                        </div>
                        <div className="onboarding-page-text">
                            <div className="onboarding-page-button">
                                Book Now
                            </div>
                        </div>
                    </>
                )
            ]
        }

        this.handleScroll = this.handleScroll.bind(this);
        this.stopHandleScroll = this.stopHandleScroll.bind(this);
        this.startHandleScroll = this.startHandleScroll.bind(this);
    }

    startHandleScroll(e: any) {
        this.setState({
            ...this.state,
            lastTouchMousePositionX: e.touches[0].clientX,
            hasMovedPagesThisTouch: false
        });

        this.state.currentPage && this.state.currentPage.current.addEventListener('touchmove', this.handleScroll);
    }

    handleScroll(e: SyntheticEvent): void {
        if (Object.keys(this.state).includes("lastTouchMousePositionX") && !this.state.hasMovedPagesThisTouch) {
            this.state.lastTouchMousePositionX
                && e.touches[0].clientX - this.state.lastTouchMousePositionX > 50
                && this.moveToPrevPage()

            this.state.lastTouchMousePositionX
                && e.touches[0].clientX - this.state.lastTouchMousePositionX < -50
                && this.moveToNextPage()

            const currentValue: number = parseInt(e.currentTarget.style.left ? e.currentTarget.style.left.replace(/^123/, '') : '0');
            e.currentTarget.style.left = this.state.lastTouchMousePositionX ? `${currentValue + (e.touches[0].clientX - this.state.lastTouchMousePositionX)}vw` : ``;
        }
    };

    setCurrentSlidePosition(): void {
    }

    stopHandleScroll(): void {
        // @ts-ignore
        window.removeEventListener('touchmove', this.handleScroll);
        this.setState({
            ...this.state,
            lastTouchMousePositionX: undefined,
        });

        const currentTarget = this.state.currentPage.current;
        currentTarget.style.left = 0;
    }

    moveToNextPage(): void {
        this.setState(prev => {
            return {
                ...prev,
                currentPageNumber: (prev.currentPageNumber + 1) % this.state.pages.length,
                hasMovedPagesThisTouch: true,
                lastTouchMousePositionX: undefined
            }
        });
    }

    componentDidUpdate(): void {
        /* console.log(this.state.currentPage);
* console.log(this.state.lastTouchMousePositionX); */
    }

    moveToPrevPage(): void {
        this.setState(prev => {
            return {
                ...prev,
                currentPageNumber: (prev.currentPageNumber - 1) % this.state.pages.length < 0
                    ? this.state.pages.length - 1
                    : (prev.currentPageNumber - 1) % this.state.pages.length,
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
                                if (this.state.currentPageNumber === index) {
                                    return (
                                        <div
                                            ref={this.state.currentPage}
                                            key={index}
                                            className="onboading-page-slide"
                                            onTouchStart={this.startHandleScroll}
                                            onTouchEnd={this.stopHandleScroll}
                                            style={{ left: 0, position: 'absolute' }}
                                        >
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
                                    i == this.state.currentPageNumber ?
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
