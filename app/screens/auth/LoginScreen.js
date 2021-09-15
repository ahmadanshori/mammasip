import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Container} from '../../components/Container';
import {TitleInput} from '../../components/Inputs';
import {MainButton} from '../../components/Buttons';
import {COLORS, FONTS, SIZES} from '../../constants';

const LoginScreen = ({navigation}) => {
  const [field, setField] = useState({email: '', password: ''});
  const [error, setError] = useState(true);

  const handleInput = (val, type) => {
    setField(state => ({...state, [type]: val}));
  };
  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconBack}
            onPress={() => navigation.goBack()}
            activeOpacity={SIZES.opacity}>
            <Icon name="arrow-back" size={28} color={COLORS.black} />
          </TouchableOpacity>
          <View>
            <Text style={[FONTS.textBold24, {color: COLORS.secondary}]}>
              Masuk
            </Text>
            <Text style={[FONTS.text12, {color: COLORS.black}]}>
              Masuk kembali ke akun anda sekarang.
            </Text>
          </View>
        </View>
        <TouchableNativeFeedback>
          <View style={styles.authButton}>
            <Image
              source={require('../../assets/icons/google.png')}
              style={styles.img}
            />
            <Text style={[FONTS.text14, styles.authText]}>
              Masuk dengan Google
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.authButton}>
            <Image
              source={require('../../assets/icons/apple.png')}
              style={styles.img}
            />
            <Text style={[FONTS.text14, styles.authText]}>
              Masuk dengan Google
            </Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.separatorWrapper}>
          <View style={styles.separator} />
          <Text style={[FONTS.text12, styles.or]}>Atau</Text>
          <View style={styles.separator} />
        </View>
        <TitleInput
          title="Email"
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={val => handleInput(val, 'email')}
          value={field.email}
          maxLength={24}
        />
        <TitleInput
          title="Password"
          placeholder="Password"
          pass
          style={styles.pass}
          onChangeText={val => handleInput(val, 'password')}
          value={field.password}
          //   onSubmitEditing={handleLogin}
          maxLength={24}
        />
        {error ? (
          <View style={styles.error}>
            <Icon name="alert-circle" style={styles.errorIcon} size={16} />
            <Text style={[FONTS.text10, styles.errorIcon]}>
              Kombinasi email & password yang dimasukan salah!
            </Text>
          </View>
        ) : null}
        <TouchableOpacity style={styles.forgot} activeOpacity={1}>
          <Text style={[FONTS.text12, styles.secondary]}>Lupa Password?</Text>
        </TouchableOpacity>
        <MainButton
          title="Masuk"
          // style={{backgroundColor: COLORS.secondary}}
          disable={!field.email || !field.password}
        />
        <TouchableOpacity
          style={styles.register}
          activeOpacity={1}
          onPress={() => navigation.navigate('Register')}>
          <Text style={[FONTS.text12, {color: COLORS.black}]}>
            Belum punya akun?{' '}
          </Text>
          <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
            Daftar Gratis
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.darkWhite,
    borderRadius: 6,
    marginTop: 12,
  },
  authText: {flex: 1, color: COLORS.black, textAlign: 'center'},
  container: {paddingHorizontal: 16},
  header: {marginVertical: 36, flexDirection: 'row', alignItems: 'center'},
  iconBack: {paddingRight: 16, paddingVertical: 8},
  img: {height: 24, width: 24, marginRight: 16},
  or: {color: COLORS.black, width: '20%', textAlign: 'center'},
  separatorWrapper: {
    marginTop: 40,
    marginBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: '40%',
    borderBottomWidth: 1,
    borderColor: COLORS.separator,
  },
  secondary: {color: COLORS.secondary},
  pass: {marginTop: 16},
  error: {flexDirection: 'row', marginTop: 6},
  errorIcon: {color: COLORS.red},
  forgot: {paddingVertical: 16},
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default LoginScreen;
