import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';

const ReminderModals = ({onClose, onCalendar, time, onSave}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onClose}>
      <View style={styles.box}>
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
          Atur Reminder Harian
        </Text>
        <TouchableOpacity style={styles.inputButton} onPress={onCalendar}>
          {time ? (
            <Text style={[FONTS.text14, {color: COLORS.black}]}>
              {formatDate(time, 'hh:mm')}
            </Text>
          ) : (
            <Text style={[FONTS.text14, {color: COLORS.gray}]}>
              {formatDate(new Date(), 'hh:mm')}
            </Text>
          )}
          <View>
            <AntDesign name="up" size={10} color={COLORS.gray} />
            <AntDesign name="down" size={10} color={COLORS.gray} />
          </View>
        </TouchableOpacity>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.offButton} activeOpacit={1}>
            <Text style={[FONTS.text14, {color: COLORS.red}]}>Matikan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacit={1}
            onPress={onSave}>
            <Text style={[FONTS.text14, {color: COLORS.white}]}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReminderModals;

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
  },
  wrapper: {width: '33%'},
  line: {height: 6, width: 60, borderRadius: 40, backgroundColor: COLORS.gray},
  inputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 16,
    borderRadius: 6,
    borderColor: COLORS.border,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  offButton: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 12,
    borderColor: COLORS.red,
    borderRadius: 6,
  },
  saveButton: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 6,
  },
});
