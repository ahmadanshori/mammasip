import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';

const HomeItem = ({}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      <Image
        source={{uri: 'https://www.w3schools.com/w3css/img_snowtops.jpg'}}
        style={styles.img}
      />
      <View style={styles.shadowImg}>
        <TouchableOpacity style={styles.bookmark}>
          <Icon name="bookmark-outline" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <Icon name="play-circle" size={30} color={COLORS.white} />
      </View>
      <View style={styles.body}>
        <View style={styles.spaceBetween}>
          <View style={styles.subtitle}>
            <Text style={[FONTS.textBold8, {color: COLORS.primary}]}>
              Sayangi dirimu
            </Text>
          </View>
          <View />
        </View>
        <Text style={[FONTS.text10, {color: COLORS.black}]}>
          Mari Lakukan Skrining Payudara Sebelum Terlambat.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: SIZES.width2 - 20,
    borderRadius: 8,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width4,
    width: SIZES.width2 - 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  shadowImg: {
    height: SIZES.width4,
    width: SIZES.width2 - 20,
    backgroundColor: COLORS.shadowPrimary,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 99,
  },
  bookmark: {position: 'absolute', top: 0, right: 0, padding: 8},
  body: {paddingHorizontal: 8, paddingVertical: 10},
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: COLORS.lightPrimary,
    borderRadius: 10,
  },
});

export default HomeItem;
