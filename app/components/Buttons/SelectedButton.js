import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

const SelectedButton = ({title, style = {}, onPress, selected}) => {
  return (
    <TouchableOpacity
      activeOpacity={selected ? 1 : SIZES.opacity}
      style={[
        styles.button,
        style,
        selected ? [styles.active] : [styles.inActive],
      ]}
      onPress={onPress}>
      <View
        style={[
          styles.circleWrapper,
          selected ? styles.active : styles.inActive,
        ]}>
        {selected ? <View style={styles.circle} /> : null}
      </View>
      <Text style={[FONTS.text14, {color: COLORS.black}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: COLORS.darkWhite,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
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
});

export default SelectedButton;
