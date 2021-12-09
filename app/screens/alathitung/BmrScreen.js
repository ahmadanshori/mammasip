import React, {useState, useCallback, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';

import {WeightCalculatorHeader} from '../../components/Headers';
import {CalculatorInput} from '../../components/Inputs';
import {MainButton, AskButton} from '../../components/Buttons';
import {ActivityLevelButton} from '../../components/RadioButton';
import Accordion from '../../components/Accordion';
import {CalculatorItem} from '../../components/Items';
import {dropdownalert} from '../../components/AlertProvider';
import {COLORS, FONTS, SIZES} from '../../constants';

import {getBmrAPI} from '../../api/calculator';
import {AppContext} from '../../index';
import WeightIcon from '../../assets/icons/weight.svg';
import FoodIcon from '../../assets/icons/food.svg';
import VirusIcon from '../../assets/icons/virus.svg';
import QuizIcon from '../../assets/icons/quiz.svg';

const WeightCalculatorScreen = ({navigation}) => {
  const {user, token, setLoading} = useContext(AppContext);
  const [field, setField] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 1,
    exercise_level: '1',
  });

  const handleNavigation = useCallback((type, param) => {
    navigation.navigate(type, param);
  }, []);

  const handleInput = useCallback((type, value) => {
    setField(state => ({...state, [type]: value}));
  }, []);

  const handleRadioButton = useCallback(val => {
    setField(state => ({...state, gender: val}));
  }, []);

  const handleCalculation = useCallback(async () => {
    handleNavigation('CalculationDetail', {type: 'BMR', field});
  }, [field, handleNavigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.darkBlue} barStyle={'light-content'} />
      <WeightCalculatorHeader
        title="Hitung masa tubuh ideal"
        onPressBack={() => navigation.goBack()}
        backgroundColor={COLORS.darkBlue}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <WeightIcon width={80} height={80} />
          </View>
          <View style={styles.title}>
            <Text style={[FONTS.textBold14, {color: COLORS.white}]}>
              Basal Metabolic Rate (BMR)
            </Text>
            <Text style={[FONTS.text10, {color: COLORS.white, marginTop: 4}]}>
              Kebutuhan kalori minimal yang dipakai organ-organ tubuh untuk
              melakukan tugas dasarnya.
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
            onPress={handleCalculation}
            disable={!field.age || !field.height || !field.weight}
          />
          <View style={styles.margin}>
            <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
              Info seputar kebutuhan kalori
            </Text>
            <Accordion title="Apa itu BMI?" />
            <Accordion title="Apa itu kalori & fungsinya untuk tubuh?" />
            <Accordion title="Bagaimana cara menghitung BMR?" />
            <Accordion title="Apakah BMR penting untuk kesehatan?" />
          </View>
          <View style={styles.marginHeight}>
            <Text style={[FONTS.textBold16, styles.text]}>
              Alat bantu hitung lain
            </Text>
            <CalculatorItem
              image={<FoodIcon width={60} height={60} />}
              onPress={() => handleNavigation('Bmi')}
              backgroundColor={COLORS.secondary}
              title="Kebutuhan Kalori Harian (BMI)"
              description="Sudahkan konsumsi makanan memenuhi kebutuhan kalori harian anda?"
            />
            <CalculatorItem
              image={<VirusIcon width={60} height={60} />}
              onPress={() => handleNavigation('CancerRisk')}
              backgroundColor={COLORS.red}
              title="Resiko Penyakit Kanker"
              description="Analisa dari kebiasaan dan pola makan sehari-hari anda."
            />
          </View>
          <View style={styles.margin}>
            <Text style={[FONTS.textBold16, styles.text]}>
              Alat bantu hitung lain
            </Text>
            <AskButton onPress={() => navigation.navigate('Faq')} />
          </View>
          {/* <View style={styles.margin}>
            <CalculatorItem
              image={<QuizIcon width={60} height={60} />}
              // onPress={() => handleNavigation('WeightCalculator')}
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
    backgroundColor: COLORS.darkBlue,
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

export default WeightCalculatorScreen;
