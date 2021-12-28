import React, {useState, useContext, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {TitleInput} from '../../components/Inputs';
import {MainButton} from '../../components/Buttons';
import {dropdownalert} from '../../components/AlertProvider';
import {changePasswordAPI} from '../../api/auth';
import {COLORS, FONTS} from '../../constants';
import {AppContext} from '../../index';
const ChangePasswordScreen = ({navigation}) => {
  const {setLoading, token, setToken, setUser} = useContext(AppContext);
  const [field, setField] = useState({
    password_old: '',
    password_new: '',
    password_confirm: '',
  });
  // const [isChange, setIsChange] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (val, type) => {
    setField(state => ({...state, [type]: val}));
  };

  const handleChangePassword = useCallback(async () => {
    Keyboard.dismiss();
    setError(null);
    if (field.password_new !== field.password_confirm) {
      setError('Kombinasi password baru tidak sama!');
    } else {
      setLoading(true);
      try {
        const res = await changePasswordAPI(token, field);

        if (res.data.status === '1') {
          await AsyncStorage.clear();
          setToken(null);
          setUser(null);
          dropdownalert.alertWithType(
            'success',
            '',
            'Berhasil merubah password..',
          );
          return navigation.reset({
            index: 1,
            routes: [{name: 'Home'}, {name: 'Login', params: {nav: 'Home'}}],
          });
        } else {
          setError(res.data.message);
        }
      } catch (e) {
        dropdownalert.alertWithType('error', '', e.data.message);
      } finally {
        setLoading(false);
      }
    }
  }, [field, token, setLoading, setToken, setUser, navigation]);

  return (
    <Container>
      <HeaderTitle back title="Ganti Password" />
      {/* {isChange ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ICON.success width={SIZES.width2} height={SIZES.width2} />
          <Text style={[FONTS.textBold16, {color: COLORS.primary}]}>
            Selamat,
          </Text>
          <Text style={FONTS.textBold16}>Password Berhasil diubah..</Text>
        </View>
      ) : ( */}
      <>
        <ScrollView contentContainerStyle={styles.wrapper}>
          <TitleInput
            title="Password Lama"
            placeholder="8-16 Karakter"
            autoCapitalize="none"
            pass
            autoFocus={true}
            onChangeText={val => handleInput(val, 'password_old')}
            value={field.password_old}
            maxLength={16}
          />
          <TitleInput
            title="Password Baru"
            placeholder="8-16 Karakter"
            autoCapitalize="none"
            pass
            style={styles.pass}
            onChangeText={val => handleInput(val, 'password_new')}
            value={field.password_new}
            maxLength={16}
            //   onSubmitEditing={handleLogin}
          />
          <TitleInput
            title="Ulangi Password Baru"
            placeholder="8-16 Karakter"
            autoCapitalize="none"
            pass
            style={styles.pass}
            onChangeText={val => handleInput(val, 'password_confirm')}
            value={field.password_confirm}
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
              !field.password_new ||
              !field.password_confirm ||
              !field.password_old
            }
            onPress={handleChangePassword}
          />
        </View>
      </>
      {/* )} */}
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
