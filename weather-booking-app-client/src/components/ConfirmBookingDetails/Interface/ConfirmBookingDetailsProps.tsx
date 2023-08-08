import { RouteComponentProps } from 'react-router-dom';

interface ConfirmBookingDetailsProps extends RouteComponentProps {
    [category: string]: any;
    closeBookingDetail: (booking: any) => void;
}

export default ConfirmBookingDetailsProps;
