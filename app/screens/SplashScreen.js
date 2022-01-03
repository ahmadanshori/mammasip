import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container} from '../components/Container';
import {COLORS, FONTS, SIZES} from '../constants';
import {AppContext} from '../index';
import LogoIcon from '../assets/icons/logo.svg';

const SplashScreen = () => {
  const {setUser, setToken} = useContext(AppContext);

  useEffect(() => {
    const loadData = async () => {
      const jsonUser = await AsyncStorage.getItem('user');
      const userObject = jsonUser ? JSON.parse(jsonUser) : null;
      setToken(userObject?.token);
      setUser(userObject?.user);
    };
    loadData();
  }, []);
  return (
    <Container style={styles.container}>
      <LogoIcon height={SIZES.width3 + 16} width={SIZES.width3 + 16} />
      <View style={styles.text}>
        <Text style={[FONTS.textBold12, {color: COLORS.white}]}>
          Version 1.3
        </Text>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  text: {bottom: 30, position: 'absolute', zIndex: 99},
});

export default SplashScreen;
