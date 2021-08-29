import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {MealItem} from './Items';

import {COLORS, FONTS} from '../constants';

const MealSuggestions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Feather name="sunrise" size={16} color={COLORS.red} />
          <Text
            style={[FONTS.textBold12, {color: COLORS.black, marginLeft: 10}]}>
            Sarapan Pagi
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[FONTS.textBold16, {color: COLORS.black}]}>275</Text>
          <Text style={[FONTS.text12, {color: COLORS.black, marginLeft: 4}]}>
            KKal
          </Text>
        </View>
      </View>
      <MealItem icon name="Sandwich Ayam" calories="320" />
      <MealItem name="Melon" calories="50" />
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Feather name="sun" size={16} color={COLORS.darkYellow} />
          <Text
            style={[FONTS.textBold12, {color: COLORS.black, marginLeft: 10}]}>
            Sarapan Siang
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[FONTS.textBold16, {color: COLORS.black}]}>620</Text>
          <Text style={[FONTS.text12, {color: COLORS.black, marginLeft: 4}]}>
            KKal
          </Text>
        </View>
      </View>
      <MealItem icon name="Nasi Goreng Ayam" calories="500" />
      <MealItem name="Susu FC" calories="50" />
      <MealItem name="Pisang" calories="50" />
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Feather name="moon" size={16} color={COLORS.primary} />
          <Text
            style={[FONTS.textBold12, {color: COLORS.black, marginLeft: 10}]}>
            Sarapan Malam
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[FONTS.textBold16, {color: COLORS.black}]}>420</Text>
          <Text style={[FONTS.text12, {color: COLORS.black, marginLeft: 4}]}>
            KKal
          </Text>
        </View>
      </View>
      <MealItem icon name="Nasi Sop Ikan" calories="420" />
      <MealItem name="Pisang" calories="50" />
      <View style={styles.justify}>
        <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
          Total Kalori
        </Text>
        <View style={styles.row}>
          <Text style={[FONTS.textBold20, {color: COLORS.primary}]}>1.500</Text>
          <Text style={[FONTS.text12, {color: COLORS.primary, marginLeft: 4}]}>
            Kkal
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {borderBottomWidth: 1, borderColor: COLORS.border},
  row: {flexDirection: 'row', alignItems: 'center'},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 32,
  },
  justify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    marginVertical: 16,
    borderRadius: 6,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.shadowPrimary,
  },
});
export default MealSuggestions;
