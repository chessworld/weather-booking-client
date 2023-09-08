import React from 'react';
import { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import IOnboardPageState from "./Interface/IOnboardingPageState";
import SyntheticEvent from "./Interface/SyntheticEvent";
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

import { AppContext, AppContextInterface } from "../../stores/app-context";

class OnboardingPage extends Component<RouteComponentProps, IOnboardPageState> {
    static contextType = AppContext;

    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            currentPageNumber: 0,
            currentPage: React.createRef(),
            hasMovedPagesThisTouch: false,
            slides: [
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
                            <div className="onboarding-page-button" onTouchEnd={
                                () => this.setUserCompletedTutorial()
                            }>
                                Book Now
                            </div>
                        </div >
                    </>
                )
            ]
        }

        this.handleScroll = this.handleScroll.bind(this);
        this.stopHandleScroll = this.stopHandleScroll.bind(this);
        this.startHandleScroll = this.startHandleScroll.bind(this);
    }

    setUserCompletedTutorial() {
        const { deviceManager } = this.context as AppContextInterface;
        if (deviceManager) {
          deviceManager.setUserCompletedTutorial();
        }

        this.props.history.push("/");
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
                currentPageNumber: (prev.currentPageNumber + 1) % this.state.slides.length,
                hasMovedPagesThisTouch: true,
                lastTouchMousePositionX: undefined
            }
        });
    }

    moveToPrevPage(): void {
        this.setState(prev => {
            return {
                ...prev,
                currentPageNumber: (prev.currentPageNumber - 1) % this.state.slides.length < 0
                    ? this.state.slides.length - 1
                    : (prev.currentPageNumber - 1) % this.state.slides.length,
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
                            this.state.slides.map((page, index) => {
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
                                this.state.slides.map((page, i) => {
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

export default withRouter(OnboardingPage);
