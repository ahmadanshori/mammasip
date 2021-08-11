import React, {useEffect, useState, createContext} from 'react';
import {StatusBar} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
// import {LoadingView} from './components/Loadings';
import AppNavigator from './config/routes';
import HomeScreen from './screens/menu/HomeScreen';
import {COLORS} from './constants';

export const AppContext = createContext();

export default () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    // SplashScreen.hide();
  }, []);
  return (
    <AppContext.Provider
      value={{
        setLoading,
        setToken,
        token,
      }}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      {/* <HomeScreen /> */}
      <AppNavigator />
      {/* {loading ? <LoadingView /> : null} */}
    </AppContext.Provider>
  );
};

// export default () => <HomeScreen />;
