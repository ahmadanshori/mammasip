import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../constants';

const JournalItem = () => {
  return (
    <View style={styles.container} activeOpacity={1}>
      <View style={styles.title}>
        <Text style={FONTS.text12}>
          Sudah mengisi jurnal bulan{' '}
          <Text style={FONTS.textBold12}>Agustus</Text>
        </Text>
        <Icon
          name="checkcircle"
          size={16}
          color={'#1CC137'}
          style={styles.left}
        />
      </View>
      <View style={styles.row}>
        <Icon
          name="calendar"
          size={16}
          color={COLORS.primary}
          style={styles.icon}
        />
        <Text style={[FONTS.text14, {color: COLORS.gray}]}>
          Ditulis pada 18 Agu 2022 18:31
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FBFBFB',
    marginTop: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  title: {flexDirection: 'row', alignItems: 'center'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  icon: {marginRight: 8},
  left: {marginLeft: 8},
});

export default JournalItem;
