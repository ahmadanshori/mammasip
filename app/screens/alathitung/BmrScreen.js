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
import InputButton from '../../components/Buttons/TitleButton';
import {COLORS, FONTS, ICON, SIZES} from '../../constants';

const BmrScreen = ({navigation}) => {
  const [field, setField] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 1,
    exercise_level: null,
  });
  const [selected, setSelected] = useState(null);

  const updateDuration = event => {
    setSelected(event);
    setField(state => ({...state, exercise_level: event.id}));
  };

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

  const handleCalculation = useCallback(async () => {
    const {age, weight, height, exercise_level} = field;
    if ((age && weight && height, exercise_level)) {
      handleNavigation('CalculationDetail', {type: 'BMR', field});
    }
  }, [field, handleNavigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: COLORS.secondary}} />
      <StatusBar
        backgroundColor={COLORS.secondary}
        barStyle={'light-content'}
      />
      <WeightCalculatorHeader
        title="Kenali Diri Anda"
        onPressBack={() => navigation.goBack()}
        backgroundColor={COLORS.secondary}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <ICON.bmr width={80} height={80} />
          </View>
          <View style={styles.title}>
            <Text style={[FONTS.textBold14, {color: COLORS.white}]}>
              Alat Pengukur Kebutuhan Kalori
            </Text>
            <Text style={[FONTS.text10, {color: COLORS.white, marginTop: 4}]}>
              <Text
                style={[
                  FONTS.text10,
                  {color: COLORS.white, marginTop: 4, fontStyle: 'italic'},
                ]}>
                Basal Metabolic Rate
              </Text>{' '}
              (BMR) adalah kebutuhan kalori minimal yang dipakai organ-organ
              tubuh untuk melakukan tugas dasarnya. Dengan memenuhi kebutuhan
              kalori harian, tubuh dapat tumbuh dan berfungsi dengan baik.
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
          <InputButton
            placeholder={'Pilih Durasi'}
            title={'Durasi Olahraga Kamu'}
            data={selected?.title}
            onPress={() =>
              handleNavigation('Duration', {updateDuration, selected})
            }
          />
          <MainButton
            title="Hitung"
            style={styles.button}
            onPress={handleCalculation}
            disable={
              !field.age ||
              !field.height ||
              !field.weight ||
              !field.exercise_level
            }
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

  divider: {
    height: 6,
    width: 65,
    backgroundColor: COLORS.separator,
    borderRadius: 8,
  },
  button: {marginTop: 24},
});

export default BmrScreen;
