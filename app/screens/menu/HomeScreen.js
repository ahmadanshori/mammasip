import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import {HomeHeader} from '../../components/Headers';
import Banner from '../../components/Banner';
import {HomeItem} from '../../components/Items';
import {FONTS, COLORS} from '../../constants';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={{paddingHorizontal: 16}}>
        <Banner />
      </View>
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
      {/* <View style={styles.box}>
        <View>
          <View style={styles.titleWrapper}>
            <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
              Jaga Kesehatanmu
            </Text>
            <Text style={[FONTS.text10, styles.seeAll]}>Lihat Semua</Text>
          </View>
          <View style={styles.componentWrapper}>
            <HomeItem />
            <HomeItem />
          </View>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  box: {paddingHorizontal: 16, paddingTop: 24},
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeAll: {color: COLORS.primary, paddingVertical: 4, paddingLeft: 32},
  componentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
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
