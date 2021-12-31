import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';

const ProfileHeader = ({data, onEdit}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View />
        <TouchableOpacity style={styles.edit} onPress={onEdit}>
          <MaterialIcons name="edit" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.imgWrapper}>
        {data?.image_path ? (
          <Image source={{uri: data?.image_path}} style={styles.img} />
        ) : (
          <View style={[styles.img, {backgroundColor: COLORS.lightGray}]}>
            <Ionicons
              name="image-outline"
              size={SIZES.width5 - 26}
              color={COLORS.gray}
            />
          </View>
        )}

        <Text style={[FONTS.textBold16, {color: COLORS.white}]}>
          {data?.first_name} {data?.last_name}
        </Text>
        <View style={styles.row}>
          <Ionicons
            name={data?.gender === 1 ? 'male' : 'female'}
            size={14}
            color={COLORS.white}
            style={styles.genderIcon}
          />
          <Text style={[FONTS.text10, {color: COLORS.white}]}>
            {formatDate(data?.tgl_lahir)}
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
            {data?.email}
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
            {data?.phone || '--'}
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
    justifyContent: 'center',
    alignItems: 'center',
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
