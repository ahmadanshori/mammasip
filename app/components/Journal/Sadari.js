import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MainButton} from '../Buttons';
import Reminder from '../Reminder';
import {FONTS, COLORS} from '../../constants';

const Sadari = ({time, data}) => {
  return (
    <View>
      {data ? (
        <>
          <View style={styles.box}>
            <View style={styles.justify}>
              <View>
                <Text style={FONTS.text12}>Kondisi</Text>
                <Text style={[FONTS.textBold14, {color: COLORS.primary}]}>
                  Rutin Menstruasi
                </Text>
              </View>
              <TouchableOpacity style={styles.changeButton}>
                <Text style={[FONTS.textBold12, {color: COLORS.lightBlue}]}>
                  Ganti
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.marginTop}>
              <Text style={FONTS.text12}>Tgl pertama menstruasi bulan ini</Text>
              <Text style={[FONTS.textBold14, {color: COLORS.primary}]}>
                12 Juli 2021
              </Text>
            </View>
          </View>
          <Reminder time={time} title="Reminder Aktif" />
        </>
      ) : (
        <>
          <View style={styles.warning}>
            <View style={styles.row}>
              <Ionicons name="alert-circle" size={20} color={COLORS.red} />
              <Text
                style={[FONTS.textBold12, {color: COLORS.red, marginLeft: 6}]}>
                Kapan anda haid pertama bulan ini?
              </Text>
            </View>
            <Text style={[FONTS.text12, {color: COLORS.black, marginTop: 8}]}>
              Anda belum mengatur tanggal haid pertama untuk bulan ini, yuk atur
              dulu untuk menentukan jadwalmu.
            </Text>
          </View>
          <MainButton
            title="Atur tanggal mens, pertama"
            backgroundColor={COLORS.secondary}
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
  box: {
    borderWidth: 1,
    marginVertical: 24,
    padding: 12,
    borderRadius: 6,
    borderColor: COLORS.border,
  },
  justify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  changeButton: {
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  marginTop: {marginTop: 16},
});

export default Sadari;