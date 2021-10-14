import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../constants';

const ActivityLevelButton = ({
  title,
  selected,
  onPress,
  radio1,
  radio2,
  value1,
  value2,
  style = {},
}) => {
  return (
    <View style={style}>
      <Text style={[FONTS.textBold12, {color: COLORS.black}]}>{title}</Text>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => onPress(value1)}
          activeOpacity={SIZES.opacity}>
          <View
            style={[
              styles.circleWrapper,
              selected === value1 ? styles.active : styles.inActive,
            ]}>
            {selected === value1 ? <View style={styles.circle} /> : null}
          </View>
          <Text
            style={[
              FONTS.text14,
              {color: selected === value1 ? COLORS.black : COLORS.gray},
            ]}>
            {radio1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => onPress(value2)}
          activeOpacity={SIZES.opacity}>
          <View
            style={[
              styles.circleWrapper,
              selected === value1 ? styles.inActive : styles.active,
            ]}>
            {selected === value2 ? <View style={styles.circle} /> : null}
          </View>
          <Text
            style={[
              FONTS.text14,
              {color: selected === value1 ? COLORS.gray : COLORS.black},
            ]}>
            {radio2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ActivityLevelButton;
