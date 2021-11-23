import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, SIZES} from '../../constants';

const ButtonContent = ({data, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={SIZES.opacity}
      onPress={onPress}>
      <View style={{width: '90%'}}>
        <Text
          style={[FONTS.textBold12, {color: COLORS.white, marginBottom: 4}]}>
          {data.kata_pengantar}
        </Text>
        <Text style={[FONTS.text10, {color: COLORS.white, flex: 1}]}>
          Uji pengetahuanmu dengan quiz dari mammaSIP.
        </Text>
      </View>
      <Icon name="chevron-right" size={20} color={COLORS.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
});

export default ButtonContent;
