import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import WeatherCardList from '../components/WeatherCardList';
import './Tab2.css';

const Tab2: React.FC = () => {
  const dummyData = [
    { id: 1, title: 'Card 1', subtitle: 'Subtitle 1', content: 'Content 1' },
    { id: 2, title: 'Card 2', subtitle: 'Subtitle 2', content: 'Content 2' },
    { id: 3, title: 'Card 3', subtitle: 'Subtitle 3', content: 'Content 3' },
  ];
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <WeatherCardList data={dummyData} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
