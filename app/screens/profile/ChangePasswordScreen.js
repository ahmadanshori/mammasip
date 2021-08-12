import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {TitleInput} from '../../components/Inputs';
import {MainButton} from '../../components/Buttons';
import {COLORS, FONTS} from '../../constants';

const ChangePasswordScreen = ({navigation}) => {
  const [field, setField] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const handleInput = (val, type) => {
    setField(state => ({...state, [type]: val}));
  };

  const handleChangePassword = () => {
    setError(null);
    if (field.password !== field.confirmPassword) {
      setError('Kombinasi password baru tidak sama!');
    }
  };

  return (
    <Container>
      <HeaderTitle
        back
        title="Ganti Password"
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <TitleInput
          title="Password Lama"
          placeholder="8-16 Karakter"
          pass
          onChangeText={val => handleInput(val, 'oldPassword')}
          value={field.oldPassword}
          maxLength={16}
        />
        <TitleInput
          title="Password Baru"
          placeholder="8-16 Karakter"
          pass
          style={styles.pass}
          onChangeText={val => handleInput(val, 'password')}
          value={field.password}
          maxLength={16}
          //   onSubmitEditing={handleLogin}
        />
        <TitleInput
          title="Ulangi Password Baru"
          placeholder="8-16 Karakter"
          pass
          style={styles.pass}
          onChangeText={val => handleInput(val, 'confirmPassword')}
          value={field.confirmPassword}
          maxLength={16}
          //   onSubmitEditing={handleLogin}
        />
        {error ? (
          <View style={styles.error}>
            <Icon name="alert-circle" style={styles.errorIcon} size={16} />
            <Text style={[FONTS.text10, styles.errorIcon]}>{error}</Text>
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.wrapper}>
        <MainButton
          title="Ganti Password"
          disable={
            !field.password || !field.confirmPassword || !field.oldPassword
          }
          onPress={handleChangePassword}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {padding: 16},
  secondary: {color: COLORS.black},
  pass: {marginTop: 16},
  error: {flexDirection: 'row', marginTop: 6},
  errorIcon: {color: COLORS.red},
});

export default ChangePasswordScreen;
