import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, SIZES} from '../../constants';

const QuestionButton = ({style = {}, onPress, selected, title}) => {
  return (
    <TouchableOpacity
      activeOpacity={selected ? 1 : SIZES.opacity}
      style={[
        styles.button,
        style,
        selected ? [styles.active] : [styles.inActive],
      ]}
      onPress={onPress}>
      <>
        {selected ? (
          <Icon size={30} name="circle-slice-8" color={COLORS.primary} />
        ) : (
          <Icon
            size={30}
            name="checkbox-blank-circle-outline"
            color={COLORS.gray}
          />
        )}
      </>
      <Text
        style={[FONTS.text14, {color: COLORS.black, marginLeft: 8, flex: 1}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: COLORS.darkWhite,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    height: 10,
    width: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  circleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 16,
    width: 16,
    borderRadius: 30,
    marginRight: 8,
  },
  active: {borderColor: COLORS.primary},
  inActive: {borderColor: COLORS.gray},
});

export default QuestionButton;
