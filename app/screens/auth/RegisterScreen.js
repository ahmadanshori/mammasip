import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import OneSignal from 'react-native-onesignal';
import env from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import {Container} from '../../components/Container';
import {TitleInput} from '../../components/Inputs';
import {dropdownalert} from '../../components/AlertProvider';
import {MainButton, TitleButton} from '../../components/Buttons';
import {ActivityLevelButton} from '../../components/RadioButton';
import {registerAPI} from '../../api/auth';
import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';
import {AppContext} from '../../index';

const initialData = {
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  first_name: '',
  last_name: '',
  gender: 1,
  address: '',
  tgl_lahir: '',
};

const RegisterScreen = ({navigation}) => {
  const {setLoading, setOnesignalId, onesignalId} = useContext(AppContext);
  const [field, setField] = useState(initialData);
  const [error, setError] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [isDate, setIsDate] = useState(false);

  const OneSignalDevice = async () => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(env.ONESIGNALID);
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        notificationReceivedEvent.complete(notification);
      },
    );
    // OneSignal.setInAppMessageClickHandler(event => {});
    // OneSignal.setNotificationOpenedHandler(async openedEvent => {
    //   // const {notification} = openedEvent;
    //   // setOnesignalClick(notification.additionalData?.id);
    //   // await Linking.openURL(
    //   //   `staging.bukujanji://notification/${notification.additionalData.id}`,
    //   // );
    // });
    const onesignalUser = await OneSignal.getDeviceState();
    await AsyncStorage.setItem('onesignal', onesignalUser.userId);
    setOnesignalId(onesignalUser.userId);
  };

  useEffect(() => {
    if (!onesignalId) {
      OneSignalDevice();
    }
  }, []);

  const handleInput = (val, type) => {
    setField(state => ({...state, [type]: val}));
  };

  const handleCheck = () => {
    setIsCheck(state => !state);
  };

  const onChange = event => {
    setIsDate(false);
    setField(state => ({...state, tgl_lahir: event}));
  };

  const handleRegister = async () => {
    setError(null);
    if (onesignalId) {
      if (field.password !== field.confirmPassword) {
        setError('Password tidak sama');
      } else {
        setLoading(true);
        try {
          const newData = {
            ...field,
            gateway_registered: '1',
            created_by: '0',
            username: '',
            role_id: '',
            status_member: '',
            relegion: '',
            tokenFCM: onesignalId,
            image_path: '',
            tgl_lahir: formatDate(field.tgl_lahir, 'yyyy-MM-dd'),
          };
          const res = await registerAPI(newData);
          if (res.data.status === '1') {
            dropdownalert.alertWithType('success', '', res.data.message);
            setField(initialData);
            navigation.goBack();
          } else {
            dropdownalert.alertWithType('error', '', res.data.message);
          }
        } catch (e) {
          dropdownalert.alertWithType('error', '', e.data.message);
        } finally {
          setLoading(false);
        }
      }
    } else {
      OneSignalDevice();
      dropdownalert.alertWithType(
        'warn',
        '',
        'Sedang ada gangguan, Silahkan coba kembali kembali..',
      );
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
          <View style={{flex: 1}}>
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
        />
        <TitleInput
          title="Nama Belakang"
          placeholder="Hadju"
          onChangeText={val => handleInput(val, 'last_name')}
          value={field.last_name}
          style={styles.pass}
        />
        <TitleInput
          title="Nomer HP"
          placeholder="081234567890"
          onChangeText={val => handleInput(val, 'phone')}
          keyboardType={'numeric'}
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
        />
        <TitleInput
          title="Ulangi Password"
          placeholder="8-16 Karakter"
          autoCapitalize="none"
          pass
          style={styles.pass}
          onChangeText={val => handleInput(val, 'confirmPassword')}
          value={field.confirmPassword}
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
      </ScrollView>
      <DatePicker
        modal
        open={isDate}
        title="Tanggal Lahir"
        date={field?.tgl_lahir || new Date()}
        onConfirm={onChange}
        onCancel={() => {
          setIsDate(false);
        }}
        mode="date"
        maximumDate={new Date()}
      />
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
