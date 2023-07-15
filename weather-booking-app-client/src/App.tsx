import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { person, book, addCircleSharp } from 'ionicons/icons';
import BookingPage from './pages/BookingPage/BookingPage';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage';
import BookingDetails from './components/ViewBookingsComponents/BookingDetails';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './components/ScreenComponents/NavBar.css';
setupIonicReact();

const App: React.FC = () => {

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/tab1">
                            <BookingPage />
                        </Route>

                        <Route exact path="/tab2">
                            <Tab2 />
                        </Route>
                        <Route path="/tab3">
                            <Tab3 />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/tab1" />
                        </Route>
                        <Route exact path="/onboardingPage">
                            <OnboardingPage />
                        </Route>
                        <Route exact path="/statisticPage">
                            <StatisticsPage />
                        </Route>
                        <Route path="/booking-details" component={BookingDetails} />
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom" id='navbar'>
                        <IonTabButton tab="tab2" href="/tab2" className='nav-bar-button'>
                            <IonIcon aria-hidden="true" icon={book} className='nav-bar-icon' />
                        </IonTabButton>
                        <IonTabButton tab="tab1" href="/tab1" className='nav-bar-button'>
                            <IonIcon aria-hidden="true" icon={addCircleSharp} className='nav-bar-middle-icon' />
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3" className='nav-bar-button'>
                            <IonIcon aria-hidden="true" icon={person} className='nav-bar-icon' />
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
