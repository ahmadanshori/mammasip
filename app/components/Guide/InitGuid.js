import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {SIZES, FONTS, COLORS} from '../../constants';
import {MainButton} from '../Buttons';

const InitGuid = ({onPress, groupActive}) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={
            groupActive === 1
              ? require('../../assets/images/guide1.png')
              : groupActive === 2
              ? require('../../assets/images/guide2.png')
              : require('../../assets/images/guide3.png')
          }
          style={styles.img}
          resizeMode="contain"
        />
        <Text
          style={[
            FONTS.textBold16,
            {color: COLORS.primary, textAlign: 'center'},
          ]}>
          {groupActive === 1
            ? 'Perhatikan waktu, kebiasaan & posisi anda!'
            : groupActive === 2
            ? 'Lakukan perabaan payudara dengan cara yang dicontohkan pada video di awal.'
            : 'Saat ini payudara Sahabat MammaSIP aman. Ulangi SADARI 1 bulan lagi ya, dan jangan lupa SADANIS setahun sekali.'}
        </Text>
        {groupActive === 3 ? (
          <>
            <View style={styles.row}>
              <View style={styles.number}>
                <Text style={[FONTS.textBold14, {color: COLORS.white}]}>1</Text>
              </View>
              <Text style={[FONTS.text14, {flex: 1}]}>
                Anda dapat melakukannya sambil mandi dengan dibantu sabun supaya
                lebih mudah karena licin
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.number}>
                <Text style={[FONTS.textBold14, {color: COLORS.white}]}>1</Text>
              </View>
              <Text style={[FONTS.text14, {flex: 1}]}>
                Anda dapat melakukannya sambil berbaring terlentang. Jika
                payudara Anda berukuran besar, ganjal punggung di belakang
                payudara dengan bantal
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.number}>
                <Text style={[FONTS.textBold14, {color: COLORS.white}]}>1</Text>
              </View>
              <Text style={[FONTS.text14, {flex: 1}]}>
                Raba payudara Anda menggunakan jari-jari Anda dengan cara
                menekan dengan tekanan yang cukup untuk merasakan bagian dalam
                payudara.
              </Text>
            </View>
          </>
        ) : null}
      </View>
      <View style={styles.button}>
        <MainButton title={'Selanjutnya'} right onPress={onPress} />
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
  img: {height: SIZES.width2, width: SIZES.width2, marginBottom: 16},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  number: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: COLORS.lightBlue,
    marginRight: 16,
  },
  button: {padding: 16},
});

export default InitGuid;
