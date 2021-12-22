import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import {MainButton, OutlineButton} from '../Buttons';
import InputButton from '../Buttons/TitleButton';
import {CalculatorInput} from '../Inputs';

const Question6 = ({onPress, onPressBack}) => {
  const [field, setField] = useState({
    time: '',
    level: null,
    title: '',
  });
  const [isActivity, setIsActivity] = useState(false);

  const handleInput = useCallback((type, value) => {
    setField(state => ({...state, [type]: value}));
  }, []);

  const handleButton = () => {
    const {time, level, title} = field;
    if (time && level) {
      let value;
      if (
        (level === 2 && Number(time) >= 150) ||
        (level === 3 && Number(time) >= 75)
      ) {
        value = true;
      } else {
        value = false;
      }
      onPress(value, title, field.time);
    }
  };

  const onActivity = () => {
    setIsActivity(true);
  };

  const handleActivity = value => {
    setIsActivity(false);
    setField(state => ({...state, ...value}));
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          contentContainerStyle={styles.center}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={styles.imgWrapper}>
            <Image
              resizeMode="contain"
              source={require('../../assets/images/ringan.png')}
              style={styles.img}
            />
            <Text
              style={[
                FONTS.textBold14,
                {color: COLORS.green, textAlign: 'center', marginBottom: 6},
              ]}>
              Tidak Olahraga / Ringan
            </Text>
            <Text
              style={[
                FONTS.text10,
                {color: COLORS.black, textAlign: 'center'},
              ]}>
              Tidak pernah melakukan olahraga atau beraktivitas fisik yang saat
              melakukannya masih bisa sambil bernyanyi.
            </Text>
          </View>
          <View style={styles.imgWrapper}>
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
              Masih bisa diajak berbicara normal namun tidak akan sanggup
              bernyanyi (terengah-engah).
            </Text>
          </View>
          <View style={styles.imgWrapper}>
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
              Olahraga yang pada saat melakukannya tidak bisa diajak berbicara
              normal (terengah-engah).
            </Text>
          </View>
        </ScrollView>
        <View style={styles.padding}>
          <Text
            style={[FONTS.textBold14, {color: COLORS.black, marginBottom: 16}]}>
            Berapa lama Anda olahraga tiap minggu ?
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
          <InputButton
            placeholder={'Pilih aktivitas level'}
            title={'Aktivitas level?'}
            data={field?.title}
            onPress={onActivity}
          />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <MainButton
          title="Kembali"
          left
          onPress={onPressBack}
          style={styles.halfButton}
        />
        <OutlineButton
          title="Selesai"
          right
          onPress={handleButton}
          disable={!field.time || !field?.level}
          style={styles.halfButton}
        />
      </View>
      {isActivity ? (
        <TouchableOpacity
          style={styles.modal}
          activeOpacity={1}
          onPress={() => setIsActivity(false)}>
          <TouchableOpacity style={styles.box} activeOpacity={1}>
            <View style={styles.titleBox}>
              <Text
                style={[
                  FONTS.textBold16,
                  {color: COLORS.black, textAlign: 'center'},
                ]}>
                Aktivitas level
              </Text>
            </View>
            <TouchableOpacity
              style={styles.selectButton}
              activeOpacity={SIZES.opacity}
              onPress={() =>
                handleActivity({level: 1, title: 'Aktivitas level'})
              }>
              <Text style={[FONTS.text14, {color: COLORS.white}]}>
                Tidak Olahraga / Ringan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectButton}
              activeOpacity={SIZES.opacity}
              onPress={() => handleActivity({level: 2, title: 'Sedang'})}>
              <Text style={[FONTS.text14, {color: COLORS.white}]}>Sedang</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectButton}
              activeOpacity={SIZES.opacity}
              onPress={() => handleActivity({level: 3, title: 'Berat'})}>
              <Text style={[FONTS.text14, {color: COLORS.white}]}>Berat</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    // marginVertical: 32,
    // flexDirection: 'row',
    marginVertical: 24,
  },
  imgWrapper: {
    width: SIZES.width1 - 24,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  img: {height: SIZES.width3, width: SIZES.width3, marginBottom: 16},
  padding: {paddingHorizontal: 16},
  button: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  halfButton: {width: '48%'},
  modal: {
    height: SIZES.height,
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: COLORS.blackShadow,
    paddingHorizontal: 16,
  },
  box: {
    backgroundColor: COLORS.white,
    width: '100%',
    padding: 16,
    borderRadius: 8,
  },
  titleBox: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.separator,
  },
  selectButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});

export default Question6;
