import { Location } from "../endpoint-caller/interfaces/locations/Location";
import React, { useEffect, useState } from "react";
import DeviceManager from "../device/DeviceManager";
import BookingEndpoint from "../endpoint-caller/bookingEndpoint";

interface AppContextInterface {
  deviceId: string;
  setDeviceId: (deviceId: string) => void;
  locations: Location[];
}

export const AppContext = React.createContext<AppContextInterface>({
  deviceId: "",
  setDeviceId: (deviceId: string) => {},
  locations: [],
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [deviceId, setDeviceId] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);

  //   DeviceManager.getOrCreateDeviceId().then((deviceId) => {
  //     setDeviceId(deviceId);
  //   });

  useEffect(() => {
    setDeviceId("7b9d4e65-d545-46f2-9572-19dad9206422");

    BookingEndpoint.getLocation().then((response) => {
      setLocations(response);
    });
  }, []);

  return <AppContext.Provider value={{ deviceId, setDeviceId, locations }}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
