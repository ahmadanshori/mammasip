import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';

const VideoDetailItem = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <View>
        <Image
          source={{uri: 'https://www.w3schools.com/w3css/img_snowtops.jpg'}}
          style={styles.img}
        />
        <View style={styles.shadowImg}>
          <View style={styles.circleIcon}>
            <Icon
              name="play-circle"
              size={35}
              color={COLORS.white}
              style={{marginLeft: 2}}
            />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={FONTS.textBold14}>
          Jenis dan Stadium penyakit Kanker Payudara.
        </Text>
        <View style={styles.row}>
          <Text style={[FONTS.text10, {color: COLORS.gray}]}>12 Sep 2021</Text>
          <View style={styles.category}>
            <Text style={[FONTS.textBold10, {color: COLORS.gray}]}>
              Olahraga
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={{paddingHorizontal: 4}}>
        <Icon name="bookmark-outline" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    marginBottom: 16,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width5,
    width: SIZES.width5,
    borderRadius: 8,
  },
  shadowImg: {
    height: SIZES.width5,
    width: SIZES.width5,
    // backgroundColor: COLORS.shadowPrimary,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 99,
  },
  circleIcon: {
    backgroundColor: COLORS.shadowWhite,
    borderRadius: 50,
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmark: {position: 'absolute', top: 0, right: 0, padding: 8},
  body: {paddingHorizontal: 8, flex: 1},
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  category: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    marginLeft: 8,
  },
});

export default VideoDetailItem;
