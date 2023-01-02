import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS} from '../../constants';
import {MainButton, OutlineButton} from '../Buttons';

const QuestionGuideDetail = ({data, groupActive, back, next}) => {
  const [active, setActive] = useState(0);

  const onBackHandler = () => {
    if (active === 0) {
      back();
    } else {
      setActive(state => state - 1);
    }
  };

  const onNextHandler = () => {
    if (data[groupActive].formulir.length === active + 1) {
      next();
      setActive(0);
    } else {
      setActive(state => state + 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <View style={styles.icon}>
            <Icon
              name="clock-time-four-outline"
              size={22}
              color={COLORS.white}
            />
          </View>
          <Text style={[FONTS.text16, {color: COLORS.black, flex: 1}]}>
            Perhatikan terlebih dulu waktu dan posisi anda!
          </Text>
        </View>
        <Text style={[FONTS.text12, {color: COLORS.primary, marginTop: 44}]}>
          Pertanyaan {data[groupActive].formulir[active].id_panduan_sadari}
        </Text>
        <Text style={[FONTS.text14, {color: COLORS.black}]}>
          {data[groupActive].formulir[active].prosedur_panduan}
        </Text>
        <View style={styles.margin}>
          {data[groupActive].formulir[active].pilihan_jawaban?.map(item => (
            <View
              key={item.value.toString()}
              style={{
                ...styles.button,
                borderColor:
                  data[groupActive].formulir[active].jawaban_user === item.value
                    ? COLORS.primary
                    : COLORS.gray,
              }}>
              <MaterialIcons
                name={
                  data[groupActive].formulir[active].jawaban_user === item.value
                    ? 'radio-button-checked'
                    : 'radio-button-off'
                }
                size={20}
                color={
                  data[groupActive].formulir[active].jawaban_user === item.value
                    ? COLORS.primary
                    : COLORS.black
                }
              />
              <Text
                style={[
                  FONTS.text12,
                  {flex: 1, color: COLORS.black, marginLeft: 8},
                ]}>
                {item.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <MainButton
          title="Kembali"
          left
          onPress={onBackHandler}
          style={styles.halfButton}
        />
        <OutlineButton
          title="Selanjutnya"
          right
          onPress={onNextHandler}
          style={styles.halfButton}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {padding: 16, flex: 1},
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.shadowPrimary,
    width: '100%',
    borderRadius: 8,
  },
  icon: {
    padding: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginRight: 8,
  },
  margin: {marginTop: 32},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  halfButton: {width: '48%'},
});

export default QuestionGuideDetail;
