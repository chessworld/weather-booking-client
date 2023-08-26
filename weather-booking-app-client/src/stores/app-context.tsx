import { Location } from "../endpoint-caller/interfaces/locations/Location";
import React, { useEffect, useState } from "react";
import DeviceManager from "../device/DeviceManager";
import BookingEndpoint from "../endpoint-caller/bookingEndpoint";
import IAppContextProvider from "./Interface/IAppContextProvider";
import { useHistory } from 'react-router-dom';

export interface AppContextInterface {
  userId: string;
  locations: Location[];
  deviceManager: DeviceManager | null,
}

export const AppContext = React.createContext<AppContextInterface>({
  userId: "",
  deviceManager: await DeviceManager.getInstance(),
  locations: [],
});

export const AppContextProvider: React.FC<IAppContextProvider> = (props) => {
  const [userId, setUserId] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [deviceManager, setDeviceManger] = useState<DeviceManager | null>(null);

  const history = useHistory(); // Use the useHistory hook to get the history object

  const checkCompletedTutorial = async (): Promise<void> => {
    let completed;

    if (deviceManager) {
      const completed = await deviceManager!.checkUserCompletedTutorial();

      console.warn(completed);
      if (!completed) {
          history.push('/onBoardingPage');
      }
    }
  }

  const updateUserIdForAppContext = async (): Promise<void> => {
      let userId;
      if (deviceManager) {
        userId = await deviceManager.getDeviceId();

        if (userId) {
            setUserId(userId);
        } else {
            throw new Error("No device id found");
        }
      }
  }

  const getLocationsForWeatherFromServer = async (): Promise<void> => {
    const response = await BookingEndpoint.getLocations();
    setLocations(response);
  };
  
  useEffect(() => {
    const initialize = async () => {
      try {
        setDeviceManger(await DeviceManager.getInstance());
        updateUserIdForAppContext();
        checkCompletedTutorial();
        getLocationsForWeatherFromServer();

      } catch (error) {
        console.error("Error initializing AppContextProvider:", error);
      }
    };

    initialize();
  }, [deviceManager]);

  return <AppContext.Provider value={{ userId, locations, deviceManager }}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
