import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

const BookItem = ({onPress, source}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <Image source={source} style={styles.img} />
      <View style={styles.body}>
        <Text
          style={[FONTS.textBold10, {color: COLORS.black}]}
          numberOfLines={1}>
          Jenis dan Stadium penyakit Kanker Payudara.
        </Text>
        <View style={styles.row}>
          <Text style={[FONTS.textBold8, {color: COLORS.secondary}]}>
            1983{'  '}
          </Text>
          <Text
            style={[FONTS.textBold8, {color: COLORS.gray, flex: 1}]}
            numberOfLines={1}>
            Rodney, Paige
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: SIZES.width3,
    borderRadius: 8,
    marginRight: 16,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width2,
    width: SIZES.width3,
    borderRadius: 8,
  },
  body: {paddingVertical: 8},
  row: {flexDirection: 'row', alignItems: 'center'},
});

export default BookItem;
