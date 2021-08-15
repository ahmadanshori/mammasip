import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {COLORS, FONTS, SIZES} from '../constants';

const Gender = () => {
  const [isGender, setIsgender] = useState(true);
  const setGender = type => {
    setIsgender(type);
  };
  return (
    <View style={styles.container}>
      <Text style={[FONTS.textBold12, {color: COLORS.black}]}>
        Jenis Kelamin
      </Text>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setGender(true)}
          activeOpacity={SIZES.opacity}>
          <View
            style={[
              styles.circleWrapper,
              isGender ? styles.active : styles.inActive,
            ]}>
            {isGender ? <View style={styles.circle} /> : null}
          </View>
          <Text
            style={[
              FONTS.text14,
              {color: isGender ? COLORS.black : COLORS.gray},
            ]}>
            Perempuan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setGender(false)}
          activeOpacity={SIZES.opacity}>
          <View
            style={[
              styles.circleWrapper,
              isGender ? styles.inActive : styles.active,
            ]}>
            {!isGender ? <View style={styles.circle} /> : null}
          </View>
          <Text
            style={[
              FONTS.text14,
              {color: isGender ? COLORS.gray : COLORS.black},
            ]}>
            Laki-laki
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 16},
  wrapper: {flexDirection: 'row', alignItems: 'center'},
  circle: {
    height: 10,
    width: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  circleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 16,
    width: 16,
    borderRadius: 30,
    marginRight: 8,
  },
  active: {borderColor: COLORS.primary},
  inActive: {borderColor: COLORS.gray},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    padding: 16,
  },
});

export default Gender;
