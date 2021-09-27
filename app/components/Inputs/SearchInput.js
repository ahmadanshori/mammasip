import React, {useState, useCallback} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../constants';

const TitleInput = ({
  pass,
  placeholder,
  err,
  autoFocus,
  onChangeText,
  value,
  keyboardType,
  onSubmitEditing,
  maxLength,
}) => {
  const [show, setShow] = useState(true);
  const [color, setColor] = useState(COLORS.border);
  const handleFocus = () => {
    setColor(COLORS.primary);
  };

  const handleBlur = () => {
    setColor(COLORS.border);
  };
  const handleShowButton = useCallback(() => {
    setShow(show ? false : true);
  }, [show]);
  return (
    <View style={[styles.wrapper, err ? styles.error : {borderColor: color}]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={pass ? show : false}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
      />

      <TouchableOpacity style={styles.buttonShow} onPress={handleShowButton}>
        <Icon name={'search'} size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    paddingHorizontal: 14,
    borderRadius: 6,
    height: 48,
    marginTop: 8,
  },
  error: {borderColor: COLORS.red},
  //   success: {borderColor: COLORS.border},
  //   containerError: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     backgroundColor: COLORS.white,
  //     borderWidth: 1,
  //     borderColor: COLORS.red,
  //     paddingHorizontal: 8,
  //     height: 43,
  //     marginTop: 8,
  //   },

  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter-Regular',
  },
  buttonShow: {
    paddingHorizontal: 8,
  },
});

export default TitleInput;
