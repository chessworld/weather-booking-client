import {IonList, IonCardHeader,IonItem, IonCardContent, IonCardTitle, IonCardSubtitle, IonCard} from '@ionic/react';
type map = {
    id: number,
    title: string,
    subtitle: string,
    content: string
}

function WeatherCardList(props: any) {
    return(
        <IonList>
        {props.data.map(({ id, title, subtitle, content}: map) => (
          <IonItem key={id}>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{title}</IonCardTitle>
                <IonCardSubtitle>{subtitle}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>{content}</IonCardContent>
            </IonCard>
          </IonItem>
        ))}
      </IonList>
    )
}

export default WeatherCardList;