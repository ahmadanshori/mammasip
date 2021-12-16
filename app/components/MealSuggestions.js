import React, {useState, useCallback, useMemo} from 'react';
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
  {id: 1, name: 'Senin', field: 'hariSenin'},
  {id: 2, name: 'Selasa', field: 'hariSelasa'},
  {id: 3, name: 'Rabu', field: 'hariRabu'},
  {id: 4, name: 'Kamis', field: 'hariKamis'},
  {id: 5, name: 'Jumat', field: 'hariJumat'},
  {id: 6, name: 'Sabtu', field: 'hariSabtu'},
  {id: 7, name: 'Minggu', field: 'hariMinggu'},
];

const MealSuggestions = ({data}) => {
  const [day, setDay] = useState({id: 1, name: 'Senin', field: 'hariSenin'});
  const handleDay = useCallback(event => {
    setDay(event);
  }, []);
  const totalCalories = useMemo(() => {
    let total =
      data[day.field]?.totalKkal?.pagi +
      data[day.field]?.totalKkal?.siang +
      data[day.field]?.totalKkal?.malam;
    return total;
  }, [data, day.field]);

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
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
          <Text style={[FONTS.textBold16, {color: COLORS.black}]}>
            {data[day.field]?.totalKkal?.pagi}
          </Text>
          <Text style={[FONTS.text12, {color: COLORS.black, marginLeft: 4}]}>
            KKal
          </Text>
        </View>
      </View>
      {data[day.field]?.makanPagi?.map(item => (
        <MealItem
          key={item.id_makanan}
          name={item.nama_makanan}
          ingredients={item.bahan}
          calories="320"
        />
      ))}
      {data[day.field]?.selinganPagi?.map(item => (
        <MealItem
          key={item.id_makanan}
          name={item.nama_makanan}
          ingredients={item.bahan}
          calories="320"
        />
      ))}
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Feather name="sun" size={16} color={COLORS.darkYellow} />
          <Text
            style={[FONTS.textBold12, {color: COLORS.black, marginLeft: 10}]}>
            Sarapan Siang
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[FONTS.textBold16, {color: COLORS.black}]}>
            {' '}
            {data[day.field]?.totalKkal?.siang}
          </Text>
          <Text style={[FONTS.text12, {color: COLORS.black, marginLeft: 4}]}>
            KKal
          </Text>
        </View>
      </View>
      {data[day.field]?.makanSiang?.map(item => (
        <MealItem
          key={item.id_makanan}
          name={item.nama_makanan}
          ingredients={item.bahan}
          calories="320"
        />
      ))}
      {data[day.field]?.selinganSiang?.map(item => (
        <MealItem
          key={item.id_makanan}
          name={item.nama_makanan}
          ingredients={item.bahan}
          calories="320"
        />
      ))}
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Feather name="moon" size={16} color={COLORS.primary} />
          <Text
            style={[FONTS.textBold12, {color: COLORS.black, marginLeft: 10}]}>
            Sarapan Malam
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[FONTS.textBold16, {color: COLORS.black}]}>
            {' '}
            {data[day.field]?.totalKkal?.malam}
          </Text>
          <Text style={[FONTS.text12, {color: COLORS.black, marginLeft: 4}]}>
            KKal
          </Text>
        </View>
      </View>
      {data[day.field]?.makanMalam?.map(item => (
        <MealItem
          key={item.id_makanan}
          name={item.nama_makanan}
          ingredients={item.bahan}
          calories="320"
        />
      ))}
      {data[day.field]?.selinganMalam?.map(item => (
        <MealItem
          key={item.id_makanan}
          name={item.nama_makanan}
          ingredients={item.bahan}
          calories="320"
        />
      ))}
      <View style={styles.justify}>
        <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
          Total Kalori
        </Text>
        <View style={styles.row}>
          <Text style={[FONTS.textBold20, {color: COLORS.primary}]}>
            {totalCalories}
          </Text>
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
  dayWrapper: {marginTop: 8},
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
    marginTop: 24,
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
