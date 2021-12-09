import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../constants';

const ImportantMessage = ({title, style}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Icon
        name="alert-circle"
        size={20}
        color={COLORS.white}
        style={styles.icon}
      />
      <Text style={[FONTS.text12, {color: COLORS.white, flex: 1}]}>
        {title}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
  },
  icon: {marginRight: 6},
});

export default ImportantMessage;
