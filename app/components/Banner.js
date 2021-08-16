import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SIZES} from '../constants';

const Banner = ({onPressCategory}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPressCategory}>
      <Image
        source={require('../assets/images/banner.png')}
        style={styles.img}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    height: SIZES.width2 - 32,
    width: '100%',
    marginTop: -90,
    borderRadius: 8,
  },
});

export default Banner;
