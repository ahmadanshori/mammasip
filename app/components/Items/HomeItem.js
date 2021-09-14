import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const HomeItem = ({title, desc, color, source}) => {
  const textStyles = [[FONTS.textBold14, styles.text]];
  if (color) {
    textStyles.push({color});
  }
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      <View>
        <Text style={textStyles}>{title}</Text>
        <Text style={FONTS.text10}>{desc}</Text>
      </View>
      <Image resizeMode="contain" source={source} style={styles.img} />
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
  text: {marginBottom: 4},
  img: {
    height: 75,
    width: 75,
    borderBottomRightRadius: 4,
  },
});

export default HomeItem;
