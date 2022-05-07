import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
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
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import ImportantMessage from '../../components/ImportantMessage';
import {getRoomTypeByIdAPI, getVideoAPI} from '../../api/room';
import {getHealtyCaloriesAPI} from '../../api/healtyMenu';
import {COLORS, FONTS, ICON} from '../../constants';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';

const KnowYourSelfScreen = ({route, navigation}) => {
  const {id} = route.params;
  const {token} = useContext(AppContext);
  const [data, setData] = useState(null);
  const [video1, setVideo1] = useState([]);
  const [video2, setVideo2] = useState([]);
  const [caloriesData, setCaloriesData] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(id, token);
      const resVideo1 = await getVideoAPI(token, 1);
      const resVideo2 = await getVideoAPI(token, 2);
      const resHealtyCalories = await getHealtyCaloriesAPI(token);
      setData(res.data.data);
      setVideo1(resVideo1.data.data.media.slice(0, 4));
      setVideo2(resVideo2.data.data.media.slice(0, 4));
      setCaloriesData(resHealtyCalories.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleNavigation = useCallback(
    type => {
      navigation.navigate(type);
    },
    [navigation],
  );

  const handleJournal = useCallback(
    type => {
      if (token) {
        navigation.navigate(type);
      } else {
        navigation.navigate('Login', {nav: 'KnowYourSelf', id});
      }
    },
    [token, navigation, id],
  );

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };

  const onSeeAll = useCallback(
    val => {
      if (token) {
        navigation.navigate('ListVideo', {id: val});
      } else {
        navigation.navigate('Login', {nav: 'KnowYourSelf', id});
      }
    },
    [token, id, navigation],
  );
  return (
    <Container>
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={handleRefresh}
              refreshing={loading.refresh}
            />
          }>
          <BackgroundHeader
            title={data?.nama_ruang}
            desc={data?.description}
            source={{uri: data?.url_picture_bg}}
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
                image={<ICON.imt width={60} height={60} />}
                onPress={() => handleNavigation('Bmr')}
                backgroundColor={COLORS.blue}
                title="Kalkulator Indeks Massa Tubuh"
                description="Hitung berat badan ideal yang sesuai untuk kesehatan Anda."
              />
              <CalculatorItem
                image={<ICON.bmr width={60} height={60} />}
                onPress={() => handleNavigation('Bmi')}
                backgroundColor={COLORS.secondary}
                title="Kalkulator Kebutuhan Kalori"
                description="Sudahkan konsumsi makanan memenuhi kebutuhan kalori harian Anda?"
              />
              <CalculatorItem
                source={require('../../assets/images/woman.png')}
                image={<ICON.virus width={60} height={60} />}
                onPress={() => handleNavigation('CancerRisk')}
                backgroundColor={COLORS.red}
                title="Risiko Penyakit Kanker"
                description="Analisa dari kebiasaan dan pola makan sehari-hari Anda."
              />
            </View>
            <View style={styles.wrapper}>
              <View style={[styles.row, styles.mBottom]}>
                <Ionicons name="journal-outline" size={25} />
                <Text
                  style={[
                    FONTS.textBold14,
                    {color: COLORS.black, marginLeft: 4},
                  ]}>
                  Jurnal Pribadi
                </Text>
              </View>
              <CalculatorItem
                image={<ICON.sport height={60} width={60} />}
                onPress={() => handleJournal('SportsJournal')}
                backgroundColor={COLORS.orange}
                title="Jurnal Olahraga"
                description="Catat semua aktivitas kebutuhan olahragamu sehari-hari"
              />
              <CalculatorItem
                image={<ICON.scales height={60} width={60} />}
                onPress={() => handleJournal('WeightJournal')}
                backgroundColor={COLORS.primary}
                title="Jurnal Berat Badan"
                description="Hitung berat badan ideal yang sesuai dengan dirimu."
              />
              <CalculatorItem
                image={<ICON.calendar height={60} width={60} />}
                onPress={() => handleJournal('SkriningJournal')}
                backgroundColor={COLORS.secondary}
                title="Jurnal Skrining"
                description="Jadwal untuk dirimu melakukan SADARI & SADANIS"
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
                  onPress={() => onSeeAll(1)}>
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
                    Durasi 30 - 40 Menit
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.seeAll}
                  activeOpacity={1}
                  onPress={() => onSeeAll(2)}>
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
      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
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
