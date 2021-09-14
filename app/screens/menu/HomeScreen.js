import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';

import {HomeHeader} from '../../components/Headers';
import Banner from '../../components/Banner';
import {HomeItem} from '../../components/Items';
import {FONTS, COLORS} from '../../constants';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView
        // style={styles.scroll}
        contentContainerStyle={{paddingBottom: 16}}>
        {/* <View style={styles.padding}>
          <Banner />
        </View> */}
        <Banner />
        <View style={styles.welcome}>
          <Text style={[FONTS.textBold14, {color: COLORS.primary}]}>
            Selamat datang di MammaSIP
          </Text>
          <Text
            style={[
              FONTS.text10,
              {
                color: COLORS.black,
                textAlign: 'center',
                marginHorizontal: 24,
                marginTop: 4,
              },
            ]}>
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
          <HomeItem
            title="Sayangi Dirimu"
            desc="Ruang Umum"
            color={COLORS.darkBlue}
            source={require('../../assets/icons/sayangi.png')}
          />
          <HomeItem
            title="Cinta"
            desc="Ruang Pendukung"
            color={COLORS.red}
            source={require('../../assets/icons/cinta.png')}
          />
          <HomeItem
            title="Mari Berbagi"
            desc="Ruang Penyuluh"
            color={COLORS.secondary}
            source={require('../../assets/icons/berbagi.png')}
          />
          <HomeItem
            title="Kenali Diri"
            desc="Ruang Bantu Hitung"
            color={COLORS.darkRed}
            source={require('../../assets/icons/kenali.png')}
          />
          <HomeItem
            title="Anda Pemenang"
            desc="Ruang Pasien & Penyitas"
            color={COLORS.orange}
            source={require('../../assets/icons/pemenang.png')}
          />
          <HomeItem
            title="Gerbang Dokter"
            desc="Ruang Tenaga Medis"
            color={COLORS.green}
            source={require('../../assets/icons/gerbang.png')}
          />
          <HomeItem
            title="Bunga Rampai"
            desc="Ruang Perpustakaan"
            color={COLORS.primary}
            source={require('../../assets/icons/bunga.png')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  box: {paddingHorizontal: 16, paddingTop: 24},
  seeAll: {color: COLORS.primary, paddingVertical: 4, paddingLeft: 32},
  scroll: {marginTop: -90},
  padding: {paddingHorizontal: 16},
  welcome: {justifyContent: 'center', alignItems: 'center', marginTop: 16},
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
});

export default HomeScreen;
