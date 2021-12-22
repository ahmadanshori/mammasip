import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES} from '../constants';

const Banner = ({onPressCategory}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPressCategory}
      style={styles.container}>
      <View style={styles.background} />
      <View style={styles.padding}>
        <Image
          source={require('../assets/images/banner.jpg')}
          style={styles.img}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center'},
  background: {height: 100, backgroundColor: COLORS.primary},
  padding: {padding: 16},
  img: {
    height: SIZES.width2 - 16,
    width: '100%',
    borderRadius: 8,
    marginTop: -100,
  },
});

export default Banner;
