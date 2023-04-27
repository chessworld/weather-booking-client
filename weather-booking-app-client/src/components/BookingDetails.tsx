import { useParams } from "react-router-dom";


const BookingDetails = (props: any) => {
    const { id } = useParams<{ id: string }>();
    //console.log(props)
    return (
        <div>
            <h1>Booking Details {id}</h1>
        </div>
    );
};

export default BookingDetails;