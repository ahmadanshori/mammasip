import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text style={[FONTS.text10, {color: COLORS.white}]}>
            Halo, mommies
          </Text>
          <Text style={[FONTS.textBold12, {color: COLORS.white}]}>
            Jaga pola makanmu hari ini.
          </Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
      </View>
      <View style={styles.imgWrapper}>
        <Image
          source={require('../../assets/images/woman.png')}
          style={styles.img}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgWrapper: {justifyContent: 'center', alignItems: 'center'},
  img: {
    height: SIZES.width2,
    width: SIZES.width2,
  },
});

export default HomeHeader;
