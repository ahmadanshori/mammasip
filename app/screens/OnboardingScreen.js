import React, {useContext} from 'react';
import {View, Image, StyleSheet, SafeAreaView} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SIZES} from '../constants';
import {AppContext} from '../index';

const OnboardingScreng = () => {
  const {setOnboarding} = useContext(AppContext);
  const navigationHandler = async () => {
    await AsyncStorage.setItem('onboard', 'sudah');
    setOnboarding('sudah');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Onboarding
          onDone={navigationHandler}
          onSkip={navigationHandler}
          pages={[
            {
              backgroundColor: COLORS.primary,
              image: (
                <Image
                  source={require('../assets/images/board1.png')}
                  style={styles.img}
                />
              ),
              title: 'Hi Sahabat MammaSIP',
              subtitle:
                'MammaSIP adalah media edukasi terpadu yang memberikan informasi lengkap, akurat dan bermanfaat mengenai kanker payudara.',
            },
            {
              backgroundColor: COLORS.primary,
              image: (
                <Image
                  source={require('../assets/images/board2.png')}
                  style={styles.img}
                />
              ),
              title: 'Untuk Sahabat Yang Sedang Berjuang!',
              subtitle:
                'MammaSIP diperuntukkan kepada masyarakat awam, penyintas kanker payudara, keluarga dan lingkungan terdekat penyintas serta tenaga dan penyuluh kesehatan.',
            },
            {
              backgroundColor: COLORS.primary,
              image: (
                <Image
                  source={require('../assets/images/board3.png')}
                  style={styles.img}
                />
              ),
              title: 'Lengkap dan Informatif',
              subtitle:
                'Banyak artikel dan jurnal tentang menjaga, menanggulangi, dan diagnosa dini pada payudaramu. dilengkapi dengan fitur memberikan menu makanan sehat dan jurnal jurnal kesehatan',
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {backgroundColor: COLORS.primary, flex: 1},
  container: {flex: 1},
  img: {height: SIZES.width1, width: SIZES.width1},
});

export default OnboardingScreng;
