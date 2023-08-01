import { RouteComponentProps } from 'react-router-dom';

interface BookingPageProps extends RouteComponentProps {
    [category: string]: any;
}

export default BookingPageProps;
