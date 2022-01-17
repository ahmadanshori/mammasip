import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, SIZES} from '../../constants';

const HomeHeader = ({onPress}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[FONTS.textBold16, {color: COLORS.white}]}>
          Pesan Penting
        </Text>
        <Text style={[FONTS.text10, {color: COLORS.white}]}>
          Dari tokoh publik dan pemuka Agama.
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={SIZES.opacity}
            onPress={onPress}>
            <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
              Lihat Video
            </Text>
            <Icon name="play" size={25} color={COLORS.primary} />
          </TouchableOpacity>
          <View />
        </View>
      </View>
      <Image
        source={require('../../assets/images/owner.png')}
        resizeMode="contain"
        style={styles.img}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -70,
  },
  row: {flexDirection: 'row'},
  button: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 16,
  },
  img: {
    height: 100,
    width: 100,
  },
});

export default HomeHeader;
