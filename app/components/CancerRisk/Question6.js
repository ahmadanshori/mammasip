import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {MainButton, OutlineButton} from '../Buttons';
import {ActivityLevelButton} from '../RadioButton';
import {CalculatorInput} from '../Inputs';

const Question6 = ({onPress}) => {
  const [field, setField] = useState({
    time: '',
    level: 1,
  });

  const handleInput = useCallback((type, value) => {
    setField(state => ({...state, [type]: value}));
  }, []);

  const handleButton = () => {
    const {time, level} = field;
    if (time) {
      let value;
      if (
        (level === 1 && Number(time) >= 300) ||
        (level === 2 && Number(time) >= 150)
      ) {
        value = true;
      } else {
        value = false;
      }
      onPress(value, level === 1 ? 'Sedang' : 'Tinggi', field.time || null);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <View style={styles.box}>
            <Image
              resizeMode="contain"
              source={require('../../assets/images/sedang.png')}
              style={styles.img}
            />
            <Text
              style={[
                FONTS.textBold14,
                {color: COLORS.blue, textAlign: 'center', marginBottom: 6},
              ]}>
              Olahraga Sedang
            </Text>
            <Text
              style={[
                FONTS.text10,
                {color: COLORS.black, textAlign: 'center'},
              ]}>
              Gerak namun tidak menyebabkan kehabisan nafas seperti jalan cepat,
              berenang pelan & bermain tenis
            </Text>
          </View>
          <View style={styles.box}>
            <Image
              resizeMode="contain"
              source={require('../../assets/images/berat.png')}
              style={styles.img}
            />
            <Text
              style={[
                FONTS.textBold14,
                {color: COLORS.secondary, textAlign: 'center', marginBottom: 6},
              ]}>
              Olahraga Berat
            </Text>
            <Text
              style={[
                FONTS.text10,
                {color: COLORS.black, textAlign: 'center'},
              ]}>
              Gerakan badan intensif dan cepat seperti lari, bersepeda cepat dan
              aerobik / senam
            </Text>
          </View>
        </View>
        <View style={styles.padding}>
          <Text
            style={[FONTS.textBold14, {color: COLORS.black, marginBottom: 16}]}>
            Berapa lama anda olah raga tiap hari ?
          </Text>
          <CalculatorInput
            title="Durasi (menit/minggu)?"
            type="menit"
            placeholder="300"
            maxLength={3}
            keyboardType="numeric"
            onChangeText={val => handleInput('time', val)}
            value={field.time}
          />
          <ActivityLevelButton
            title="Aktivitas level?"
            onPress={val => handleInput('level', val)}
            radio1="Sedang"
            radio2="Tinggi"
            value1={1}
            value2={2}
            selected={field.level}
          />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <MainButton
          title="Kembali"
          left
          onPress={() => onPress(5)}
          style={styles.halfButton}
        />
        <OutlineButton
          title="Selesai"
          right
          onPress={handleButton}
          disable={!field.time}
          style={styles.halfButton}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    marginVertical: 32,
    flexDirection: 'row',
  },
  box: {width: '50%', alignItems: 'center', paddingHorizontal: 16},
  img: {height: SIZES.width4, width: SIZES.width4, marginBottom: 16},
  padding: {paddingHorizontal: 16},
  button: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  halfButton: {width: '48%'},
});

export default Question6;
