import { Location } from "../endpoint-caller/interfaces/locations/Location";
import React, { useEffect, useState } from "react";
import DeviceManager from "../device/DeviceManager";
import BookingEndpoint from "../endpoint-caller/bookingEndpoint";

interface AppContextInterface {
  userId: string;
  locations: Location[];
}

export const AppContext = React.createContext<AppContextInterface>({
  userId: "",
  locations: [],
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [userId, setUserId] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);

  //   DeviceManager.getOrCreateDeviceId().then((deviceId) => {
  //     setUserId(deviceId);
  //   });

  useEffect(() => {
    setUserId("7b9d4e65-d545-46f2-9572-19dad9206422");

    BookingEndpoint.getLocation().then((response) => {
      setLocations(response);
    });
  }, []);

  return <AppContext.Provider value={{ userId, locations }}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
