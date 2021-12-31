import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {MainButton} from '../Buttons';
// import Reminder from '../Reminder';
import {dropdownalert} from '../AlertProvider';
import {FONTS, COLORS} from '../../constants';
import formatDate from '../../libs/formatDate';
import {AppContext} from '../../index';
import {updateSadariDoneAPI} from '../../api/journal';

const Sadari = ({data, flag, onPress, getInitialData}) => {
  const {token, setLoading} = useContext(AppContext);
  const [isDate, setIsDate] = useState(false);
  const onChange = async (event, selectedDate) => {
    setIsDate(false);
    if (selectedDate) {
      setLoading(true);
      try {
        const postData = {
          tanggal_sadari: formatDate(selectedDate, 'yyyy-MM-dd  kk:mm:ss'),
        };
        await updateSadariDoneAPI(token, data[0]?.id_jurnal_sadari, postData);
        getInitialData();
      } catch (e) {
        dropdownalert.alertWithType('error', '', e.data.message);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View>
      {flag ? (
        <>
          <View style={styles.box}>
            <View style={styles.justify}>
              <View>
                <Text style={FONTS.text12}>Kondisi</Text>
                <Text style={[FONTS.textBold14, {color: COLORS.primary}]}>
                  {data[0].status_teratur === 1 ? 'Rutin Haid' : 'Menopause'}
                </Text>
              </View>
              {!data[0].tanggal_sadari ? (
                <TouchableOpacity style={styles.changeButton} onPress={onPress}>
                  <Text style={[FONTS.textBold12, {color: COLORS.lightBlue}]}>
                    Ganti
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.marginTop}>
              <Text style={FONTS.text12}>
                Tanggal{' '}
                {data[0].status_teratur === 1
                  ? 'Haid Pertama'
                  : 'Pengingat SADARI'}
              </Text>
              <Text style={[FONTS.textBold14, {color: COLORS.primary}]}>
                {formatDate(data[0].tgl_pertama_haid)}
              </Text>
            </View>
          </View>
          {data[0].tanggal_sadari ? (
            <View>
              <View style={styles.hebatBox}>
                <View style={styles.hebat}>
                  <View style={styles.icon}>
                    <Ionicons
                      name="checkmark-circle"
                      size={28}
                      color={'#1CC137'}
                    />
                  </View>
                  <View>
                    <Text style={[FONTS.textBold14, {color: COLORS.white}]}>
                      Hebat Sahabat MammaSIP
                    </Text>
                    <Text style={[FONTS.text12, {color: COLORS.white}]}>
                      Kamu sudah melakukan SADARI pada :
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 16}}>
                  <Text
                    style={[
                      FONTS.text12,
                      {color: COLORS.white, marginBottom: 4},
                    ]}>
                    Tangal SADARI
                  </Text>
                  <Text style={[FONTS.textBold14, {color: COLORS.white}]}>
                    {formatDate(data[0].tanggal_sadari)}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.sadariBox}>
              <Text style={[FONTS.textBold14, {color: COLORS.white}]}>
                Sudah Melakukan SADARI?
              </Text>
              <Text
                style={[FONTS.text12, {color: COLORS.white, marginTop: 12}]}>
                Yuk masukan tanggal kamu melakukan SADARI kali ini.{' '}
                <Text style={[FONTS.textBold12, {color: COLORS.white}]}>
                  (!) Setelah memasukan tanggal tidak dapat mengubah nya
                  kembali.
                </Text>
              </Text>
              <TouchableOpacity
                style={styles.sadariButton}
                onPress={() => setIsDate(true)}>
                <Ionicons name="calendar" size={20} color={COLORS.primary} />
                <Text
                  style={[
                    FONTS.textBold14,
                    {color: COLORS.primary, marginLeft: 8},
                  ]}>
                  Masukan Tanggal SADARI
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* <Reminder time={time} title="Reminder Aktif" /> */}
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
            title="Atur tanggal haid pertama"
            backgroundColor={COLORS.secondary}
            onPress={onPress}
          />
        </>
      )}
      {isDate ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      ) : null}
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
    marginTop: 24,
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
  sadariBox: {
    padding: 16,
    backgroundColor: '#701E70',
    marginTop: 16,
    borderRadius: 6,
  },
  sadariButton: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 24,
    marginBottom: 8,
  },
  hebatBox: {
    backgroundColor: '#1CC137',
    padding: 16,
    borderRadius: 6,
    marginTop: 16,
  },
  hebat: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderColor: COLORS.white,
  },
  icon: {
    padding: 6,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    marginRight: 16,
  },
});

export default Sadari;
