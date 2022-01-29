import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS, FONTS} from '../../constants';

const TitleInput = ({
  title,
  pass,
  placeholder,
  err,
  autoFocus,
  onChangeText,
  value,
  keyboardType,
  style = {},
  onSubmitEditing,
  autoCapitalize,
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
    <View style={style}>
      <Text style={[FONTS.textBold12, styles.title]}>{title}</Text>
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
          autoCapitalize={autoCapitalize}
          onSubmitEditing={onSubmitEditing}
          maxLength={maxLength}
        />
        {pass ? (
          <>
            <TouchableOpacity
              style={styles.buttonShow}
              onPress={handleShowButton}>
              <Icon
                name={show ? 'md-eye' : 'md-eye-off'}
                size={24}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {color: COLORS.black, marginLeft: 4},
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
  eye: {
    height: 24,
    width: 24,
  },
});

export default TitleInput;
