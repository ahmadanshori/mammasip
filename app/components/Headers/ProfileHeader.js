import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View />
        <TouchableOpacity style={styles.edit}>
          <MaterialIcons name="edit" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.imgWrapper}>
        <Image
          source={require('../../assets/images/profile.jpg')}
          style={styles.img}
        />
        <Text style={[FONTS.textBold16, {color: COLORS.white}]}>
          Viora Sukma
        </Text>
        <View style={styles.row}>
          <Ionicons
            name="female"
            size={14}
            color={COLORS.white}
            style={styles.genderIcon}
          />
          <Text style={[FONTS.text10, {color: COLORS.white}]}>
            17 Agustus 1945
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.wrapper}>
          <MaterialIcons
            name="mail-outline"
            size={14}
            color={COLORS.white}
            style={styles.margin}
          />
          <Text style={[FONTS.text10, {color: COLORS.white}]}>
            viorasukma@gmail.com
          </Text>
        </View>
        <View style={styles.wrapper}>
          <MaterialIcons
            name="phone"
            size={14}
            color={COLORS.white}
            style={styles.margin}
          />
          <Text style={[FONTS.text10, {color: COLORS.white}]}>
            +6281234567890
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  edit: {paddingLeft: 16, paddingRight: 8, paddingBottom: 16},
  imgWrapper: {justifyContent: 'center', alignItems: 'center'},
  img: {
    height: SIZES.width4,
    width: SIZES.width4,
    borderRadius: SIZES.width4,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  margin: {marginRight: 8},
  genderIcon: {marginRight: 6},
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 28,
  },
});

export default ProfileHeader;
