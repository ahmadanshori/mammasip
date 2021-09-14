import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {OutlineButton} from '../Buttons';
import {COLORS, FONTS, SIZES} from '../../constants';

const data = [
  {id: 1, active: false},
  {id: 2, active: true},
  {id: 3, active: false},
];
const ImportantLink = ({onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <Icon name="link" size={20} style={styles.icon} />
          <Text style={FONTS.textBold14}>Tautan Penting</Text>
        </View>
        <Text
          style={[
            FONTS.text12,
            {color: COLORS.primary, paddingVertical: 6, paddingLeft: 8},
          ]}>
          Lihat Semua
        </Text>
      </View>
      {data.map(item => (
        <View style={styles.box} key={item.id}>
          <View style={{flex: 1}}>
            <Text style={FONTS.textBold12} numberOfLines={1}>
              Kesehatan diri & pola makan sehat
            </Text>
            <Text
              style={[FONTS.textBold10, {color: COLORS.blue, marginTop: 4}]}
              numberOfLines={1}>
              https://mammasip.com/artikel/212031/kesehatan-diri-dan-pola-makan
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bookmark}
            activeOpacity={SIZES.opacity}>
            <Icon
              name={item.active ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={item.active ? COLORS.primary : COLORS.black}
            />
          </TouchableOpacity>
        </View>
      ))}
      <OutlineButton title="Lihat Semua Tautan" style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginTop: 32},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  icon: {marginRight: 8},
  body: {marginBottom: 8},
  margin: {marginBottom: 16},
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    paddingVertical: 16,
    paddingLeft: 16,
    borderRadius: 8,
    borderColor: COLORS.border,
    marginBottom: 8,
  },
  bookmark: {paddingHorizontal: 16, paddingBottom: 8},
  button: {marginTop: 16},
});
export default ImportantLink;
