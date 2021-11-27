import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';

const CounselingItem = ({onPress, source, title, date}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <View>
        {source ? (
          <Image source={source} style={styles.img} />
        ) : (
          <View style={styles.shadowImg}>
            <Icon name="image-outline" size={30} color={COLORS.gray} />
          </View>
        )}
      </View>
      <View style={styles.body}>
        <Text style={FONTS.textBold14}>{title}</Text>
        <View style={styles.row}>
          <Text style={[FONTS.text10, {color: COLORS.gray}]}>
            {formatDate(date)}
          </Text>
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
    height: SIZES.width5 - 16,
    width: SIZES.width5 - 16,
    borderRadius: 8,
  },
  shadowImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width5 - 16,
    width: SIZES.width5 - 16,
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
  row: {flexDirection: 'row', alignItems: 'center'},
  category: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: COLORS.shadowPrimary,
    marginLeft: 8,
  },
});

export default CounselingItem;
