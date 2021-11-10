import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, ICON} from '../../constants';

const HomeItem = ({title, desc, color, source, image, onPress, style = {}}) => {
  const textStyles = [[FONTS.textBold14, styles.text]];
  if (color) {
    textStyles.push({color});
  }
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={1}
      onPress={onPress}>
      <View style={{flex: 1}}>
        <Text style={textStyles} numberOfLines={3}>
          {title}
        </Text>
        <Text style={FONTS.text10} numberOfLines={2}>
          {desc}
        </Text>
      </View>
      {/* {image} */}
      <ICON.sayangi height={90} width={90} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    overflow: 'hidden',
  },
  text: {marginBottom: 4, color: COLORS.black},
  img: {
    height: 90,
    width: 90,
    // borderBottomRightRadius: 4,
  },
});

export default HomeItem;
