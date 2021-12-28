import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';

const MainButton = ({
  title,
  style = {},
  onPress,
  disable = false,
  share,
  backgroundColor,
  left,
  right,
}) => {
  const containerStyles = [
    [styles.button, disable ? styles.inactive : styles.active, style],
  ];
  if (backgroundColor) {
    containerStyles.push({backgroundColor});
  }
  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : SIZES.opacity}
      style={containerStyles}
      onPress={disable ? () => {} : onPress}>
      <View style={styles.wrapper}>
        {share ? (
          <Icon
            name="share-social"
            size={20}
            color={COLORS.white}
            style={styles.icon}
          />
        ) : null}
        {left ? (
          <Icon
            name="arrow-back"
            size={20}
            color={COLORS.white}
            style={styles.icon}
          />
        ) : null}
        <Text
          style={[
            FONTS.textBold14,
            {color: disable ? COLORS.gray : COLORS.white},
          ]}>
          {title}
        </Text>
        {right ? (
          <Icon
            name="arrow-forward"
            size={20}
            color={COLORS.white}
            style={styles.margin}
          />
        ) : null}
      </View>
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
  wrapper: {flexDirection: 'row', alignItems: 'center'},
  icon: {marginRight: 8},
  margin: {marginLeft: 8},
});

export default MainButton;
