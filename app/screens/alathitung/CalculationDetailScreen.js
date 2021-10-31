import React, {useCallback, useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {MainButton, AskButton} from '../../components/Buttons';
import MealSuggestions from '../../components/MealSuggestions';
import {CalculatorItem} from '../../components/Items';
import {COLORS, FONTS, SIZES} from '../../constants';
import Divider from '../../components/Divider';
import {LoadingComponent} from '../../components/Loadings';

import {getBmrAPI, getBmiAPI} from '../../api/calculator';
import {AppContext} from '../../index';
import WeightIcon from '../../assets/icons/weight.svg';
import FoodIcon from '../../assets/icons/food.svg';
import VirusIcon from '../../assets/icons/virus.svg';
import QuizIcon from '../../assets/icons/quiz.svg';

const CalculationDetailScreen = ({navigation, route}) => {
  const {type, field} = route.params;
  const {user, token} = useContext(AppContext);
  const [foodSuggestion, setFoodSuggestion] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const res =
        type === 'BMR'
          ? await getBmrAPI(token, field)
          : await getBmiAPI(token, field);
      setData(res.data.data);
    } catch (err) {
      console.log(`err`, {...err});
    } finally {
      setLoading(false);
    }
  }, [token, field, type]);

  const handleShare = () => {};

  const handleNavigation = (val, param) => {
    navigation.navigate(val, param);
  };

  const handleFoodSuggestion = value => {
    setFoodSuggestion(value);
  };

  return (
    <Container>
      <HeaderTitle
        title={`Hasil Perhitungan ${type} Anda`}
        onSharePress={handleShare}
      />
      {loading ? (
        <LoadingComponent />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.title}>
            <Text style={FONTS.textBold18}>{type} anda adalah </Text>
            <Text style={[FONTS.textBold18, {color: COLORS.primary}]}>
              {type === 'BMR' ? Math.round(data?.bmr) : Math.round(data?.bmi)}
            </Text>
            <Text style={FONTS.textBold18}> kcal</Text>
          </View>
          <View style={styles.padding}>
            <MainButton title="Bagikan" share />
            <TouchableOpacity
              style={styles.refresh}
              activeOpacity={1}
              onPress={() => navigation.goBack()}>
              <MaterialIcons name="refresh" size={20} />
              <Text
                style={[
                  FONTS.textBold12,
                  {color: COLORS.black, marginLeft: 4},
                ]}>
                Hitung Ulang
              </Text>
            </TouchableOpacity>
            <Text style={[FONTS.text12, {textAlign: 'center'}]}>
              Hasil analisa perhitungan {type}
            </Text>
            <Divider height={2} style={styles.divider} />
            <Text
              style={[
                FONTS.textBold16,
                {color: COLORS.black, marginBottom: 16},
              ]}>
              Kondisi
            </Text>
            <Text style={[FONTS.text12, {color: COLORS.black}]}>
              {data?.level_cap}
            </Text>
          </View>
          <Divider />
          <View style={styles.padding}>
            <View style={styles.justify}>
              <Text
                style={[
                  FONTS.textBold16,
                  {color: COLORS.black, marginBottom: 16},
                ]}>
                Saran Menu Makanan
              </Text>
              {foodSuggestion ? (
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={() =>
                    handleNavigation('FoodSuggestion', {
                      handleFoodSuggestion,
                      caloriesData: foodSuggestion.caloriesData,
                    })
                  }
                  activeOpacity={SIZES.opacity}>
                  <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                    Ubah
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {foodSuggestion ? (
              <MealSuggestions data={foodSuggestion} />
            ) : (
              <>
                <View style={styles.warning}>
                  <View style={styles.row}>
                    <Ionicons
                      name="alert-circle"
                      size={20}
                      color={COLORS.red}
                    />
                    <Text
                      style={[
                        FONTS.textBold12,
                        {color: COLORS.red, marginLeft: 6},
                      ]}>
                      Anda belum mengatur jumlah kalori harian
                    </Text>
                  </View>
                  <Text
                    style={[FONTS.text12, {color: COLORS.black, marginTop: 8}]}>
                    Yuk tentukan jumlah kalori harian biar sehat dan berat
                    badanmu jadi lebih ideal.
                  </Text>
                </View>
                <View style={styles.foodWrapper}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/icons/food.png')}
                    style={styles.foodImg}
                  />
                </View>
                <MainButton
                  title="Pilih Menu Makanan"
                  onPress={() =>
                    handleNavigation('FoodSuggestion', {
                      handleFoodSuggestion,
                    })
                  }
                />
              </>
            )}
          </View>
          <Divider />
          <View style={styles.padding}>
            <Text style={[FONTS.textBold16, styles.titleFooter]}>
              Alat bantu hitung lain
            </Text>
            <CalculatorItem
              image={<FoodIcon height={60} width={60} />}
              onPress={() => handleNavigation(type === 'BMR' ? 'Bmr' : 'Bmi')}
              backgroundColor={COLORS.secondary}
              title="Kebutuhan Kalori Harian (BMI)"
              description="Sudahkan konsumsi makanan memenuhi kebutuhan kalori harian anda?"
            />
            <CalculatorItem
              image={<VirusIcon height={60} width={60} />}
              onPress={() => handleNavigation('CancerRisk')}
              backgroundColor={COLORS.red}
              title="Resiko Penyakit Kanker"
              description="Analisa dari kebiasaan dan pola makan sehari-hari anda."
            />
            <Text
              style={[
                FONTS.textBold16,
                {color: COLORS.black, marginVertical: 16, textAlign: 'center'},
              ]}>
              Butuh informasi lainya?
            </Text>
            <AskButton onPress={() => navigation.navigate('Faq')} />
            <View style={styles.margin}>
              <CalculatorItem
                image={<QuizIcon height={60} width={60} />}
                // onPress={() => handleNavigation('WeightCalculator')}
                backgroundColor={COLORS.primary}
                title="Ayo ikutan Quiz!"
                description="Uji pengetahuanmu dengan quiz
              kesehatan dari mammaSIP."
              />
            </View>
          </View>
        </ScrollView>
      )}
    </Container>
  );
};
const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  padding: {padding: 16},
  refresh: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 32,
    justifyContent: 'center',
  },
  divider: {marginVertical: 16},
  warning: {backgroundColor: COLORS.lightRed, padding: 16, borderRadius: 6},
  row: {flexDirection: 'row', alignItems: 'center'},
  foodWrapper: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 36,
  },
  foodImg: {height: SIZES.width3, width: SIZES.width2},
  titleFooter: {
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  margin: {marginTop: 32},
  changeButton: {
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 24,
  },
  justify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CalculationDetailScreen;
