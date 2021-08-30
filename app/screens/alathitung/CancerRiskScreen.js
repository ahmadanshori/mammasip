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
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    gender: 'Perempuan',
  });

  const handleNavigation = type => {
    navigation.navigate(type);
  };

  const handleInput = useCallback((type, value) => {
    setField(state => ({...state, [type]: value}));
  }, []);

  const handleRadioButton = val => {
    setField(state => ({...state, gender: val}));
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
          <View>
            <Image
              source={require('../../assets/icons/timbangan.png')}
              style={styles.icon}
            />
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
            title="Tingkat Aktivitas"
            onPress={handleRadioButton}
            radio1="Perempuan"
            radio2="Laki-laki"
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
            onPress={() => handleNavigation('CancerQuestion')}
            disable={!field.gender || !field.age}
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
              onPress={() => handleNavigation('Calories')}
              backgroundColor={COLORS.secondary}
              title="Kebutuhan Kalori Harian (BMI)"
              description="Sudahkan konsumsi makanan memenuhi kebutuhan kalori harian anda?"
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
    backgroundColor: COLORS.red,
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
