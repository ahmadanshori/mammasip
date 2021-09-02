import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';

const VideoItem = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <Image
        source={{uri: 'https://www.w3schools.com/w3css/img_snowtops.jpg'}}
        style={styles.img}
      />
      <View style={styles.shadowImg}>
        <TouchableOpacity style={styles.bookmark}>
          <Icon name="bookmark-outline" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <Icon name="play-circle" size={40} color={COLORS.white} />
      </View>
      <View style={styles.body}>
        <Text style={[FONTS.textBold10, {color: COLORS.black}]}>
          Jenis dan Stadium penyakit Kanker Payudara.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: SIZES.width3 + 24,
    borderRadius: 8,
    marginRight: 8,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width3 + 24,
    width: SIZES.width3 + 24,
    borderRadius: 8,
  },
  shadowImg: {
    height: SIZES.width3 + 24,
    width: SIZES.width3 + 24,
    backgroundColor: COLORS.shadowPrimary,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 99,
  },
  bookmark: {position: 'absolute', top: 0, right: 0, padding: 8},
  body: {paddingHorizontal: 4, paddingVertical: 8},
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: COLORS.lightPrimary,
    borderRadius: 10,
  },
});

export default VideoItem;
