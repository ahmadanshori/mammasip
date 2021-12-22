import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {MainButton, QuestionButton} from '../Buttons';

const Question1 = ({onPress, selected}) => {
  const [select, setSelect] = useState(selected);
  const handleButton = () => {
    if (select) {
      onPress(2, 'page1', select === 2 ? true : false, 'pick1', select);
    }
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/roko.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.padding}>
          <Text
            style={[FONTS.textBold14, {color: COLORS.black, marginBottom: 16}]}>
            Apakah Anda merokok?
          </Text>
          <QuestionButton
            selected={select === 1 ? true : false}
            title="Ya"
            onPress={() => setSelect(1)}
          />
          <QuestionButton
            selected={select === 2 ? true : false}
            title="Tidak"
            onPress={() => setSelect(2)}
          />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <MainButton
          title="Selanjutnya"
          right
          onPress={handleButton}
          disable={!select}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  center: {alignItems: 'center', marginVertical: 32},
  img: {height: SIZES.width2, width: SIZES.width2},
  padding: {paddingHorizontal: 16},
  button: {padding: 16},
});

export default Question1;
