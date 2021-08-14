import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import IconCamera from 'react-native-vector-icons/FontAwesome';

import {COLORS, SIZES, FONTS} from '../constants';

const PhotoProfile = ({source, onPress}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.imgWrapper}
        activeOpacity={SIZES.opacity}
        onPress={onPress}>
        <View style={styles.circle}>
          <View style={styles.iconWrapper}>
            <IconCamera name="camera" size={30} color={COLORS.gray} />
          </View>
          {source?.path ? (
            <Image
              resizeMode="contain"
              source={{uri: source.path}}
              style={styles.img}
            />
          ) : null}
        </View>
      </TouchableOpacity>
      <Text style={[FONTS.text10, styles.text]}>Foto Profil</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  imgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: SIZES.width4,
    width: SIZES.width4,
    borderRadius: SIZES.width4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
  },
  img: {
    height: SIZES.width4,
    width: SIZES.width4,
    borderRadius: SIZES.width4,
  },
  text: {color: COLORS.black, marginTop: 8},
});

export default PhotoProfile;
