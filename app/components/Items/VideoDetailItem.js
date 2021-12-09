import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';

const VideoDetailItem = ({onPress, category = [], data}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      {data?.url ? (
        <View>
          <Image source={{uri: data?.url}} style={styles.img} />
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
      ) : (
        <View style={styles.notfoundImg}>
          <Icon name="image-outline" size={30} color={COLORS.gray} />
        </View>
      )}
      <View style={styles.body}>
        <Text style={FONTS.textBold14}>{data?.kata_pengantar}</Text>
        <View style={styles.row}>
          <Text style={[FONTS.text10, {color: COLORS.gray}]}>
            {formatDate(data.createdDate)}
          </Text>
          {category?.length ? (
            <View style={styles.category}>
              <Text style={[FONTS.textBold10, {color: COLORS.gray}]}>
                {category[0]?.nameCategory}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
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
    height: SIZES.width5 - 8,
    width: SIZES.width5 - 8,
    borderRadius: 8,
  },
  shadowImg: {
    height: SIZES.width5 - 8,
    width: SIZES.width5 - 8,
    // backgroundColor: COLORS.shadowPrimary,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 99,
  },
  notfoundImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width5 - 8,
    width: SIZES.width5 - 8,
    borderRadius: 8,
    backgroundColor: COLORS.separator,
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
    // marginLeft: 8,
  },
});

export default VideoDetailItem;
