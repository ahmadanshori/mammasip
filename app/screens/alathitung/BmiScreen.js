import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {WeightCalculatorHeader} from '../../components/Headers';
import {CalculatorInput} from '../../components/Inputs';
import {MainButton} from '../../components/Buttons';
import {ActivityLevelButton} from '../../components/RadioButton';
import {COLORS, FONTS, SIZES, ICON} from '../../constants';

const WeightCalculatorScreen = ({navigation}) => {
  const [field, setField] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 1,
    exercise_level: null,
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
    const {age, weight, height} = field;
    if (age && weight && height) {
      handleNavigation('CalculationDetail', {type: 'BMI', field});
    }
  }, [field, handleNavigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: COLORS.blue}} />
      <StatusBar backgroundColor={COLORS.blue} barStyle={'light-content'} />
      <WeightCalculatorHeader
        title="Kenali Diri Anda"
        onPressBack={() => navigation.goBack()}
        backgroundColor={COLORS.blue}
      />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <ICON.imt width={80} height={80} />
          </View>
          <View style={styles.title}>
            <Text style={[FONTS.textBold14, {color: COLORS.white}]}>
              Alat Pengukur Indeks Massa Tubuh
            </Text>

            <Text style={[FONTS.text10, {color: COLORS.white, marginTop: 4}]}>
              <Text
                style={[
                  FONTS.text10,
                  {color: COLORS.white, marginTop: 4, fontStyle: 'italic'},
                ]}>
                Body Mass Index
              </Text>{' '}
              (BMI) atau Indeks Massa Tubuh (IMT) adalah parameter yang
              digunakan untuk menghitung berat badan seseorang. Melalui
              perhitungan ini, akan diketahui apakah berat badan Anda tergolong
              normal, kurang, atau berlebih
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
          {/* <InputButton
            placeholder={'Pilih Durasi'}
            title={'Durasi Olahraga Kamu'}
            data={selected?.title}
            onPress={() =>
              handleNavigation('Duration', {updateDuration, selected})
            }
          /> */}
          <MainButton
            title="Hitung"
            style={styles.button}
            onPress={handleCalculation}
            disable={!field.age || !field.height || !field.weight}
          />
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
    backgroundColor: COLORS.blue,
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
  divider: {
    height: 6,
    width: 65,
    backgroundColor: COLORS.separator,
    borderRadius: 8,
  },
  button: {marginTop: 24},
});

export default WeightCalculatorScreen;
