import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MainButton} from '../Buttons';
import Reminder from '../Reminder';
import {FONTS, COLORS} from '../../constants';

const Sadanis = ({time}) => {
  return (
    <View>
      <>
        <View style={styles.box}>
          <View>
            <Text style={FONTS.text12}>Kondisi</Text>
            <Text style={[FONTS.textBold14, {color: COLORS.primary}]}>
              Rutin Menstruasi
            </Text>
          </View>
          <View style={styles.changeButton}>
            <Text style={[FONTS.textBold12, {color: COLORS.lightBlue}]}>
              Ganti
            </Text>
          </View>
        </View>
        <Reminder time={time} title="Reminder Aktif" />
      </>
      {/* <View style={styles.warning}>
        <View style={styles.row}>
          <Ionicons name="alert-circle" size={20} color={COLORS.red} />
          <Text style={[FONTS.textBold12, {color: COLORS.red, marginLeft: 6}]}>
            Kapan anda terakhir kali SADANIS?
          </Text>
        </View>
        <Text style={[FONTS.text12, {color: COLORS.black, marginTop: 8}]}>
          Anda belum mengatur tanggal terakhir kali melakukan pemeriksaan
          payudara ke dokter.
        </Text>
      </View>
      <MainButton
        title="Atur tanggal terakhir SADANIS"
        backgroundColor={COLORS.secondary}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  warning: {
    backgroundColor: COLORS.lightRed,
    padding: 16,
    borderRadius: 6,
    marginVertical: 24,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginVertical: 24,
    padding: 12,
    borderRadius: 6,
    borderColor: COLORS.border,
  },

  changeButton: {
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});

export default Sadanis;
