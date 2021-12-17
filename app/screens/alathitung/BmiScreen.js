import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  // Image,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {WeightCalculatorHeader} from '../../components/Headers';
import {CalculatorInput} from '../../components/Inputs';
import {MainButton} from '../../components/Buttons';
import {ActivityLevelButton} from '../../components/RadioButton';
// import {CalculatorItem} from '../../components/Items';
// import {dropdownalert} from '../../components/AlertProvider';
import {COLORS, FONTS, SIZES} from '../../constants';

// import WeightIcon from '../../assets/icons/weight.svg';
import FoodIcon from '../../assets/icons/food.svg';
// import VirusIcon from '../../assets/icons/virus.svg';
// import QuizIcon from '../../assets/icons/quiz.svg';

const BmiScreen = ({navigation}) => {
  const [field, setField] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 1,
  });

  const handleNavigation = useCallback(
    (type, param) => {
      navigation.navigate(type, param);
    },
    [navigation],
  );

  const handleInput = useCallback((type, value) => {
    setField(state => ({...state, [type]: value}));
  }, []);

  const handleRadioButton = val => {
    setField(state => ({...state, gender: val}));
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.secondary}
        barStyle={'light-content'}
      />
      <WeightCalculatorHeader
        title="Hitung kebutuhan kalori harian"
        onPressBack={() => navigation.goBack()}
        backgroundColor={COLORS.secondary}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <FoodIcon width={80} height={80} />
          </View>
          <View style={styles.title}>
            <Text style={[FONTS.textBold14, {color: COLORS.white}]}>
              Index Massa Tubuh (IMT)
            </Text>
            <Text style={[FONTS.text10, {color: COLORS.white, marginTop: 4}]}>
              Massa tubuh anda sudah ideal? apakah terhitung kurang, cukup atau
              berlebih?.
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.dividerWrapper}>
            <View style={styles.divider} />
          </View>
          <CalculatorInput
            title="Berapa usia anda"
            type="Tahun"
            placeholder="18"
            maxLength={3}
            keyboardType="numeric"
            onChangeText={val => handleInput('age', val)}
            value={field.age}
          />
          <CalculatorInput
            title="Berat badan"
            type="Kg"
            placeholder="56"
            maxLength={3}
            keyboardType="numeric"
            onChangeText={val => handleInput('weight', val)}
            value={field.weight}
          />
          <CalculatorInput
            title="Tinggi Badan"
            type="Cm"
            placeholder="164"
            maxLength={3}
            keyboardType="numeric"
            onChangeText={val => handleInput('height', val)}
            value={field.height}
          />
          <ActivityLevelButton
            title="Jenis Kelamin"
            onPress={handleRadioButton}
            radio1="Laki-laki"
            radio2="Perempuan"
            value1={1}
            value2={2}
            selected={field.gender}
          />
          <MainButton
            title="Hitung"
            style={styles.button}
            onPress={() =>
              handleNavigation('CalculationDetail', {type: 'BMI', field})
            }
            disable={!field.age || !field.height || !field.weight}
          />
          {/* <View style={styles.marginHeight}>
            <Text style={[FONTS.textBold16, styles.text]}>
              Alat bantu hitung lain
            </Text>
            <CalculatorItem
              image={<FoodIcon width={60} height={60} />}
              onPress={() => handleNavigation('Bmr')}
              backgroundColor={COLORS.blue}
              title="Kalkulator Indeks Massa Tubuh"
              description="Hitung berat badan ideal yang sesuai untuk kesehatan anda."
            />
            <CalculatorItem
              image={<VirusIcon width={60} height={60} />}
              onPress={() => handleNavigation('CancerRisk')}
              backgroundColor={COLORS.red}
              title="Resiko Penyakit Kanker"
              description="Analisa dari kebiasaan dan pola makan sehari-hari anda."
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
          {/* <View style={styles.margin}>
            <CalculatorItem
              image={<QuizIcon width={60} height={60} />}
              //   onPress={() => handleNavigation('WeightCalculator')}
              onPress={() =>
                dropdownalert.alertWithType(
                  'warn',
                  '',
                  'Belum bisa, Masih Diproses!!',
                )
              }
              backgroundColor={COLORS.primary}
              title="Ayo ikutan Quiz!"
              description="Uji pengetahuanmu dengan quiz
              kesehatan dari mammaSIP."
            />
          </View> */}
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
    backgroundColor: COLORS.secondary,
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
  button: {marginTop: 8},
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

export default BmiScreen;
