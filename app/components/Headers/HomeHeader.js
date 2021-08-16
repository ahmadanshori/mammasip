import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../constants';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={[FONTS.textBold12, {color: COLORS.white}]}>
        Selamat datang di MammaSIP
      </Text>
      <View style={styles.row}>
        <Text style={[FONTS.text10, {color: COLORS.white, marginRight: 8}]}>
          ayla
        </Text>
        <Icon name="account-circle" size={24} color={COLORS.white} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '40%',
  },
});

export default HomeHeader;
