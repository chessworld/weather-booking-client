import { IonList, IonCardHeader, IonItem, IonCardContent, IonCardTitle, IonCardSubtitle, IonCard, IonImg } from '@ionic/react';
import './WeatherCardList.css'
import sunImage from '../assets/Icons/Sun.png'

type map = {
    id: number,
    location: string,
    date: string,
    weather: string
}

interface IWeatherCardList {
    data: map[]
}

const WeatherCardList: React.FC<IWeatherCardList> = (props) => {
    return (
        <IonList>
            <div className="cardContainer">
                {props.data.map(({ id, location, date, weather }: map) => (
                    <IonItem key={id}>
                        <IonCard className='weatherBookingCard'>
                            <IonCardHeader>
                                <div className='imageContainer'>
                                    <IonImg src={sunImage}/>
                                </div>
                                <IonCardTitle>{location}</IonCardTitle>
                                <IonCardSubtitle>{date}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>{weather}</IonCardContent>
                        </IonCard>
                    </IonItem>
                ))}
            </div>
        </IonList>
    )
}

export default WeatherCardList;
