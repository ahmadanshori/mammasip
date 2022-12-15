import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {SIZES, FONTS, COLORS} from '../../constants';
import {OutlineButton} from '../Buttons';

const ResultGuide = ({finishResult, onBack}) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={
            finishResult
              ? require('../../assets/images/woman.png')
              : require('../../assets/images/result.png')
          }
          style={styles.img}
          resizeMode="contain"
        />
        <Text
          style={[
            FONTS.textBold16,
            {color: COLORS.black, textAlign: 'center', marginVertical: 16},
          ]}>
          {finishResult
            ? 'Keren Sahabat MammaSIP Jaga selalu kesehatanya!'
            : 'Segera periksakan diri anda ke tenaga kesehatan terdekat!'}
        </Text>
        <Text
          style={[FONTS.text12, {color: COLORS.black, textAlign: 'center'}]}>
          {finishResult
            ? 'Selalu perhatikan waktu & kebiasaan. Jangan lupa untuk rutin melakukan SADARI & SADANIS.'
            : 'Anda sebaiknya memeriksakan payudara ke tenaga kesehatan terdekat untuk memastikan kesehatan Anda.'}
        </Text>
      </View>
      <View style={styles.button}>
        <OutlineButton title={'Tutup'} onPress={onBack} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  img: {height: SIZES.width2, width: SIZES.width2},
  button: {padding: 16},
});

export default ResultGuide;
