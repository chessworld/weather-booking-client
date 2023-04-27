import { Component } from 'react';
import { IonContent, IonRange, IonPage, IonTitle, IonToolbar, IonicSafeString } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './WeatherHud.css';

interface AbcState {
    [category: string]: any;
    date: string;
    location: string;
    weatherOptions: { name: string }[];
    selectedWeatherOption: number
}

interface AbcProps {
    [category: string]: any;
}

class WeatherHud extends Component<AbcProps, AbcState> {
    constructor(props) {
        super(props)
    }

    drawRhombus() {
        var c: any = document.getElementById("weather-hud");

        const styles = window.getComputedStyle(c);

        const width = parseInt(styles.getPropertyValue('width').replace(/[^\d]/g, ''));
        const height = parseInt(styles.getPropertyValue('height').replace(/[^\d]/g, ''));

        var ctx = c.getContext("2d");

        /* alert(width + " " + height); */

        var w = c.width;
        var h = c.height;

        var gradient = ctx.createLinearGradient(0, 0, 0, h);

        gradient.addColorStop(0, 'rgb(30,144,255)');
        gradient.addColorStop(1, 'rgba(2,0,36,1)');

        // draw the rhombus
        ctx.fillStyle = gradient;
        ctx.beginPath();

        const radius = 30;
        const slant = 0.87;

        ctx.moveTo(radius, 0);
        ctx.lineTo(w - radius, 0);
        ctx.arcTo(w, 0, w, radius, radius);

        ctx.lineTo(w, h * slant - radius);
        ctx.arcTo(w, h * slant, w - radius, h * slant, radius);

        ctx.lineTo(radius, h);
        ctx.arcTo(0, h, 0, h - radius, radius);
        ctx.arcTo(0, h, 0, h - radius, radius);

        ctx.lineTo(0, radius);
        ctx.arcTo(0, 0, radius, 0, radius);

        ctx.closePath();
        ctx.fill();
    }

    componentDidMount(): void {
        this.drawRhombus();
    }

    render() {
        return (
            <div className="button-container">
                <canvas id="weather-hud">
                    canvas not supported
                </canvas>
            </div>
        )
    }
}

export default WeatherHud;
