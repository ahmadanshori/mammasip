import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container} from '../components/Container';
import {FONTS} from '../constants';
import {AppContext} from '../index';

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
      <Text style={FONTS.textBold20}>MammaSIP</Text>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
});

export default SplashScreen;
