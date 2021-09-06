import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, SIZES} from '../constants';

const Reminder = ({onPress}) => {
  return (
    <View style={styles.box}>
      <View>
        <View style={styles.row}>
          <Icon name="bell-ring" size={16} style={styles.margin} />
          <Text style={FONTS.textBold12}>Reminder Harian Aktif</Text>
        </View>
        <Text style={[FONTS.text12, {color: COLORS.gray}]}>
          Besok, 8 Sep 2021 09:00
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