import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';

const ArticleItem = ({video, onPress, date, title, source, isImage = true}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      {isImage ? (
        <>
          {source ? (
            <Image source={{uri: source}} style={styles.img} />
          ) : (
            <View style={[styles.img, {backgroundColor: COLORS.lightGray}]}>
              <Icon
                name="image-outline"
                size={SIZES.width5}
                color={COLORS.gray}
              />
            </View>
          )}
        </>
      ) : null}
      <View style={styles.shadowImg}>
        {video && <Icon name="play-circle" size={30} color={COLORS.white} />}
      </View>
      <View style={styles.body}>
        <Text
          style={[FONTS.textBold12, {color: COLORS.black}]}
          numberOfLines={2}>
          {title}
        </Text>
        <Text style={[FONTS.text10, {color: COLORS.gray}]}>
          Diupload {formatDate(date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: SIZES.width3,
    borderRadius: 8,
    marginRight: 8,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width3,
    width: SIZES.width3,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
  },
  shadowImg: {
    height: SIZES.width3,
    width: SIZES.width3,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 99,
  },
  bookmark: {position: 'absolute', top: 0, right: 0, padding: 8},
  body: {paddingVertical: 10},
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

export default ArticleItem;
