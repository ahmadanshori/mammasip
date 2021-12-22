import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {MainButton, OutlineButton} from '../Buttons';
import {CalculatorInput} from '../Inputs';

const Question5 = ({onPress, data}) => {
  const [field, setField] = useState({
    weight: data.weight,
    height: data.height,
  });
  const handleButton = val => {
    if (field.weight || field.height) {
      onPress(val, field);
    }
  };

  const handleInput = useCallback((type, value) => {
    setField(state => ({...state, [type]: value}));
  }, []);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/timbangan4.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.padding}>
          <Text
            style={[FONTS.textBold14, {color: COLORS.black, marginBottom: 16}]}>
            Menghitung indeks massa tubuh
          </Text>

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
        </View>
      </ScrollView>
      <View style={styles.button}>
        <MainButton
          title="Kembali"
          left
          onPress={() => onPress(4)}
          style={styles.halfButton}
        />
        <OutlineButton
          title="Selanjutnya"
          right
          onPress={() => handleButton(6)}
          disable={!field.height || !field.weight}
          style={styles.halfButton}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  center: {alignItems: 'center', marginVertical: 32},
  img: {height: SIZES.width2, width: SIZES.width - 64},
  padding: {paddingHorizontal: 16},
  button: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  halfButton: {width: '48%'},
});

export default Question5;
