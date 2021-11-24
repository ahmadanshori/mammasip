import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Container} from '../../components/Container';
import {TitleInput} from '../../components/Inputs';
import {MainButton, TitleButton} from '../../components/Buttons';
import {ActivityLevelButton} from '../../components/RadioButton';
import {registerAPI} from '../../api/auth';
import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';
import {AppContext} from '../../index';

const RegisterScreen = ({navigation}) => {
  const {user, setLoading} = useContext(AppContext);
  const [field, setField] = useState({
    email: '',
    gateway_registered: '1',
    created_by: '0',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role_id: '',
    status_member: '',
    tokenFCM: '',
    first_name: '',
    last_name: '',
    gender: 1,
    relegion: '',
    address: '',
    image_path: '',
    tgl_lahir: '',
  });
  const [error, setError] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [date, setDate] = useState(null);

  const handleInput = (val, type) => {
    setField(state => ({...state, [type]: val}));
  };

  const handleCheck = () => {
    setIsCheck(state => !state);
  };

  const onChange = (event, selectedDate) => {
    setIsDate(false);
    setField(state => ({...state, tgl_lahir: selectedDate}));
  };

  const handleRegister = async () => {
    setError(null);
    if (field.password !== field.confirmPassword) {
      setError('Password tidak sama');
    } else {
      setLoading(true);
      try {
        const newData = {
          ...field,
          tgl_lahir: formatDate(field.tgl_lahir, 'yyyy-MM-dd'),
        };
        console.log(`newData`, newData);
        const res = await registerAPI(newData);
        console.log(`register`, res);
      } catch (e) {
        console.log(`e`, e, {...e});
      } finally {
        setLoading(false);
      }
    }
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
          title="Username"
          placeholder="Username anda"
          autoCapitalize="none"
          onChangeText={val => handleInput(val, 'username')}
          value={field.username}
          maxLength={50}
        />
        <TitleInput
          title="Email"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.pass}
          onChangeText={val => handleInput(val, 'email')}
          value={field.email}
        />
        <TitleInput
          title="Alamat"
          placeholder="jln. Senopati"
          style={styles.pass}
          onChangeText={val => handleInput(val, 'address')}
          value={field.address}
        />
        <TitleInput
          title="Nama Depan"
          placeholder="Syifa"
          onChangeText={val => handleInput(val, 'first_name')}
          value={field.first_name}
          style={styles.pass}
          maxLength={20}
        />
        <TitleInput
          title="Nama Belakang"
          placeholder="Hadju"
          onChangeText={val => handleInput(val, 'last_name')}
          value={field.last_name}
          style={styles.pass}
          maxLength={20}
        />
        <TitleInput
          title="Nomer HP"
          placeholder="081234567890"
          onChangeText={val => handleInput(val, 'phone')}
          value={field.phone}
          style={styles.pass}
          maxLength={13}
        />
        <TitleButton
          title="Tanggal Lahir"
          placeholder="1 Januari 2000"
          onPress={() => setIsDate(true)}
          data={field?.tgl_lahir ? formatDate(field?.tgl_lahir) : null}
        />
        <ActivityLevelButton
          title="Jenis Kelamin"
          onPress={val => handleInput(val, 'gender')}
          radio1="Laki-laki"
          radio2="Perempuan"
          value1={1}
          value2={2}
          selected={field.gender}
          style={styles.pass}
        />
        <TitleInput
          title="Password"
          placeholder="8-16 Karakter"
          autoCapitalize="none"
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
          autoCapitalize="none"
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
            !field.username ||
            !field.first_name ||
            !field.tgl_lahir ||
            !field.phone ||
            !isCheck
          }
          onPress={handleRegister}
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
        {/* <Button title="test OTP" onPress={() => navigation.navigate('Otp')} /> */}
      </ScrollView>
      {isDate ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={field?.tgl_lahir || new Date()}
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
