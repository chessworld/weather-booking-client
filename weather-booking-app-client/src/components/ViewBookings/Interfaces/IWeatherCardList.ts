type map = {
    id: number;
    location: string;
    datetime: Object;
    weather: string;
    map: (item: any) => any[];
};

interface IWeatherCardList {
    [category: string]: any;
    closeBookingDetail: (booking: any) => void;
    data: map;
}

export default IWeatherCardList;
