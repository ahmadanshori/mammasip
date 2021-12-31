import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MainButton, TitleButton} from '../Buttons';
import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';

const SkriningModal = ({onClose, onAddPress, selected}) => {
  const [activity, setActivity] = useState('Rutin Haid');
  const [isDate, setIsDate] = useState(false);
  const [date, setDate] = useState('');

  const handleActivity = value => {
    if (activity !== value) {
      setActivity(value);
    }
  };
  const onChange = (event, selectedDate) => {
    setIsDate(false);
    setDate(selectedDate);
  };

  const handleButton = () => {
    if (date) {
      if (selected === 'sadari') {
        onAddPress({
          tgl_pertama_haid: formatDate(date, 'yyyy-MM-dd 	kk:mm:ss'),
          status_teratur: activity === 'Rutin Haid' ? '1' : '2',
        });
      } else {
        onAddPress({
          tgl_sadanis: formatDate(date, 'yyyy-MM-dd 	kk:mm:ss'),
        });
      }
    }
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
          Atur reminder {selected?.toUpperCase()}
        </Text>

        {selected === 'sadari' ? (
          <>
            <View style={styles.justify}>
              <Text style={FONTS.textBold12}>Apakah Anda rutin haid ?</Text>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                activeOpacity={activity === 'Rutin Haid' ? 1 : SIZES.opacity}
                onPress={() => handleActivity('Rutin Haid')}
                style={[
                  styles.button,
                  activity === 'Rutin Haid' && styles.active,
                ]}>
                <Text
                  style={[
                    FONTS.text14,
                    {
                      color:
                        activity === 'Rutin Haid'
                          ? COLORS.primary
                          : COLORS.black,
                    },
                  ]}>
                  Rutin Haid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={activity === 'Menopause' ? 1 : SIZES.opacity}
                onPress={() => handleActivity('Menopause')}
                style={[
                  styles.button,
                  activity === 'Menopause' && styles.active,
                ]}>
                <Text
                  style={[
                    FONTS.text14,
                    {
                      color:
                        activity === 'Menopause'
                          ? COLORS.primary
                          : COLORS.black,
                    },
                  ]}>
                  Menopause
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
        <TitleButton
          title={
            selected === 'sadari'
              ? activity === 'Rutin Haid'
                ? 'Hari pertama haid bulan ini'
                : 'Tanggal yang Anda pilih untuk melakukan SADARI tiap bulan'
              : 'Hari terakhir anda melakukan SADANIS'
          }
          placeholder={formatDate(new Date())}
          onPress={() => setIsDate(true)}
          data={date ? formatDate(date) : null}
        />
        <MainButton
          title="Simpan"
          style={styles.addButton}
          disable={!date ? true : false}
          onPress={handleButton}
        />
      </TouchableOpacity>
      {isDate ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      ) : null}
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
  },
  wrapper: {width: '33%'},
  line: {height: 6, width: 60, borderRadius: 40, backgroundColor: COLORS.gray},
  content: {justifyContent: 'center', alignItems: 'center'},
  contentButton: {paddingVertical: 16, paddingLeft: 24},
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
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
  addButton: {marginTop: 32},
});

export default SkriningModal;
