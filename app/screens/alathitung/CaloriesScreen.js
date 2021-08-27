import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {WeightCalculatorHeader} from '../../components/Headers';
import {CalculatorInput} from '../../components/Inputs';
import {MainButton} from '../../components/Buttons';
import {ActivityLevelButton} from '../../components/RadioButton';
import Accordion from '../../components/Accordion';
import {CalculatorItem} from '../../components/Items';
import {COLORS, FONTS, SIZES} from '../../constants';

const CaloriesScreen = ({navigation}) => {
  const [field, setField] = useState({
    age: '',
    weight: '',
    height: '',
    activity: 'Sedang',
  });

  const handleNavigation = type => {
    navigation.navigate(type);
  };

  const handleInput = useCallback((type, value) => {
    setField(state => ({...state, [type]: value}));
  }, []);

  const handleRadioButton = val => {
    setField(state => ({...state, activity: val}));
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
          <View>
            <Image
              source={require('../../assets/icons/timbangan.png')}
              style={styles.icon}
            />
          </View>
          <View style={styles.title}>
            <Text style={[FONTS.textBold14, {color: COLORS.white}]}>
              Body Mass Index (BMI)
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
            title="Tingkat Aktivitas"
            onPress={handleRadioButton}
            radio1="Sedang"
            radio2="Berat"
            selected={field.activity}
          />
          <MainButton
            title="Hitung"
            style={styles.button}
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
              source={require('../../assets/images/woman.png')}
              onPress={() => handleNavigation('WeightCalculator')}
              backgroundColor={COLORS.blue}
              title="Massa Tubuh Ideal (BMR)"
              description="Hitung berat badan ideal yang sesuai untuk kesehatan anda."
            />
            <CalculatorItem
              source={require('../../assets/images/woman.png')}
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
            <TouchableNativeFeedback>
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
          <View style={styles.margin}>
            <CalculatorItem
              source={require('../../assets/images/woman.png')}
              onPress={() => handleNavigation('WeightCalculator')}
              backgroundColor={COLORS.primary}
              title="Ayo ikutan Quiz!"
              description="Uji pengetahuanmu dengan quiz
              kesehatan dari mammaSIP."
            />
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
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 52,
  },
  icon: {height: 70, width: 70, marginRight: 16},
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

export default CaloriesScreen;