import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const BookItem = ({onPress, source, title, desc, date, publisher, author}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      {source ? (
        <Image source={{uri: source}} style={styles.img} />
      ) : (
        <View style={[styles.img, {backgroundColor: COLORS.lightGray}]}>
          <Icon name="image-outline" size={SIZES.width5} color={COLORS.gray} />
        </View>
      )}
      <View style={styles.body}>
        <Text
          style={[FONTS.textBold10, {color: COLORS.black}]}
          numberOfLines={2}>
          {title}
        </Text>
        <Text style={[FONTS.text10, {color: COLORS.primary}]} numberOfLines={1}>
          {desc}
        </Text>
        <View style={styles.row}>
          <Text style={[FONTS.textBold8, {color: COLORS.secondary}]}>
            {date}
            {'  '}
          </Text>
          <Text
            style={[FONTS.textBold8, {color: COLORS.gray, flex: 1}]}
            numberOfLines={1}>
            {publisher}, {author}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: SIZES.width3,
    borderRadius: 8,
    marginRight: 16,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width2 - 16,
    width: SIZES.width3,
    borderRadius: 8,
  },
  body: {paddingVertical: 8},
  row: {flexDirection: 'row', alignItems: 'center'},
});

export default BookItem;
