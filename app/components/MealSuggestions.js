import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {MealItem} from './Items';

import {COLORS, FONTS, SIZES} from '../constants';
const dayData = [
  {id: 1, name: 'Senin'},
  {id: 2, name: 'Selasa'},
  {id: 3, name: 'Rabu'},
  {id: 4, name: 'Kamis'},
  {id: 5, name: 'Jumat'},
  {id: 6, name: 'Sabtu'},
  {id: 7, name: 'Minggu'},
];

const MealSuggestions = () => {
  const [day, setDay] = useState(null);

  const handleDay = useCallback(event => {
    setDay(event);
  }, []);
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dayWrapper}>
        {dayData.map(item => (
          <TouchableOpacity
            style={[
              styles.caloriesItem,
              day?.id === item.id ? styles.active : styles.inActive,
            ]}
            onPress={() => handleDay(item)}
            activeOpacity={SIZES.opacity}
            key={item.id}>
            <Text
              style={[
                FONTS.textBold12,
                day?.id === item.id ? styles.textActive : styles.textInactive,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {borderBottomWidth: 1, borderColor: COLORS.border},
  dayWrapper: {marginTop: 24},
  caloriesItem: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  active: {backgroundColor: COLORS.shadowPrimary, borderColor: COLORS.primary},
  inActive: {backgroundColor: COLORS.white, borderColor: COLORS.white},
  textActive: {color: COLORS.primary},
  textInactive: {color: COLORS.black},
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    marginVertical: 16,
    borderRadius: 6,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.shadowPrimary,
  },
});
export default MealSuggestions;
