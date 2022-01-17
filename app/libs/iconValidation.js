import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {ICON} from '../constants';
export default id => {
  if (id === 1) {
    return (
      <Image source={require('../assets/icons/home1.png')} style={styles.img} />
    );
  } else if (id === 2) {
    return (
      <Image source={require('../assets/icons/home2.png')} style={styles.img} />
    );
  } else if (id === 3) {
    return (
      <Image source={require('../assets/icons/home3.png')} style={styles.img} />
    );
  } else if (id === 4) {
    return (
      <Image source={require('../assets/icons/home4.png')} style={styles.img} />
    );
  } else if (id === 5) {
    return (
      <Image source={require('../assets/icons/home5.png')} style={styles.img} />
    );
  } else if (id === 6) {
    return (
      <Image source={require('../assets/icons/home6.png')} style={styles.img} />
    );
  } else if (id === 7) {
    return (
      <Image source={require('../assets/icons/home7.png')} style={styles.img} />
    );
  } else if (id === 8) {
    return (
      <Image source={require('../assets/icons/home8.png')} style={styles.img} />
    );
  } else {
    return (
      <Image source={require('../assets/icons/home1.png')} style={styles.img} />
    );
  }
};

const styles = StyleSheet.create({
  img: {height: 60, width: 60, marginBottom: 24},
});
