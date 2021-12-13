import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../constants';

const SearchInput = ({
  placeholder,
  err,
  autoFocus,
  onChangeText,
  value,
  keyboardType,
  onSubmitEditing,
  maxLength,
}) => {
  const [color, setColor] = useState(COLORS.border);
  const handleFocus = () => {
    setColor(COLORS.primary);
  };
  const handleBlur = () => {
    setColor(COLORS.border);
  };

  return (
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
        autoCapitalize={'none'}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
      />
      <TouchableOpacity style={styles.buttonShow} onPress={onSubmitEditing}>
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

  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter-Regular',
  },
  buttonShow: {
    paddingHorizontal: 8,
  },
});

export default SearchInput;
