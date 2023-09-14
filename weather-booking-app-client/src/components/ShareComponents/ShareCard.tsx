import { IonCard, IonButton, IonIcon, IonCardContent, IonModal } from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import React, { useRef } from "react";
import "./ShareCard.css";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import BookingDetailsImage from "./BookingDetailsImage";
import { BookingResponse } from "../../endpoint-caller/interfaces/bookings/BookingResponse";
import { WeatherOption } from "../../endpoint-caller/interfaces/bookings/WeatherOption";
import { Location } from "../../endpoint-caller/interfaces/locations/Location";

interface ShareCardProps {
  location: Location;
  date: string;
  weather_option: WeatherOption;
}

const ShareCard: React.FC<ShareCardProps> = (props) => {
  const shareModal = useRef<HTMLIonModalElement>(null);
  const shareMessage = "Check out my weather booking!";
  const shareImageRef = useRef<any>(null);

  let newFile: Blob | null = null;
  let shareUrl: string = "google.com";
  // useEffect(() => {
  //   console.log(shareImageRef);
  //   console.log(shareImageRef.current);
  //   if (shareImageRef.current) {
  //     toBlob(shareImageRef.current).then((blob) => {
  //       newFile = blob;
  //       shareUrl = URL.createObjectURL(newFile as Blob);
  //       console.log(shareUrl);
  //     });
  //   }
  // }, [shareImageRef.current]);
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
    <div>
      <IonCard className="share-card">
        <div className="share-card__title">Share your booking with friends</div>
        <IonButton className="share-button" id="open-share-modal">
          Share Now
          <IonIcon icon={arrowForwardOutline}></IonIcon>
        </IonButton>
      </IonCard>
      <IonModal ref={shareModal} trigger="open-share-modal" initialBreakpoint={0.6} breakpoints={[0, 0.25, 0.5, 0.75]}>
        <IonCardContent className="share-modal-content">
          <div ref={shareImageRef}>
            <BookingDetailsImage {...props} />
          </div>
          <IonButton onClick={() => shareModal.current?.dismiss()} className="download-button">
            Download as PNG
          </IonButton>
          <h2 style={{ fontWeight: "bold" }}>Share</h2>
          <div>
            <WhatsappShareButton url={shareUrl} title={shareMessage}>
              <WhatsappIcon size={48} round={true} />
            </WhatsappShareButton>
            <FacebookShareButton url={shareUrl} quote={shareMessage}>
              <FacebookIcon size={48} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={shareMessage}>
              <TwitterIcon size={48} round={true} />
            </TwitterShareButton>
            <RedditShareButton url={shareUrl} title={shareMessage}>
              <RedditIcon size={48} round={true} />
            </RedditShareButton>
            <EmailShareButton url={shareUrl} title={shareMessage}>
              <EmailIcon size={48} round={true} />
            </EmailShareButton>
          </div>
        </IonCardContent>
      </IonModal>
    </div>
  );
};

export default ShareCard;
