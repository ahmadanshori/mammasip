import React, {useEffect, useState, createContext} from 'react';
import {StatusBar} from 'react-native';
import OneSignal from 'react-native-onesignal';
import env from 'react-native-config';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoadingView} from './components/Loadings';
import AlertProvider from './components/AlertProvider';
import AppNavigator from './config/routes';
import {COLORS} from './constants';

export const AppContext = createContext();

export default () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [onesignalId, setOnesignalId] = useState(null);
  const [onboarding, setOnboarding] = useState(null);

  const OneSignalDevice = async () => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(env.ONESIGNALID);
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        notificationReceivedEvent.complete(notification);
      },
    );
    const onesignalUser = await OneSignal.getDeviceState();
    await AsyncStorage.setItem('onesignal', onesignalUser.userId);
    setOnesignalId(onesignalUser.userId);
  };
  useEffect(() => {
    SplashScreen.hide();
    if (!onesignalId) {
      OneSignalDevice();
    }
  }, []);
  return (
    <>
      <AlertProvider>
        <AppContext.Provider
          value={{
            setLoading,
            setToken,
            token,
            setUser,
            user,
            onesignalId,
            setOnesignalId,
            setOnboarding,
            onboarding,
          }}>
          <StatusBar
            backgroundColor={COLORS.primary}
            barStyle={'light-content'}
          />
          <AppNavigator />
          {loading ? <LoadingView /> : null}
        </AppContext.Provider>
      </AlertProvider>
    </>
  );
};
