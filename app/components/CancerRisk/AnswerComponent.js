import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const AnswerComponent = ({
  source,
  number,
  title,
  condition,
  isTrue,
  answer,
  imt,
  activity,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.justify}>
        <View style={styles.flex}>
          <Text style={[FONTS.text12, {color: COLORS.primary}]}>
            Pertanyaan {number}
          </Text>
          <Text style={[FONTS.textBold14, {color: COLORS.black}]}>{title}</Text>
          <Text style={[FONTS.text12, {color: COLORS.gray, marginTop: 8}]}>
            Jawab
          </Text>
          {answer ? (
            <Text
              style={[
                FONTS.textBold12,
                {color: isTrue ? COLORS.green : COLORS.red},
              ]}>
              {answer}
            </Text>
          ) : null}
          {activity ? (
            <Text style={[FONTS.textBold12, {color: COLORS.blue}]}>
              Aktivitas Level : {activity}
            </Text>
          ) : null}
          {imt ? (
            <Text style={[FONTS.textBold12, {color: COLORS.blue}]}>{imt}</Text>
          ) : null}
        </View>
        <Image resizeMode="contain" source={source} style={styles.logo} />
      </View>
      {isTrue ? (
        <View style={styles.sehat}>
          <Image
            source={require('../../assets/images/sehat.png')}
            style={styles.img}
          />
          <View>
            <Text
              style={[
                FONTS.textBold12,
                {color: COLORS.green, marginBottom: 4},
              ]}>
              Keren sahabat mammaSIP
            </Text>
            <Text style={[FONTS.text12, {color: COLORS.gray}]}>
              Pertahankan gaya hidup yang sehat
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.sakit}>
          <Image
            source={require('../../assets/images/sakit.png')}
            style={styles.img}
          />
          <View style={styles.flex}>
            <Text
              style={[FONTS.textBold12, {color: COLORS.red, marginBottom: 4}]}>
              Perbaiki yuk, Sayangi dirimu!
            </Text>
            <Text style={[FONTS.text12, {color: COLORS.gray}]}>
              Gaya hidup yang buruk dapat memperbesar resiko kanker.
            </Text>
          </View>
        </View>
      )}
      <Text
        style={[
          FONTS.textBold16,
          {color: COLORS.black, marginTop: 16, marginBottom: 8},
        ]}>
        Kondisi
      </Text>
      <Text style={[FONTS.text14, {color: COLORS.black}]}>{condition}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16},
  justify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {height: 60, width: 60, marginRight: 16},
  sakit: {
    backgroundColor: '#FFECEC',
    padding: 16,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  logo: {height: 80, width: 80},
  sehat: {
    backgroundColor: '#E2FCE6',
    padding: 16,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  flex: {flex: 1},
});

export default AnswerComponent;
