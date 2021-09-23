import React, {useEffect, useState, createContext} from 'react';
import {StatusBar} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {LoadingView} from './components/Loadings';
import AppNavigator from './config/routes';
import {COLORS} from './constants';

export const AppContext = createContext();

export default () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <AppContext.Provider
      value={{
        setLoading,
        setToken,
        token,
        setUser,
        user,
      }}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      <AppNavigator />
      {loading ? <LoadingView /> : null}
    </AppContext.Provider>
  );
};
