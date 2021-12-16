import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';

import {HomeHeader} from '../../components/Headers';
import Banner from '../../components/Banner';
import {HomeItem} from '../../components/Items';
import {MainButton} from '../../components/Buttons';
import {LoadingComponent} from '../../components/Loadings';
import {NoInternet, ErrorServer} from '../../components/Errors';
import {getRoomAPI} from '../../api/room';
import {FONTS, COLORS, ICON, SIZES} from '../../constants';
import {AppContext} from '../../index';
import useErrorHandler from '../../hooks/useErrorHandler';

const HomeScreen = ({navigation}) => {
  const {user, token} = useContext(AppContext);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [roomData, setRoomData] = useState([]);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomAPI();
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

  const handleRefresh = () => {
    setError();
    setLoading({get: false, refresh: true});
    getInitialData();
  };

  return (
    <View style={{flex: 1}}>
      <HomeHeader data={user} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          contentContainerStyle={{paddingBottom: 16}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={handleRefresh}
              refreshing={loading.refresh}
            />
          }>
          <Banner />
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('ImportantMessage')}>
            <View style={styles.message}>
              <ICON.lula height={60} width={60} />
              <View>
                <Text
                  style={[
                    FONTS.textBold16,
                    {color: COLORS.white, textAlign: 'center'},
                  ]}>
                  PESAN PENTING
                </Text>
                <Text
                  style={[
                    FONTS.text12,
                    {color: COLORS.white, textAlign: 'center'},
                  ]}>
                  Lihat Video
                </Text>
              </View>
              <ICON.deddy height={60} width={60} />
            </View>
          </TouchableNativeFeedback>
          <View style={styles.box}>
            <Image
              source={require('../../assets/images/welcome.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.box}>
            <Text
              style={[
                FONTS.textBold14,
                {color: COLORS.black, marginBottom: 16},
              ]}>
              Ruang MammaSIP
            </Text>
            {roomData.map(item => (
              <HomeItem
                data={item}
                key={item.id_ruang}
                onPress={() => handleNavigator(item)}
                colorId={item.flag_mobile_color}
                // color={item.color}
                // image={item.image}
              />
            ))}
            <View style={styles.aboutUsWrapper}>
              <TouchableOpacity
                style={styles.aboutUs}
                activeOpacity={1}
                onPress={() => navigation.navigate('AboutUs')}>
                {/* <Image
                  resizeMode="contain"
                  source={require('../../assets/icons/logo.gif')}
                  style={styles.logo}
                /> */}
                <Text style={[FONTS.textBold18, {color: COLORS.primary}]}>
                  Tentang Kami
                </Text>
              </TouchableOpacity>
            </View>

            {!token ? (
              <View style={styles.footer}>
                <Text style={FONTS.textBold24}>Lindungi diri dari kanker</Text>
                <Text
                  style={[
                    FONTS.text14,
                    {marginTop: 8, marginBottom: 32, textAlign: 'center'},
                  ]}>
                  Nikmati segala kemudahan & perluas wawasanmu
                </Text>
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
        </ScrollView>
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
  },
  box: {paddingHorizontal: 16},
  img: {
    height: SIZES.width2,
    width: '100%',
    borderRadius: 8,
    marginVertical: 16,
  },
  footer: {marginTop: 52, alignItems: 'center'},
  login: {flexDirection: 'row', alignItems: 'center', padding: 16},
  aboutUsWrapper: {
    marginTop: 24,
    paddingTop: 32,
    borderTopWidth: 1,
    borderColor: COLORS.primary,
  },
  aboutUs: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.primary,
  },
  logo: {height: 50, width: 50, marginRight: 8},
});

export default HomeScreen;
