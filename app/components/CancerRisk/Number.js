import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const Number = ({page}) => {
  return (
    <View style={styles.container}>
      <Text style={[FONTS.text12, {color: COLORS.black}]}>
        Pertanyaan {page} dari 6
      </Text>
      <View style={styles.wrapper}>
        <View
          style={[styles.box, page === 1 ? styles.active : styles.inActive]}>
          <Text
            style={[
              FONTS.text14,
              {color: page === 1 ? COLORS.white : COLORS.black},
            ]}>
            1
          </Text>
        </View>
        <View
          style={[styles.box, page === 2 ? styles.active : styles.inActive]}>
          <Text
            style={[
              FONTS.text14,
              {color: page === 2 ? COLORS.white : COLORS.black},
            ]}>
            2
          </Text>
        </View>
        <View
          style={[styles.box, page === 3 ? styles.active : styles.inActive]}>
          <Text
            style={[
              FONTS.text14,
              {color: page === 3 ? COLORS.white : COLORS.black},
            ]}>
            3
          </Text>
        </View>
        <View
          style={[styles.box, page === 4 ? styles.active : styles.inActive]}>
          <Text
            style={[
              FONTS.text14,
              {color: page === 4 ? COLORS.white : COLORS.black},
            ]}>
            4
          </Text>
        </View>
        <View
          style={[styles.box, page === 5 ? styles.active : styles.inActive]}>
          <Text
            style={[
              FONTS.text14,
              {color: page === 5 ? COLORS.white : COLORS.black},
            ]}>
            5
          </Text>
        </View>
        <View
          style={[styles.box, page === 6 ? styles.active : styles.inActive]}>
          <Text
            style={[
              FONTS.text14,
              {color: page === 6 ? COLORS.white : COLORS.black},
            ]}>
            6
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', paddingVertical: 16},
  wrapper: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  box: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  active: {borderColor: COLORS.primary, backgroundColor: COLORS.primary},
  inActive: {borderColor: COLORS.separator},
});

export default Number;
