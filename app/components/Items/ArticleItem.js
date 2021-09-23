import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';

const ArticleItem = ({category, video, onPress, title, source}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <Image source={source} style={styles.img} />
      <View style={styles.shadowImg}>
        <TouchableOpacity style={styles.bookmark}>
          <Icon name="bookmark-outline" size={20} color={COLORS.white} />
        </TouchableOpacity>
        {video && <Icon name="play-circle" size={30} color={COLORS.white} />}
      </View>
      <View style={styles.body}>
        {category && (
          <View style={styles.spaceBetween}>
            <View style={styles.subtitle}>
              <Text style={[FONTS.textBold8, {color: COLORS.primary}]}>
                {category}
              </Text>
            </View>
            <View />
          </View>
        )}
        <Text style={[FONTS.text10, {color: COLORS.black}]}>{title}</Text>
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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  shadowImg: {
    height: SIZES.width3,
    width: SIZES.width3,
    // backgroundColor: COLORS.shadowPrimary,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 99,
  },
  bookmark: {position: 'absolute', top: 0, right: 0, padding: 8},
  body: {paddingHorizontal: 8, paddingVertical: 10},
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
