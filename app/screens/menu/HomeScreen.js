import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {HomeHeader} from '../../components/Headers';
import Banner from '../../components/Banner';
import {HomeItem} from '../../components/Items';
import {MainButton} from '../../components/Buttons';
import {FONTS, COLORS} from '../../constants';
import Sayangi from '../../assets/icons/sayangi.svg';
import Cinta from '../../assets/icons/cinta.svg';
import Berbagi from '../../assets/icons/berbagi.svg';
import Kenali from '../../assets/icons/kenali.svg';
import Pemenang from '../../assets/icons/pemenang.svg';
import Gerbang from '../../assets/icons/gerbang.svg';
import Bunga from '../../assets/icons/bunga.svg';
import {AppContext} from '../../index';

const roomData = [
  {
    id: 1,
    name: 'Sayangi Dirimu',
    title: 'Ruang Umum',
    desc: 'Jaga kesehatan diri dari kanker payudara',
    color: COLORS.darkBlue,
    image: <Sayangi height={80} width={80} />,
  },
  {
    id: 2,
    name: 'Ruang Pendukung',
    title: 'Cinta',
    desc: 'Hadapi kanker payudara bersama mammaSIP',
    color: COLORS.red,
    image: <Cinta height={80} width={80} />,
  },
  {
    id: 3,
    name: 'Ruang Penyuluh',
    title: 'Mari Berbagi',
    desc: 'Lebih tahu tentang payudara & kanker payudara',
    color: COLORS.secondary,
    image: <Berbagi height={80} width={80} />,
  },
  {
    id: 4,
    name: 'Kenali Diri',
    title: 'Ruang Bantu Hitung',
    desc: 'Hadapi kanker payudara bersama mammaSIP',
    color: COLORS.darkRed,
    image: <Kenali height={80} width={80} />,
  },
  {
    id: 5,
    name: 'Anda Pemenang',
    title: 'Ruang Pasien & Penyitas',
    desc: 'Hadapi kanker payudara bersama mammaSIP',
    color: COLORS.orange,
    image: <Pemenang height={80} width={80} />,
  },
  {
    id: 6,
    name: 'Gerbang Dokter',
    title: 'Ruang Tenaga Medis',
    desc: 'Pengobatan, terapi dan skrining kanker payudara',
    color: COLORS.green,
    image: <Gerbang height={80} width={80} />,
  },
];

const HomeScreen = ({navigation}) => {
  const {user, token} = useContext(AppContext);
  const handleNavigator = val => {
    navigation.navigate('Room', {data: val});
  };

  return (
    <View style={styles.container}>
      <HomeHeader data={user} />
      <ScrollView contentContainerStyle={{paddingBottom: 16}}>
        {/* <View style={styles.padding}>
          <Banner />
        </View> */}
        <Banner />
        <View style={styles.welcome}>
          <Text style={[FONTS.textBold14, {color: COLORS.primary}]}>
            Selamat datang di MammaSIP
          </Text>
          <Text style={[FONTS.text10, styles.desc]}>
            Sudahkah mengenali payudaramu? Jaga kesehatan payudaramu sayangi
            dirimu!
          </Text>
          <View style={styles.row}>
            <TouchableNativeFeedback>
              <View
                style={[
                  styles.categoryWrapper,
                  {backgroundColor: COLORS.secondary},
                ]}>
                <Image
                  source={require('../../assets/images/1.png')}
                  style={styles.img}
                />
                <View>
                  <Text style={[FONTS.textBold10, {color: COLORS.white}]}>
                    Pesan Penting
                  </Text>
                  <Text style={[FONTS.text8, {color: COLORS.white}]}>
                    Dr. Lula Kamal M.Sc
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Faq')}>
              <View
                style={[
                  styles.categoryWrapper,
                  {backgroundColor: COLORS.primary},
                ]}>
                <Image
                  source={require('../../assets/images/2.png')}
                  style={styles.img}
                />
                <View>
                  <Text style={[FONTS.textBold10, {color: COLORS.white}]}>
                    Tanya Jawab
                  </Text>
                  <Text style={[FONTS.text8, {color: COLORS.white}]}>
                    Seputar kesehatan
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={styles.box}>
          <Text
            style={[FONTS.textBold14, {color: COLORS.black, marginBottom: 16}]}>
            Ruang mammaSIP
          </Text>
          {roomData.map(item => (
            <HomeItem
              key={item.id}
              title={item.name}
              desc={item.title}
              onPress={() => handleNavigator(item)}
              color={item.color}
              image={item.image}
            />
          ))}
          <HomeItem
            title="Bunga Rampai"
            desc="Ruang Perpustakaan"
            // onPress={handleNavigator}
            color={COLORS.primary}
            image={<Bunga height={80} width={80} />}
          />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  box: {paddingHorizontal: 16, paddingTop: 24},
  seeAll: {color: COLORS.primary, paddingVertical: 4, paddingLeft: 32},
  welcome: {justifyContent: 'center', alignItems: 'center', marginTop: 16},
  desc: {
    color: COLORS.black,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 24,
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    width: '45%',
    marginHorizontal: 8,
    borderRadius: 8,
  },
  img: {height: 40, width: 40, marginRight: 8},
  footer: {marginTop: 52, alignItems: 'center'},
  login: {flexDirection: 'row', alignItems: 'center', padding: 16},
});

export default HomeScreen;
