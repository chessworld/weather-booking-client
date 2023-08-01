export interface BookingDetails {
  id: string;
  user: string;
  location: number;
  day_time: {
    date: string;
    time_period: string;
    start_time: string;
    end_time: string;
  };
  status: "Upcoming" | "Completed";
  result: "Pending" | "Successful" | "Failed";
}
