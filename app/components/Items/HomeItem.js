import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import iconValidation from '../../libs/iconValidation';
import colorValidation from '../../libs/colorValidation';

const HomeItem = ({data, colorId, onPress, style = {}}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={1}
      onPress={onPress}>
      <View style={{flex: 1}}>
        <Text
          style={[
            FONTS.textBold14,
            styles.text,
            {color: colorValidation(colorId)},
          ]}
          numberOfLines={3}>
          {data?.nama_ruang}
        </Text>
        <Text style={FONTS.text10} numberOfLines={2}>
          {data?.description}
        </Text>
      </View>

      {colorId ? iconValidation(colorId) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  text: {marginBottom: 4, color: COLORS.black},
  img: {
    height: 90,
    width: 90,
  },
});

export default HomeItem;
