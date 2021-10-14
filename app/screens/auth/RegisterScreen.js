import React, {useState, useCallback} from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';

import {Container} from '../../components/Container';
import {TitleInput} from '../../components/Inputs';
import {MainButton, TitleButton} from '../../components/Buttons';
import {Gender} from '../../components/RadioButton';
import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';

const RegisterScreen = ({navigation}) => {
  const [field, setField] = useState({
    email: '',
    fullname: '',
    gender: 'female',
    date: null,
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [date, setDate] = useState(null);

  const handleInput = (val, type) => {
    setField(state => ({...state, [type]: val}));
  };

  const handleCheck = useCallback(() => {
    setIsCheck(state => !state);
  }, []);

  const onChange = (event, selectedDate) => {
    setIsDate(false);
    setField(state => ({...state, date: selectedDate}));
  };
  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconBack}
            onPress={() => navigation.goBack()}
            activeOpacity={SIZES.opacity}>
            <Icon name="arrow-back" size={22} color={COLORS.black} />
          </TouchableOpacity>
          <View>
            <Text style={[FONTS.textBold24, {color: COLORS.primary}]}>
              Buat Akun Baru
            </Text>
            <Text style={[FONTS.text12, {color: COLORS.black}]}>
              Dapatkan banyak wawasan tentang kesehatan.
            </Text>
          </View>
        </View>
        <TitleInput
          title="Email"
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={val => handleInput(val, 'email')}
          value={field.email}
        />
        <TitleInput
          title="Nama Lengkap"
          placeholder="Syifa Hadju"
          onChangeText={val => handleInput(val, 'fullname')}
          value={field.fullname}
          style={styles.pass}
          maxLength={50}
        />
        <TitleButton
          title="Tanggal Lahir"
          placeholder="1 Januari 2000"
          onPress={() => setIsDate(true)}
          data={field?.date ? formatDate(field?.date) : null}
        />
        <Gender />
        <TitleInput
          title="Password"
          placeholder="8-16 Karakter"
          pass
          style={styles.pass}
          onChangeText={val => handleInput(val, 'password')}
          value={field.password}
          maxLength={16}
          //   onSubmitEditing={handleLogin}
        />
        <TitleInput
          title="Ulangi Password"
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
            <Text style={[FONTS.text10, styles.errorIcon]}>
              Kombinasi email & password yang dimasukan salah!
            </Text>
          </View>
        ) : null}
        <View style={styles.check}>
          <TouchableOpacity style={styles.checkIcon} onPress={handleCheck}>
            <Icon
              name={isCheck ? 'checkbox' : 'square-outline'}
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <Text style={[FONTS.text12, styles.secondary]}>
            Setuju dengan kebijakan & aturan mammaSIP.
          </Text>
        </View>
        <MainButton
          title="Daftar Sekarang"
          disable={
            !field.password ||
            !field.confirmPassword ||
            !field.email ||
            !field.fullname ||
            !field.date ||
            !isCheck
          }
        />
        <TouchableOpacity
          style={styles.register}
          activeOpacity={1}
          onPress={() => navigation.goBack()}>
          <Text style={[FONTS.text12, {color: COLORS.black}]}>
            Sudah punya akun?{' '}
          </Text>
          <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>Masuk</Text>
        </TouchableOpacity>
      </ScrollView>
      {isDate ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={field?.date || new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      ) : null}
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
  iconBack: {paddingRight: 24, paddingLeft: 8, paddingVertical: 8},
  img: {height: 24, width: 24, marginRight: 16},
  or: {color: COLORS.black, width: '20%', textAlign: 'center'},
  separatorWrapper: {
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: '40%',
    borderBottomWidth: 1,
    borderColor: COLORS.separator,
  },
  secondary: {color: COLORS.black},
  pass: {marginTop: 16},
  error: {flexDirection: 'row', marginTop: 6},
  errorIcon: {color: COLORS.red},
  check: {paddingVertical: 29, flexDirection: 'row', alignItems: 'center'},
  checkIcon: {marginHorizontal: 8},
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default RegisterScreen;
