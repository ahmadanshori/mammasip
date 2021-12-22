import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {MainButton, QuestionButton, OutlineButton} from '../Buttons';

const Question3 = ({onPress, selected}) => {
  const [select, setSelect] = useState(selected);
  const handleButton = val => {
    if (select) {
      onPress(val, 'page3', select === 2 ? true : false, 'pick3', select);
    }
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/buah.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.padding}>
          <Text
            style={[FONTS.textBold14, {color: COLORS.black, marginBottom: 8}]}>
            Berapa banyak buah yang rata-rata Anda konsumsi dalam sehari?
          </Text>
          <Text style={[FONTS.text12, {color: COLORS.black, marginBottom: 16}]}>
            Gambar diatas sebagai acuan porsi standard
          </Text>
          <QuestionButton
            selected={select === 1 ? true : false}
            title="0 hingga 1 buah per hari"
            onPress={() => setSelect(1)}
          />
          <QuestionButton
            selected={select === 2 ? true : false}
            title="2 atau lebih buah per hari"
            onPress={() => setSelect(2)}
          />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <MainButton
          title="Kembali"
          left
          onPress={() => onPress(2)}
          style={styles.halfButton}
        />
        <OutlineButton
          title="Selanjutnya"
          right
          onPress={() => handleButton(4)}
          disable={!select}
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

export default Question3;
