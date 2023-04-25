import { IonList, IonCardHeader, IonItem, IonCardContent, IonCardTitle, IonCardSubtitle, IonCard, IonImg } from '@ionic/react';
import './WeatherCardList.css'
import sunImage from '../assets/Icons/Sun.png'

type map = {
    id: number,
    title: string,
    subtitle: string,
    content: string
}

interface IWeatherCardList {
    data: map[]
}

const WeatherCardList: React.FC<IWeatherCardList> = (props) => {
    return (
        <IonList>
            <div className="cardContainer" style={{}}>
                {props.data.map(({ id, title, subtitle, content }: map) => (
                    <IonItem key={id}>
                        <IonCard style={{width: '80vw', padding: '10px'}}>
                            <IonCardHeader>
                                <div className='imageContainer'>
                                    <IonImg src={sunImage}/>
                                </div>
                                <IonCardTitle>{title}</IonCardTitle>
                                <IonCardSubtitle>{subtitle}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>{content}</IonCardContent>
                        </IonCard>
                    </IonItem>
                ))}
            </div>
        </IonList>
    )
}

export default WeatherCardList;
