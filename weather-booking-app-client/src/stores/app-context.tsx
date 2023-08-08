import { Location } from "../endpoint-caller/interfaces/locations/Location";
import React, { useEffect, useState } from "react";
import DeviceManager from "../device/DeviceManager";
import BookingEndpoint from "../endpoint-caller/bookingEndpoint";

export interface AppContextInterface {
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
  useEffect(() => {
    // setUserId("54533f44-680f-4187-87cd-84350f31d383");
    DeviceManager.getOrCreateDeviceId().then((deviceId) => {
      setUserId(deviceId);
    });

    BookingEndpoint.getLocations().then((response) => {
      setLocations(response);
    });
  }, []);

  return <AppContext.Provider value={{ userId, locations }}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
