import { Location } from "../endpoint-caller/interfaces/locations/Location";
import React, { useEffect, useState } from "react";
import DeviceManager from "../device/DeviceManager";
import BookingEndpoint from "../endpoint-caller/bookingEndpoint";
import UserEndpoint from "../endpoint-caller/userEndpoint";
export interface AppContextInterface {
  userId: string;
  completedTutorial: boolean;
  setCompletedTutorial: (completedTutorial: boolean) => void;
  locations: Location[];
}

export const AppContext = React.createContext<AppContextInterface>({
  userId: "",
  completedTutorial: true,
  setCompletedTutorial: () => {},
  locations: [],
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [userId, setUserId] = useState<string>("");
  const [completedTutorial, setCompletedTutorial] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    DeviceManager.getOrCreateDeviceId().then((deviceId) => {
      setUserId(deviceId);

      UserEndpoint.getUser(deviceId).then((user) => {
        user.completed_tutorial ? setCompletedTutorial(true) : setCompletedTutorial(false);
      });
    });

    BookingEndpoint.getLocations().then((response) => {
      setLocations(response);
    });
  }, []);

  return (
    <AppContext.Provider value={{ userId, completedTutorial, setCompletedTutorial, locations }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
