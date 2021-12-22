import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../../constants';
import {MainButton} from '../Buttons';
import {CalculatorInput} from '../Inputs';

const ActivityModal = ({onClose, onAddPress}) => {
  const [activity, setActivity] = useState('Sedang');
  const [time, setTime] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleActivity = value => {
    if (activity !== value) {
      setActivity(value);
    }
  };
  const handleInput = value => {
    setTime(value);
  };
  const handleQuestion = value => {
    setIsVisible(value);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onClose}>
      <TouchableOpacity style={styles.box} activeOpacity={1}>
        <View style={styles.row}>
          <View style={styles.wrapper} />
          <View style={[styles.wrapper, {alignItems: 'center'}]}>
            <View style={styles.line} />
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.wrapper, {alignItems: 'flex-end'}]}>
            <AntDesign name="close" size={25} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        <Text style={[FONTS.textBold14, {marginVertical: 24}]}>
          Tambah aktivitas hari ini
        </Text>
        <Text style={FONTS.textBold18}>Senin, 14 Juli 2021</Text>
        <View style={styles.justify}>
          <Text style={FONTS.textBold12}>Level Aktivitas</Text>
          <Tooltip
            isVisible={isVisible}
            content={
              <>
                {activity === 'Sedang' ? (
                  <View style={styles.content}>
                    <Text style={[FONTS.textBold18, {color: COLORS.blue}]}>
                      Olahraga Sedang
                    </Text>
                    <Text style={[FONTS.text14, {textAlign: 'center'}]}>
                      Gerak namun tidak menyebabkan kehabisan nafas seperti
                      jalan cepat, berenang pelan & bermain tenis
                    </Text>
                  </View>
                ) : (
                  <View style={styles.content}>
                    <Text style={[FONTS.textBold18, {color: COLORS.primary}]}>
                      Olahraga Berat
                    </Text>
                    <Text style={[FONTS.text14, {textAlign: 'center'}]}>
                      Gerakan badan intensif dan cepat seperti lari, bersepeda
                      cepat dan aerobik / senam
                    </Text>
                  </View>
                )}
              </>
            }
            placement="top">
            <TouchableOpacity
              style={styles.contentButton}
              activeOpacity={1}
              hitSlop={{top: 8, left: 8, right: 8, bottom: 8}}
              onPressIn={() => handleQuestion(true)}
              onPressOut={() => handleQuestion(false)}>
              <AntDesign name="questioncircle" size={20} />
            </TouchableOpacity>
          </Tooltip>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            activeOpacity={activity === 'Sedang' ? 1 : SIZES.opacity}
            onPress={() => handleActivity('Sedang')}
            style={[styles.button, activity === 'Sedang' && styles.active]}>
            <Text
              style={[
                FONTS.text14,
                {color: activity === 'Sedang' ? COLORS.primary : COLORS.black},
              ]}>
              Sedang
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={activity === 'Berat' ? 1 : SIZES.opacity}
            onPress={() => handleActivity('Berat')}
            style={[styles.button, activity === 'Berat' && styles.active]}>
            <Text
              style={[
                FONTS.text14,
                {color: activity === 'Berat' ? COLORS.primary : COLORS.black},
              ]}>
              Berat
            </Text>
          </TouchableOpacity>
        </View>
        <CalculatorInput
          title="Durasi Olahraga"
          type="Menit"
          placeholder="30"
          maxLength={4}
          keyboardType="numeric"
          onChangeText={handleInput}
          value={time}
        />
        <MainButton
          title="Tambah"
          style={styles.addButton}
          disable={!time ? true : false}
          onPress={() =>
            time
              ? onAddPress({activity: activity === 'Sedang' ? '1' : '2', time})
              : {}
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.blackShadow,
    justifyContent: 'flex-end',
  },
  box: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  justify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 24,
  },
  wrapper: {width: '33%'},
  line: {height: 6, width: 60, borderRadius: 40, backgroundColor: COLORS.gray},
  content: {justifyContent: 'center', alignItems: 'center'},
  contentButton: {paddingVertical: 16, paddingLeft: 24},
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 36,
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  active: {
    backgroundColor: COLORS.shadowPrimary,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
  },
  addButton: {marginTop: 16},
});

export default ActivityModal;
