import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {MainButton, QuestionButton, OutlineButton} from '../Buttons';

const Question2 = ({onPress, selected}) => {
  const [select, setSelect] = useState(selected);
  const handleButton = val => {
    if (select) {
      onPress(val, 'page2', select === 1 ? true : false, 'pick2', select);
    }
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/drink.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.padding}>
          <Text
            style={[FONTS.textBold14, {color: COLORS.black, marginBottom: 8}]}>
            Apakah anda mengkonsumsi minuman beralkohol?
          </Text>
          <Text style={[FONTS.text12, {color: COLORS.black, marginBottom: 16}]}>
            Gambar diatas sebagai acuan minuman standard perkiraan.
          </Text>
          <QuestionButton
            selected={select === 1 ? true : false}
            title="Tidak Sama Sekali atau Tidak Melebihi Standard"
            onPress={() => setSelect(1)}
          />
          <QuestionButton
            selected={select === 2 ? true : false}
            title="Ya, Melebihi Standard"
            onPress={() => setSelect(2)}
          />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <MainButton
          title="Kembali"
          left
          onPress={() => onPress(1)}
          style={styles.halfButton}
        />
        <OutlineButton
          title="Selanjutnya"
          right
          onPress={() => handleButton(3)}
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

export default Question2;
