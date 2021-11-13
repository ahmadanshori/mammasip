import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../constants';

const MainButton = ({
  title,
  style = {},
  onPress,
  disable = false,
  borderColor,
  right,
}) => {
  const containerStyles = [
    [styles.button, disable ? styles.inactive : styles.active, style],
  ];
  if (borderColor) {
    containerStyles.push({borderColor});
  }
  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : SIZES.opacity}
      style={containerStyles}
      onPress={onPress}>
      <View style={styles.wrapper}>
        <Text
          style={[
            FONTS.textBold14,
            {color: disable ? COLORS.gray : COLORS.primary},
          ]}>
          {title}
        </Text>
        {right ? (
          <Icon
            name="arrow-forward"
            size={20}
            color={COLORS.primary}
            style={styles.icon}
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
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
  },
  active: {
    borderColor: COLORS.primary,
  },
  inactive: {borderColor: COLORS.lightGray},
  wrapper: {flexDirection: 'row', alignItems: 'center'},
  icon: {marginLeft: 8},
});

export default MainButton;
