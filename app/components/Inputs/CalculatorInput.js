import React, {useState, useCallback} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import {COLORS, FONTS} from '../../constants';

const TitleInput = ({
  title,
  type,
  pass,
  placeholder,
  err,
  autoFocus,
  onChangeText,
  value,
  keyboardType,
  onSubmitEditing,
  maxLength = 25,
}) => {
  const [show, setShow] = useState(true);
  const [color, setColor] = useState(COLORS.border);
  const handleFocus = () => {
    setColor(COLORS.primary);
  };

  const handleBlur = () => {
    setColor(COLORS.border);
  };

  return (
    <View style={styles.container}>
      <Text style={[FONTS.textBold12, styles.title]}>{title}</Text>
      <View style={[styles.wrapper, err ? styles.error : {borderColor: color}]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          autoFocus={autoFocus}
          onSubmitEditing={onSubmitEditing}
          maxLength={maxLength}
        />
        <View style={[styles.type, {borderColor: color}]}>
          <Text style={[FONTS.text14, {color: COLORS.black}]}>{type}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 16},
  title: {color: COLORS.black, marginLeft: 4},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    paddingLeft: 14,
    borderRadius: 6,
    height: 48,
    marginTop: 8,
  },
  error: {borderColor: COLORS.red},
  success: {borderColor: COLORS.border},
  containerError: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.red,
    paddingHorizontal: 8,
    height: 43,
    marginTop: 8,
  },
  line: {
    borderRightWidth: 1,
    height: 18,
    borderColor: COLORS.lightGray,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter-Regular',
    color: COLORS.black,
  },
  buttonShow: {
    paddingHorizontal: 8,
  },
  eye: {
    height: 24,
    width: 24,
  },
  err: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  icon: {
    height: 14,
    width: 14,
    marginRight: 6,
  },
  type: {
    height: 48,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
  },
});

export default TitleInput;
