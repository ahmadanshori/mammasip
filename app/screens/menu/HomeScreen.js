import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  Linking,
  Platform,
  SafeAreaView,
} from 'react-native';
import VersionCheck from 'react-native-version-check';
import OneSignal from 'react-native-onesignal';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from 'react-native-config';
import {Container} from '../../components/Container';
import {HomeHeader} from '../../components/Headers';
import {HomeItem} from '../../components/Items';
import {MainButton} from '../../components/Buttons';
import {LoadingComponent} from '../../components/Loadings';
import {HomeModal, UpdateModal} from '../../components/Modals';
import {dropdownalert} from '../../components/AlertProvider';
import {NoInternet, ErrorServer} from '../../components/Errors';
import {getRoomAPI} from '../../api/room';
import {loginGoogleAPI} from '../../api/auth';
import {FONTS, COLORS, SIZES} from '../../constants';
import {AppContext} from '../../index';
import useErrorHandler from '../../hooks/useErrorHandler';

GoogleSignin.configure({
  webClientId: env.GOOGLEID,
  offlineAccess: false,
});

const HomeScreen = ({navigation}) => {
  const {token, onesignalId, setOnesignalId, setToken, setUser} =
    useContext(AppContext);
  const interactionRef = useRef();
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [roomData, setRoomData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isInteraction, setIsInteraction] = useState(false);
  const [error, setError] = useErrorHandler();

  const OneSignalDevice = async () => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(env.ONESIGNALID);
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        notificationReceivedEvent.complete(notification);
      },
    );
    const onesignalUser = await OneSignal.getDeviceState();
    await AsyncStorage.setItem('onesignal', onesignalUser.userId);
    setOnesignalId(onesignalUser.userId);
  };

  useEffect(() => {
    VersionCheck.getLatestVersion({
      falserovider: Platform.OS === 'ios' ? 'appStore' : 'playStore',
    }).then(latestVersion => {
      if (latestVersion !== VersionCheck.getCurrentVersion()) {
        setIsUpdate(true);
      }
    });
    if (!onesignalId) {
      OneSignalDevice();
    }
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomAPI(token);
      setRoomData(res.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleNavigator = event => {
    const {id_ruang} = event;
    if (id_ruang === 4) {
      navigation.navigate('KnowYourSelf', {id: id_ruang});
    } else if (id_ruang === 5) {
      navigation.navigate('DoctorRoom', {id: id_ruang});
    } else if (id_ruang === 6) {
      navigation.navigate('Counseling', {id: id_ruang});
    } else if (id_ruang === 7) {
      navigation.navigate('BungaRampai', {id: id_ruang});
    } else if (id_ruang === 8) {
      navigation.navigate('Faq');
    } else {
      navigation.navigate('ListRoom', {id: id_ruang});
    }
  };

  const handleGoogleSignin = async () => {
    if (onesignalId) {
      setLoading(true);
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const postData = {
          email: userInfo.user.email,
          device: 'mobile',
          ip_address: '-',
          tokenFCM: onesignalId,
          name: userInfo.user.name,
          photo: userInfo.user.photo,
        };
        const res = await loginGoogleAPI(postData);
        if (res.data.status === '2') {
          setError(res.data.message);
        } else {
          await AsyncStorage.setItem('user', JSON.stringify(res.data.data));
          await AsyncStorage.setItem('isGoogle', '1');
          setUser(res.data.data.user);
          setToken(res.data.data.token);
        }
      } catch (err) {
        if (err.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (err.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          dropdownalert.alertWithType('error', '', err.data.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      OneSignalDevice();
      return dropdownalert.alertWithType(
        'warn',
        '',
        'Sedang ada gangguan, Silahkan coba kembali..',
      );
    }
  };

  const interactionHandler = () => {
    setIsInteraction(false);
    interactionRef.current.scrollTo({y: 320});
  };

  const handleRefresh = () => {
    setError();
    setLoading({get: false, refresh: true});
    getInitialData();
  };

  const hanldeUpdateGoogle = async () => {
    await Linking.openURL('market://details?id=com.mammasip');
  };

  return (
    <Container>
      <SafeAreaView style={{backgroundColor: COLORS.primary}} />
      <ScrollView
        contentContainerStyle={{paddingBottom: 16}}
        showsVerticalScrollIndicator={false}
        ref={ref => (interactionRef.current = ref)}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            refreshing={loading.refresh}
          />
        }>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsInteraction(true)}>
          <Image
            source={require('../../assets/images/home.png')}
            style={styles.homeImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <HomeHeader onPress={() => navigation.navigate('ImportantMessage')} />

        {loading.get ? (
          <View style={styles.loading}>
            <LoadingComponent />
          </View>
        ) : (
          <View style={styles.box}>
            <View style={styles.title}>
              <Text
                style={[
                  FONTS.textBold16,
                  {color: COLORS.black, textAlign: 'center'},
                ]}>
                Ruang-ruang MammaSIP
              </Text>
              <Text
                style={[
                  FONTS.text12,
                  {color: COLORS.black, textAlign: 'center', marginBottom: 16},
                ]}>
                Ayo klik menu dibawah untuk tahu lebih banyak tentang kesehatan
                payudara Anda.
              </Text>
            </View>
            <View style={styles.list}>
              {roomData?.map(item => (
                <HomeItem
                  data={item}
                  key={item.id_ruang}
                  onPress={() => handleNavigator(item)}
                  colorId={item.flag_mobile_color}
                />
              ))}
            </View>
            <View style={styles.aboutUsWrapper}>
              <MainButton
                title="Tentang Kami"
                onPress={() => navigation.navigate('AboutUs')}
              />
              <MainButton
                title="Agenda Pertemuan"
                style={styles.margin}
                onPress={() => navigation.navigate('AboutUs')}
              />
            </View>
            {!token ? (
              <View style={styles.footer}>
                <Text
                  style={[
                    FONTS.textBold24,
                    {marginTop: 8, marginBottom: 32, textAlign: 'center'},
                  ]}>
                  Lindungi Diri dari Kanker Payudara
                </Text>
                <Text
                  style={[
                    FONTS.text14,
                    {marginTop: 8, marginBottom: 32, textAlign: 'center'},
                  ]}>
                  Nikmati segala kemudahan & perluas wawasanmu
                </Text>
                <TouchableNativeFeedback onPress={handleGoogleSignin}>
                  <View style={styles.authButton}>
                    <Image
                      source={require('../../assets/icons/google.png')}
                      style={styles.googleImg}
                    />
                    <Text style={[FONTS.text14, styles.authText]}>
                      Daftar dengan Google
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <View style={styles.separatorWrapper}>
                  <View style={styles.separator} />
                  <Text style={[FONTS.text12, styles.or]}>Atau</Text>
                  <View style={styles.separator} />
                </View>
                <MainButton
                  title="Daftar Sekarang"
                  backgroundColor={COLORS.secondary}
                  onPress={() => navigation.navigate('Register')}
                />
                <TouchableOpacity
                  style={styles.login}
                  activeOpacity={1}
                  onPress={() => navigation.navigate('Login', {nav: 'Home'})}>
                  <Text style={FONTS.text12}>Sudah punya akun? </Text>
                  <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                    Masuk
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>
      <HomeModal visible={isInteraction} onPresBack={interactionHandler} />
      <UpdateModal visible={isUpdate} onPress={hanldeUpdateGoogle} />
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  homeImage: {width: '100%', height: SIZES.width / 1.64},
  loading: {marginTop: 60},
  box: {paddingHorizontal: 16},
  title: {marginVertical: 36, paddingHorizontal: 16},
  footer: {
    paddingTop: 24,
    marginTop: 32,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.separator,
  },
  login: {flexDirection: 'row', alignItems: 'center', padding: 16},
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  aboutUsWrapper: {
    marginTop: 24,
    paddingTop: 32,
    borderTopWidth: 1,
    borderColor: COLORS.separator,
  },
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
  googleImg: {height: 24, width: 24, marginRight: 16},
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
    borderColor: COLORS.black,
  },
  margin: {marginTop: 16},
  or: {color: COLORS.black, width: '20%', textAlign: 'center'},
});

export default HomeScreen;
