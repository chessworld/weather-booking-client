import React, { useEffect, useState } from "react";
import DeviceManager from "../device/DeviceManager";
import BookingEndpoint from "../endpoint-caller/bookingEndpoint";
import IAppContextProvider from "./Interface/IAppContextProvider";
import { useHistory } from "react-router-dom";

export interface AppContextInterface {
  userId: string;
  deviceManager: DeviceManager | null;
}

export const AppContext = React.createContext<AppContextInterface>({
  userId: "",
  deviceManager: await DeviceManager.getInstance(),
});

export const AppContextProvider: React.FC<IAppContextProvider> = (props) => {
  const [userId, setUserId] = useState<string>("");
  const [deviceManager, setDeviceManger] = useState<DeviceManager | null>(null);

  const history = useHistory(); // Use the useHistory hook to get the history object

  const checkCompletedTutorial = async (): Promise<void> => {
    if (deviceManager) {
      const completed = await deviceManager!.checkUserCompletedTutorial();

      console.warn(completed);
      if (!completed) {
        history.push("/onBoardingPage");
      }
    }
  };

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
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        setDeviceManger(await DeviceManager.getInstance());
        updateUserIdForAppContext();
        checkCompletedTutorial();
      } catch (error) {
        console.error("Error initializing AppContextProvider:", error);
      }
    };

    initialize();
  }, [deviceManager]);

  return <AppContext.Provider value={{ userId, deviceManager }}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
