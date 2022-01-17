import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';

const ArticleDetailItem = ({
  onPress,
  source,
  title,
  date,
  desc,
  publisher,
  author,
  bookDate,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <View>
        {source ? (
          <Image source={{uri: source}} style={styles.img} />
        ) : (
          <View style={styles.shadowImg}>
            <Icon name="image-outline" size={30} color={COLORS.gray} />
          </View>
        )}
      </View>
      <View style={styles.body}>
        <Text style={FONTS.textBold14}>{title}</Text>
        {desc && <Text style={FONTS.text12}>{desc}</Text>}
        {bookDate ? (
          <View style={styles.row}>
            <Text style={[FONTS.textBold8, {color: COLORS.black}]}>
              {bookDate},{' '}
              <Text
                style={[FONTS.textBold8, {color: COLORS.secondary, flex: 1}]}>
                {publisher ? `${publisher},` : null} {author}
              </Text>
            </Text>
          </View>
        ) : null}
        <Text style={[FONTS.text10, {color: COLORS.gray}]}>
          Diupload {formatDate(date)}
        </Text>
      </View>
      {/* <TouchableOpacity style={{paddingHorizontal: 4}}>
        <Icon
          name={bookmark ? 'bookmark' : 'bookmark-outline'}
          color={bookmark ? COLORS.primary : COLORS.black}
          size={20}
        />
      </TouchableOpacity> */}
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
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width5 - 8,
    width: SIZES.width5 - 8,
    borderRadius: 8,
    backgroundColor: COLORS.separator,
  },
  bookmark: {position: 'absolute', top: 0, right: 0, padding: 8},
  body: {paddingHorizontal: 8, flex: 1},
  row: {flexDirection: 'row'},
});

export default ArticleDetailItem;
