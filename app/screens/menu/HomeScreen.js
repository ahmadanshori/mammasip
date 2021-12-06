import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

import {HomeHeader} from '../../components/Headers';
import Banner from '../../components/Banner';
import {HomeItem} from '../../components/Items';
import {MainButton} from '../../components/Buttons';
import {LoadingComponent} from '../../components/Loadings';
import {getRoomAPI} from '../../api/room';
import {FONTS, COLORS, ICON} from '../../constants';
import {AppContext} from '../../index';
// import {Container} from '../../components/Container';

const penyuluhan = {
  nama_ruang: 'Penyuluhan',
  description: 'Lebih tahu tentang payudara & kanker payudara',
};
const perpustakaan = {
  nama_ruang: 'Bunga Rampai',
  description: 'Lebih tahu tentang payudara & kanker payudara',
};

const HomeScreen = ({navigation}) => {
  const {user, token} = useContext(AppContext);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [roomData, setRoomData] = useState([]);
  useEffect(() => {
    getInititalData();
  }, []);

  const getInititalData = async () => {
    try {
      const res = await getRoomAPI();
      setRoomData(res.data.data);
    } catch (e) {
      //   console.log(`e`, e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleNavigator = route => {
    navigation.navigate('ListRoom', route);
  };

  return (
    <View style={{flex: 1}}>
      <HomeHeader data={user} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          contentContainerStyle={{paddingBottom: 16}}
          showsVerticalScrollIndicator={false}>
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
              <TouchableNativeFeedback
                onPress={() => navigation.navigate('ImportantMessage')}>
                <View
                  style={[
                    styles.categoryWrapper,
                    {backgroundColor: COLORS.secondary},
                  ]}>
                  <ICON.messagePeople
                    width={40}
                    height={40}
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
              <TouchableNativeFeedback
                onPress={() => navigation.navigate('Faq')}>
                <View
                  style={[
                    styles.categoryWrapper,
                    {backgroundColor: COLORS.primary},
                  ]}>
                  <ICON.girl width={40} height={40} style={styles.img} />
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
              style={[
                FONTS.textBold14,
                {color: COLORS.black, marginBottom: 16},
              ]}>
              Ruang mammaSIP
            </Text>
            <Button
              title="aaaaaa"
              onPress={() => navigation.navigate('ListQuiz')}
            />
            <HomeItem
              data={penyuluhan}
              onPress={() => navigation.navigate('Counseling')}
              colorId={'penyuluhan'}
            />
            <HomeItem
              data={perpustakaan}
              onPress={() => navigation.navigate('Counseling')}
              colorId={7}
            />
            {roomData.map(item => (
              <HomeItem
                data={item}
                key={item.id_ruang}
                onPress={() =>
                  handleNavigator({
                    idRuang: item.id_ruang,
                    title: item.nama_ruang,
                  })
                }
                colorId={item.flag_mobile_color}
                // color={item.color}
                // image={item.image}
              />
            ))}
            {/* <HomeItem
            title="Bunga Rampai"
            desc="Ruang Perpustakaan"
            // onPress={handleNavigator}
            color={COLORS.primary}
            image={<ICON.bunga height={80} width={80} />}
          /> */}
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
    </View>
  );
};

const styles = StyleSheet.create({
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
  img: {marginRight: 8},
  footer: {marginTop: 52, alignItems: 'center'},
  login: {flexDirection: 'row', alignItems: 'center', padding: 16},
});

export default HomeScreen;
