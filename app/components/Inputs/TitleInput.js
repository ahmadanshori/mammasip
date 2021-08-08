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
  maxLength,
}) => {
  const [show, setShow] = useState(true);

  const handleShowButton = useCallback(() => {
    setShow(show ? false : true);
  }, [show]);
  return (
    <View style={style}>
      <Text style={[FONTS.textBold12, styles.title]}>{title}</Text>
      <View style={[styles.container, err ? styles.error : styles.success]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={pass ? show : false}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          value={value}
          autoFocus={autoFocus}
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
                color={COLORS.lightGray}
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderColor: COLORS.border,
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
    // paddingLeft: 8,
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
});

export default TitleInput;
