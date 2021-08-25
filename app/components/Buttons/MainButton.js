import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../constants';

const Mainbutton = ({title, style = {}, onPress, disable = false}) => {
  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : SIZES.opacity}
      style={[
        styles.button,
        disable ? [styles.inactive, style] : [styles.active, style],
      ]}
      onPress={onPress}>
      <Text
        style={[
          FONTS.textBold14,
          {color: disable ? COLORS.gray : COLORS.white},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 6,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: COLORS.primary,
  },
  inactive: {backgroundColor: COLORS.lightGray},
});

export default Mainbutton;
