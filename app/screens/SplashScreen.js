import React, {useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container} from '../components/Container';
import {COLORS, SIZES} from '../constants';
import {AppContext} from '../index';
import LogoIcon from '../assets/icons/logo.svg';

const SplashScreen = () => {
  const {setUser, setToken} = useContext(AppContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonUser = await AsyncStorage.getItem('user');
        const userObject = jsonUser ? JSON.parse(jsonUser) : null;
        setToken(userObject?.token);
        setUser(userObject?.user);
      } catch (e) {
        console.log(`e`, e, {...e});
      }
    };
    loadData();
  }, []);
  return (
    <Container style={styles.container}>
      <LogoIcon height={SIZES.width2 + 16} width={SIZES.width2 + 16} />
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
});

export default SplashScreen;
