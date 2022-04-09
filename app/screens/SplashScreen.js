import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container} from '../components/Container';
import {COLORS, FONTS, SIZES} from '../constants';
import {AppContext} from '../index';

const SplashScreen = () => {
  const {setUser, setToken, setOnesignalId, setOnboarding} =
    useContext(AppContext);

  useEffect(() => {
    const loadData = async () => {
      const jsonUser = await AsyncStorage.getItem('user');
      const userObject = jsonUser ? JSON.parse(jsonUser) : null;
      const onesignal = await AsyncStorage.getItem('onesignal');
      const onboard = await AsyncStorage.getItem('onboard');
      setToken(userObject?.token);
      setUser(userObject?.user);
      setOnesignalId(onesignal);
      setOnboarding(onboard || null);
    };
    loadData();
  }, []);
  return (
    <Container style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../assets/images/logo.png')}
        style={styles.img}
      />
      <View style={styles.text}>
        <Text style={[FONTS.textBold12, {color: COLORS.white}]}>
          Version 1.8
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
  img: {height: SIZES.width2 + 16, width: SIZES.width2 + 16},
});

export default SplashScreen;
