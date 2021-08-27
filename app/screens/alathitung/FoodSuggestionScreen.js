import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import Divider from '../../components/Divider';
import {COLORS, FONTS, SIZES} from '../../constants';

const data = [
  {id: 1, name: '1300-1500'},
  {id: 2, name: '1500-1600'},
  {id: 3, name: '1700-1800'},
  {id: 4, name: '1900-2100'},
  {id: 5, name: '2200-2300'},
];
const pekanData = [
  {id: 1, name: 'Pekan 1'},
  {id: 2, name: 'Pekan 2'},
  {id: 3, name: 'Pekan 3'},
  {id: 4, name: 'Pekan 4'},
];
const dayData = [
  {id: 1, name: 'Senin'},
  {id: 2, name: 'Selasa'},
  {id: 3, name: 'Rabu'},
  {id: 4, name: 'Kamis'},
  {id: 5, name: 'Jumat'},
  {id: 6, name: 'Sabtu'},
  {id: 7, name: 'Minggu'},
];

const FoodSuggestionScreen = () => {
  const [calories, setcalories] = useState(null);
  const [pekan, setPekan] = useState(null);
  const [day, setDay] = useState(null);
  return (
    <Container>
      <HeaderTitle title="Atur menu makanan" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={[
            FONTS.textBold12,
            {color: COLORS.black, marginLeft: 16, marginTop: 24},
          ]}>
          Pilih Total Kalori (Kkal)
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.listCalories}
          showsHorizontalScrollIndicator={false}>
          {data.map(item => (
            <TouchableOpacity
              style={[
                styles.caloriesItem,
                calories?.id === item.id ? styles.active : styles.inActive,
              ]}
              onPress={() => setcalories(item)}
              activeOpacity={SIZES.opacity}
              key={item.id}>
              <Text
                style={[
                  FONTS.text12,
                  calories?.id === item.id
                    ? styles.textActive
                    : styles.textInactive,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.caloriesRow}>
          <Icon name="alert-circle" size={16} color={COLORS.primary} />
          <View>
            <Text
              style={[
                FONTS.text10,
                {color: COLORS.primary, flex: 1, marginLeft: 8},
              ]}>
              Berdasarkan berat badan anda, direkomendasikan kalori sekitar{' '}
            </Text>
            <Text
              style={[
                FONTS.textBold10,
                {color: COLORS.primary, flex: 1, marginLeft: 8},
              ]}>
              1500-1600 Kkal
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          {pekanData.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={SIZES.opacity}
              onPress={() => setPekan(item)}
              style={[
                styles.pekan,
                pekan?.id === item.id && styles.pekenActive,
              ]}>
              <Text style={[FONTS.text12]}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Divider />
        <View style={styles.padding}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={16} />
            <Text
              style={[FONTS.textBold14, {color: COLORS.black, marginLeft: 10}]}>
              Saran Menu Makanan
            </Text>
          </View>
          <View style={styles.menuSelected}>
            <View>
              <Text style={[FONTS.text12, {color: COLORS.white}]}>
                Pilihan menu
              </Text>
              <Text
                style={[FONTS.textBold14, {color: COLORS.white, marginTop: 4}]}>
                Paket Menu 1
              </Text>
            </View>
            <TouchableOpacity
              style={styles.changeText}
              activeOpacity={SIZES.opacity}>
              <Text style={[FONTS.textBold10, {color: COLORS.white}]}>
                Ganti
              </Text>
            </TouchableOpacity>
          </View>
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
                onPress={() => setDay(item)}
                activeOpacity={SIZES.opacity}
                key={item.id}>
                <Text
                  style={[
                    FONTS.textBold12,
                    day?.id === item.id
                      ? styles.textActive
                      : styles.textInactive,
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  listCalories: {paddingHorizontal: 8, marginVertical: 16},
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
  caloriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  pekan: {width: '25%', alignItems: 'center', paddingBottom: 4},
  pekenActive: {borderBottomWidth: 1, borderColor: COLORS.primary},
  padding: {padding: 16},
  menuSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
  },
  changeText: {
    borderWidth: 1,
    borderColor: COLORS.white,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  dayWrapper: {marginTop: 24},
});

export default FoodSuggestionScreen;
