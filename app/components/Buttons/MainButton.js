import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';

const MainButton = ({title, style = {}, onPress, disable = false, share}) => {
  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : SIZES.opacity}
      style={[
        styles.button,
        disable ? [styles.inactive, style] : [styles.active, style],
      ]}
      onPress={onPress}>
      <View style={styles.wrapper}>
        {share ? (
          <Icon
            name="share-social"
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
});

export default MainButton;
