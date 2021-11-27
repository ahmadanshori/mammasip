import React, {useEffect, useState, createContext} from 'react';
import {StatusBar} from 'react-native';
// import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';
import {LoadingView} from './components/Loadings';
import AlertProvider from './components/AlertProvider';
import AppNavigator from './config/routes';
import {COLORS} from './constants';

export const AppContext = createContext();

export default () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // const OneSignalDevice = async () => {
  //   OneSignal.setLogLevel(6, 0);
  //   OneSignal.setAppId('ce3c9326-8b56-4c9e-a9b6-3090aaad0d43');
  //   OneSignal.setNotificationWillShowInForegroundHandler(
  //     notificationReceivedEvent => {
  //       let notification = notificationReceivedEvent.getNotification();
  //       // console.log('notification: ', notification);
  //       // const data = notification.additionalData;
  //       // console.log('additionalData: ', data);
  //       // Complete with null means don't show a notification.
  //       notificationReceivedEvent.complete(notification);
  //     },
  //   );
  //   // OneSignal.setInAppMessageClickHandler(event => {});
  //   OneSignal.setNotificationOpenedHandler(async openedEvent => {
  //     const {notification} = openedEvent;
  //     // setOnesignalClick(notification.additionalData?.id);
  //     // await Linking.openURL(
  //     //   `staging.bukujanji://notification/${notification.additionalData.id}`,
  //     // );
  //     // console.log('notification', notification);
  //   });
  //   // OneSignal.addPermissionObserver(event => {});
  //   // OneSignal.addSubscriptionObserver(event => {});
  //   // OneSignal.addEmailSubscriptionObserver(event => {});
  //   const onesignalUser = await OneSignal.getDeviceState();
  //   // console.log(`onesignalUser`, onesignalUser);
  //   // setOneSignalData(onesignalUser.userId);
  // };
  useEffect(() => {
    SplashScreen.hide();
    // OneSignalDevice();
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
