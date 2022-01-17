import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import iconValidation from '../../libs/iconValidation';
import colorValidation from '../../libs/colorValidation';

const HomeItem = ({data, colorId, onPress, style = {}}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {backgroundColor: colorValidation(colorId)},
      ]}
      activeOpacity={1}
      onPress={onPress}>
      {colorId ? iconValidation(colorId) : null}
      <Text style={[FONTS.textBold14, styles.text]}>{data?.nama_ruang}</Text>
      <Text style={[FONTS.text10, styles.text]}>{data?.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: COLORS.primary,
    width: '48%',
  },
  text: {marginBottom: 4, color: COLORS.white, textAlign: 'center'},
  img: {
    height: 90,
    width: 90,
  },
});

export default HomeItem;
