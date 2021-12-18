import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {MainButton, QuestionButton, OutlineButton} from '../Buttons';

const Question4 = ({onPress, selected}) => {
  const [select, setSelect] = useState(selected);
  const handleButton = val => {
    if (select) {
      onPress(val, 'page4', select === 2 ? true : false, 'pick4', select);
    }
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/sayur.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.padding}>
          <Text
            style={[FONTS.textBold14, {color: COLORS.black, marginBottom: 8}]}>
            Berapa banyak sayur yang rata-rata anda konsumsi dalam sehari?
          </Text>
          <Text style={[FONTS.text12, {color: COLORS.black, marginBottom: 16}]}>
            Gambar diatas sebagai acuan porsi standard
          </Text>
          <QuestionButton
            selected={select === 1 ? true : false}
            title="0 hingga 1 porsi per hari"
            onPress={() => setSelect(1)}
          />
          <QuestionButton
            selected={select === 2 ? true : false}
            title="2 porsi atau lebih per hari"
            onPress={() => setSelect(2)}
          />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <MainButton
          title="Kembali"
          left
          onPress={() => onPress(3)}
          style={styles.halfButton}
        />
        <OutlineButton
          title="Selanjutnya"
          right
          onPress={() => handleButton(5)}
          disable={!select}
          style={styles.halfButton}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  center: {alignItems: 'center', marginVertical: 32},
  img: {height: SIZES.width2, width: SIZES.width},
  padding: {paddingHorizontal: 16},
  button: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  halfButton: {width: '48%'},
});

export default Question4;
