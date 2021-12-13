import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BackgroundHeader} from '../../components/Headers';
import {Container} from '../../components/Container';
import {
  CalculatorItem,
  CalorieItem,
  VideoDetailItem,
} from '../../components/Items';
import {LoadingComponent} from '../../components/Loadings';
import ImportantMessage from '../../components/ImportantMessage';
import {getRoomTypeByIdAPI, getVideoAPI} from '../../api/room';
import {getHealtyCaloriesAPI} from '../../api/healtyMenu';
import {COLORS, FONTS, ICON} from '../../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

const KnowYourSelfScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [data, setData] = useState(null);
  const [video1, setVideo1] = useState([]);
  const [video2, setVideo2] = useState([]);
  const [caloriesData, setCaloriesData] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(id);
      const resVideo1 = await getVideoAPI(1);
      const resVideo2 = await getVideoAPI(2);
      const resHealtyCalories = await getHealtyCaloriesAPI();
      setData(res.data.data);
      setVideo1(resVideo1.data.data.media.slice(0, 4));
      setVideo2(resVideo2.data.data.media.slice(0, 4));
      setCaloriesData(resHealtyCalories.data.data);
    } catch (e) {
      // console.log('e', e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleNavigation = type => {
    navigation.navigate(type);
  };
  return (
    <Container>
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackgroundHeader
            title={data?.nama_ruang}
            desc={data?.description}
            source={{uri: data?.url_picture_bg}}
            white
          />
          <View style={styles.scroll}>
            <ImportantMessage title={data?.kata_pengantar} />
            <View style={styles.wrapper}>
              <View style={[styles.row, styles.mBottom]}>
                <Ionicons name="heart-circle-outline" size={25} />
                <Text
                  style={[
                    FONTS.textBold14,
                    {color: COLORS.black, marginLeft: 4},
                  ]}>
                  Alat Bantu Hitung Untuk Kenali Diri
                </Text>
              </View>
              <CalculatorItem
                image={<ICON.bmr width={60} height={60} />}
                onPress={() => handleNavigation('Bmr')}
                backgroundColor={COLORS.blue}
                title="Massa Tubuh Ideal (BMR)"
                description="Hitung berat badan ideal yang sesuai untuk kesehatan anda."
              />
              <CalculatorItem
                image={<ICON.bmi width={60} height={60} />}
                onPress={() => handleNavigation('Bmi')}
                backgroundColor={COLORS.secondary}
                title="Kebutuhan Kalori Harian (BMI)"
                description="Sudahkan konsumsi makanan memenuhi kebutuhan kalori harian anda?"
              />
              <CalculatorItem
                source={require('../../assets/images/woman.png')}
                image={<ICON.virus width={60} height={60} />}
                onPress={() => handleNavigation('CancerRisk')}
                backgroundColor={COLORS.red}
                title="Resiko Penyakit Kanker"
                description="Analisa dari kebiasaan dan pola makan sehari-hari anda."
              />
            </View>
            <View style={styles.wrapper}>
              <View style={styles.row}>
                <Ionicons name="play-circle-outline" size={25} />
                <Text
                  style={[
                    FONTS.textBold14,
                    {color: COLORS.black, marginLeft: 4},
                  ]}>
                  Video Olahraga
                </Text>
              </View>
              <View style={styles.justify}>
                <View style={styles.video}>
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={COLORS.secondary}
                  />
                  <Text
                    style={[
                      FONTS.textBold12,
                      {color: COLORS.secondary, marginLeft: 6},
                    ]}>
                    Durasi 10 - 20 Menit
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.seeAll}
                  activeOpacity={1}
                  onPress={() => navigation.navigate('ListVideo', {id: 1})}>
                  <Text
                    style={[
                      FONTS.text12,
                      {color: COLORS.secondary, marginLeft: 6},
                    ]}>
                    Lihat Semuanya
                  </Text>
                </TouchableOpacity>
              </View>
              {video1.map(item => (
                <VideoDetailItem
                  key={item.idMedia}
                  data={item}
                  onPress={() =>
                    navigation.navigate('Video', {url: item.url_frame})
                  }
                />
              ))}
              <View style={styles.justify}>
                <View style={styles.video}>
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={COLORS.secondary}
                  />
                  <Text style={[FONTS.textBold12, styles.title]}>
                    Durasi 30 Menit
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.seeAll}
                  activeOpacity={1}
                  onPress={() => navigation.navigate('ListVideo', {id: 2})}>
                  <Text
                    style={[
                      FONTS.text12,
                      {color: COLORS.secondary, marginLeft: 6},
                    ]}>
                    Lihat Semuanya
                  </Text>
                </TouchableOpacity>
              </View>
              {video2.map(item => (
                <VideoDetailItem
                  key={item.idMedia}
                  data={item}
                  onPress={() =>
                    navigation.navigate('Video', {url: item.url_frame})
                  }
                />
              ))}
            </View>
            <View style={styles.wrapper}>
              <View style={styles.row}>
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={25}
                />
                <Text
                  style={[
                    FONTS.textBold14,
                    {color: COLORS.black, marginLeft: 4},
                  ]}>
                  Saran Menu Makanan
                </Text>
              </View>
              <View>
                {caloriesData.map(item => (
                  <CalorieItem
                    key={item.tipe_menu_sehat}
                    data={item}
                    onPress={val =>
                      navigation.navigate('CaloriesDetail', {
                        caloriesData: val,
                      })
                    }
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  scroll: {padding: 16},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mBottom: {marginBottom: 16},
  wrapper: {marginTop: 24},
  justify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.separator,
    marginBottom: 16,
  },
  video: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {color: COLORS.secondary, marginLeft: 6},
  seeAll: {
    paddingVertical: 8,
    paddingLeft: 8,
  },
});

export default KnowYourSelfScreen;
