import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, SIZES} from '../constants';
import formatDate from '../libs/formatDate';

const Reminder = ({title, onPress, time}) => {
  return (
    <View style={styles.box}>
      <View>
        <View style={styles.row}>
          <Icon name="bell-ring" size={16} style={styles.margin} />
          <Text style={FONTS.textBold12}>{title}</Text>
        </View>
        <Text style={[FONTS.text12, {color: COLORS.gray}]}>
          {time ? formatDate(time, 'dd MMMM yyyy hh:mm') : '--'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.ruleButton}
        activeOpacity={SIZES.opacity}
        onPress={onPress}>
        <Text style={[FONTS.textBold10, {color: COLORS.darkBlue}]}>Atur</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
  ruleButton: {
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  margin: {marginRight: 8},
});

export default Reminder;
