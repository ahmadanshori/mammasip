import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../../constants';

const InputButton = ({title, placeholder, data, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={[FONTS.textBold12, {color: COLORS.black}]}>{title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={SIZES.opacity}>
        <Text
          style={data ? FONTS.text14 : [FONTS.text14, {color: COLORS.gray}]}>
          {data || placeholder}
        </Text>

        <View>
          <Icon name="caretup" size={10} />
          <Icon name="caretdown" size={10} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  button: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 6,
  },
  image: {
    width: 14,
    height: 28,
  },
});

export default InputButton;
