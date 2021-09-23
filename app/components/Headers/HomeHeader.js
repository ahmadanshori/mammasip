import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../constants';

const HomeHeader = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={[FONTS.textBold12, {color: COLORS.white}]}>MammaSIP</Text>
      <View style={styles.row}>
        {data?.first_name ? (
          <Text style={[FONTS.text12, {color: COLORS.white, marginRight: 8}]}>
            {data.first_name} {data?.last_name}
          </Text>
        ) : null}
        {data?.image_path ? (
          <Image source={{uri: data.image_path}} style={styles.img} />
        ) : (
          <Icon name="account-circle" size={24} color={COLORS.white} />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '40%',
  },
  img: {height: 28, width: 28, borderRadius: 40},
});

export default HomeHeader;
