import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dropdownalert} from '../../components/AlertProvider';
import {WeightCalculatorHeader} from '../../components/Headers';
import {CalculatorInput} from '../../components/Inputs';
import {MainButton} from '../../components/Buttons';
import {ActivityLevelButton} from '../../components/RadioButton';
// import {CalculatorItem} from '../../components/Items';
import {COLORS, FONTS, SIZES} from '../../constants';

// import WeightIcon from '../../assets/icons/weight.svg';
// import FoodIcon from '../../assets/icons/food.svg';
import VirusIcon from '../../assets/icons/virus.svg';

const CaloriesScreen = ({navigation}) => {
  const [field, setField] = useState({
    age: '',
    gender: 1,
  });

  const handleNavigation = (type, param) => {
    navigation.navigate(type, param);
  };

  const handleInput = useCallback((type, value) => {
    setField(state => ({...state, [type]: value}));
  }, []);

  const handleRadioButton = val => {
    setField(state => ({...state, gender: val}));
  };

  const handleCancer = () => {
    if (field.age) {
      if (Number(field.age) >= 18) {
        navigation.navigate('CancerQuestion', field);
      } else {
        dropdownalert.alertWithType('warn', '', 'Anda masih dibawah umur!!');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.red} barStyle={'light-content'} />
      <WeightCalculatorHeader
        title="Hitung kebutuhan kalori harian"
        onPressBack={() => navigation.goBack()}
        backgroundColor={COLORS.red}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <VirusIcon width={80} height={80} />
          </View>
          <View style={styles.title}>
            <Text style={[FONTS.textBold14, {color: COLORS.white}]}>
              Pengukur resiko kanker
            </Text>
            <Text style={[FONTS.text10, {color: COLORS.white, marginTop: 4}]}>
              Analisa resiko kanker berdasarkan gaya hidup anda. Hasil hanya
              bersifat saran & tetap membutuhkan nasehat dokter untuk hasil yg
              maksimal.
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.dividerWrapper}>
            <View style={styles.divider} />
          </View>
          <ActivityLevelButton
            title="Jenis Kelamin"
            onPress={handleRadioButton}
            radio1="Laki-laki"
            radio2="Perempuan"
            value1={1}
            value2={2}
            selected={field.gender}
          />
          <CalculatorInput
            title="Usia Anda"
            type="Tahun"
            placeholder="20"
            maxLength={3}
            keyboardType="numeric"
            onChangeText={val => handleInput('age', val)}
            value={field.age}
          />
          <View style={styles.row}>
            <Ionicons name="alert-circle" size={14} color={COLORS.red} />
            <Text style={[FONTS.text10, {color: COLORS.red, marginLeft: 4}]}>
              Diperuntukan untuk usia 18 keatas
            </Text>
          </View>
          <MainButton
            title="Hitung"
            style={styles.countButton}
            onPress={handleCancer}
            disable={!field.gender || !field.age}
          />

          {/* <View style={styles.marginHeight}>
            <Text style={[FONTS.textBold16, styles.text]}>
              Alat bantu hitung lain
            </Text>
            <CalculatorItem
              image={<WeightIcon width={60} height={60} />}
              onPress={() => handleNavigation('Bmr')}
              backgroundColor={COLORS.blue}
              title="Kalkulator Indeks Massa Tubuh"
              description="Hitung berat badan ideal yang sesuai untuk kesehatan anda."
            />
            <CalculatorItem
              image={<FoodIcon width={60} height={60} />}
              onPress={() => handleNavigation('Bmi')}
              backgroundColor={COLORS.secondary}
              title="Kalkulator Kebutuhan Kalori"
              description="Sudahkan konsumsi makanan memenuhi kebutuhan kalori harian anda?"
            />
          </View> */}
          <View style={styles.margin}>
            <Text style={[FONTS.textBold16, styles.text]}>
              Alat bantu hitung lain
            </Text>
            <TouchableNativeFeedback onPress={() => handleNavigation('Faq')}>
              <View style={styles.askButton}>
                <Icon name="questioncircleo" size={20} color={COLORS.primary} />
                <Text
                  style={[
                    FONTS.textBold14,
                    {color: COLORS.primary, marginLeft: 8},
                  ]}>
                  Tanya Jawab
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: COLORS.white,
  },
  scroll: {paddingBottom: 24},
  header: {
    width: '100%',
    backgroundColor: COLORS.red,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 52,
  },
  icon: {marginRight: 16},
  title: {flex: 1},
  body: {
    backgroundColor: COLORS.white,
    marginTop: -16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dividerWrapper: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {color: COLORS.black, textAlign: 'center', marginBottom: 16},
  divider: {
    height: 6,
    width: 65,
    backgroundColor: COLORS.separator,
    borderRadius: 8,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  countButton: {marginTop: 16},
  margin: {marginTop: 32},
  marginHeight: {marginTop: 64},
  askButton: {
    backgroundColor: COLORS.shadowPrimary,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
});

export default CaloriesScreen;
