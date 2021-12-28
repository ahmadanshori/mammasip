import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MainButton} from '../Buttons';
// import Reminder from '../Reminder';
import {FONTS, COLORS} from '../../constants';
import formatDate from '../../libs/formatDate';

const Sadanis = ({flag, data, onPress}) => {
  return (
    <View>
      {flag ? (
        <>
          <View style={styles.box}>
            <View>
              <Text style={FONTS.text12}>Tanggal terakhir ke dokter</Text>
              <Text style={[FONTS.textBold14, {color: COLORS.green}]}>
                {formatDate(data[0].tgl_sadanis)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.changeButton}
              activeOpacity={1}
              onPress={onPress}>
              <Text style={[FONTS.textBold12, {color: COLORS.lightBlue}]}>
                Ganti
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Reminder time={time} title="Reminder Aktif" /> */}
        </>
      ) : (
        <>
          <View style={styles.warning}>
            <View style={styles.row}>
              <Ionicons name="alert-circle" size={20} color={COLORS.red} />
              <Text
                style={[FONTS.textBold12, {color: COLORS.red, marginLeft: 6}]}>
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
            onPress={onPress}
          />
        </>
      )}
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
