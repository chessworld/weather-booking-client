import { useContext, useEffect, useRef, useState } from "react";
import "./BookingDetails.css";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonTitle,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
} from "@ionic/react";
import { chevronBackOutline, arrowForwardOutline, thumbsDownSharp, thumbsUpSharp } from "ionicons/icons";
import WeatherImageMapper from "../../utility/WeatherImageMapper";
import { BookingResponse } from "../../endpoint-caller/interfaces/bookings/BookingResponse";
import { AppContext } from "../../stores/app-context";
import formatDate from "../../utility/formatDate";
import BookingDetailsImage from "../ShareComponents/BookingDetailsImage";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { toBlob } from "html-to-image";
interface BookingDetailsProps {
  bookingDetails: BookingResponse;
  closeBookingDetails: (id: number) => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = (props) => {
  const appCtx = useContext(AppContext);

  // Completed Booking Details Logic
  const [thumbUp, setThumbUp] = useState<boolean | null>(null);
  const handleThumbUpClick = () => {
    setThumbUp(true);
  };
  const handleThumbDownClick = () => {
    setThumbUp(false);
  };

  //Share Modal Logic
  const shareModal = useRef<HTMLIonModalElement>(null);
  const shareMessage = "Check out my weather booking!";
  const shareImageRef = useRef<any>(null);

  let newFile: Blob | null = null;
  let shareUrl: string = "";
  useEffect(() => {
    console.log(shareImageRef);
    console.log(shareImageRef.current);
    if (shareImageRef.current) {
      toBlob(shareImageRef.current).then((blob) => {
        newFile = blob;
        shareUrl = URL.createObjectURL(newFile as Blob);
        console.log(shareUrl);
      });
    }
  }, [shareImageRef.current]);
  // const data = {
  //   files: [
  //     new File([newFile as any], "image.png", {
  //       type: newFile.type,
  //     }),
  //   ],
  //   title: "Image",
  //   text: "image",
  // };

  return (
    <div className="booking-details-container">
      <div className="booking-details-toolbar">
        <IonButton
          onClick={() => props.closeBookingDetails(0)}
          className="booking-details-back-button invisible-button"
        >
          <IonIcon icon={chevronBackOutline} slot="icon-only"></IonIcon>
        </IonButton>
      </div>

      <h1 className="booking-details-title">Booking Details</h1>
      <IonCard className="booking-details-card">
        <IonCardContent>
          <div className="booking-details-content">
            <div className="booking-details-details">
              <IonCardTitle className="booking-details-details__title">
                {appCtx.locations.length !== 0 && appCtx.locations[props.bookingDetails.location - 1].suburb}
              </IonCardTitle>
              <IonCardSubtitle className="booking-details-details__subtitle">
                {formatDate(props.bookingDetails.date)}
              </IonCardSubtitle>
              <IonCardSubtitle className="booking-details-details__subtitle">
                {props.bookingDetails.weather_option.weather}, {props.bookingDetails.weather_option.temperature},{" "}
                {props.bookingDetails.weather_option.wind}
              </IonCardSubtitle>
            </div>
            <div className="booking-details-img-container">
              <IonImg
                className="booking-details-img"
                src={WeatherImageMapper[props.bookingDetails.weather_option.weather]}
              />
            </div>
          </div>

          <IonCard className="enjoy-weather-card">Enjoy your weather!</IonCard>

          <IonCard className="share-card">
            <div className="share-card__title">Share your booking with friends</div>
            <IonButton className="share-button" id="open-share-modal">
              Share Now
              <IonIcon icon={arrowForwardOutline}></IonIcon>
            </IonButton>
          </IonCard>
        </IonCardContent>
      </IonCard>

      {props.bookingDetails.status === "Completed" && (
        <div>
          <h1 className="booking-details-title"> Feedback</h1>
          <IonCard className="booking-details-card">
            <IonCardContent>
              {props.bookingDetails.result === "Failed" && (
                <p className="apology-text">
                  Sorry we couldn't fulfill your request!
                  <br /> We will try to do better next time. Please give us your feedback.
                </p>
              )}
              <IonCard className="enjoy-weather-card feedback-card" id="feedback-card">
                <IonCardTitle className="feedback-title">Did you enjoy your weather?</IonCardTitle>
                <div className="thumb-group">
                  <IonButton className="thumb-button invisible-button" onClick={() => handleThumbUpClick()}>
                    <IonIcon icon={thumbsUpSharp} className={`${thumbUp ? "thumb-selected" : ""}`}></IonIcon>
                  </IonButton>
                  <IonButton className="thumb-button invisible-button" onClick={() => handleThumbDownClick()}>
                    <IonIcon
                      icon={thumbsDownSharp}
                      className={`${thumbUp === false ? "thumb-selected" : ""}`}
                    ></IonIcon>
                  </IonButton>
                </div>
              </IonCard>

              <IonCard className="coffee-card">
                <div className="share-card__title">Buy us a coffee</div>
                <IonButton className="share-button" href="https://ko-fi.com/">
                  Donate
                  <IonIcon icon={arrowForwardOutline}></IonIcon>
                </IonButton>
              </IonCard>
            </IonCardContent>
          </IonCard>
        </div>
      )}
      <IonModal ref={shareModal} trigger="open-share-modal" initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.75]}>
        <IonCardContent className="share-modal-content">
          <div ref={shareImageRef}>
            <BookingDetailsImage {...props.bookingDetails} />
          </div>
          <IonButton onClick={() => shareModal.current?.dismiss()} className="download-button">
            Download as PNG
          </IonButton>
          <h2 style={{ fontWeight: "bold" }}>Share</h2>
          <div>
            <WhatsappShareButton url={shareUrl} title={shareMessage}>
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <FacebookShareButton url={shareUrl} title={shareMessage}>
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={shareMessage}>
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
            <RedditShareButton url={shareUrl} title={shareMessage}>
              <RedditIcon size={40} round={true} />
            </RedditShareButton>
            <EmailShareButton url={shareUrl} title={shareMessage}>
              <EmailIcon size={40} round={true} />
            </EmailShareButton>
          </div>
        </IonCardContent>
      </IonModal>
    </div>
  );
};

export default BookingDetails;
