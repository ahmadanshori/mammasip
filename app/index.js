import React, {useEffect, useState, createContext} from 'react';
// import SplashScreen from 'react-native-splash-screen';
// import {LoadingView} from './components/Loadings';
import AppNavigator from './config/routes';
import HomeScreen from './screens/menu/HomeScreen';

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
      {/* <HomeScreen /> */}
      <AppNavigator />
      {/* {loading ? <LoadingView /> : null} */}
    </AppContext.Provider>
  );
};

// export default () => <HomeScreen />;
