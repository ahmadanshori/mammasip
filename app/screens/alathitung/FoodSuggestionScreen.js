import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {MainButton} from '../../components/Buttons';
import {LoadingComponent} from '../../components/Loadings';
import Divider from '../../components/Divider';
import MealSuggestions from '../../components/MealSuggestions';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';

import {
  getHealtyCaloriesAPI,
  getHealtyCaloriesByIdAPI,
} from '../../api/healtyMenu';
import {COLORS, FONTS, SIZES} from '../../constants';
import caloriesCalculation from '../../libs/caloriesCalculation';
import {AppContext} from '../../index';
import useErrorHandler from '../../hooks/useErrorHandler';

const pekanData = [
  {id: 1, name: 'Pekan 1'},
  {id: 2, name: 'Pekan 2'},
  {id: 3, name: 'Pekan 3'},
  {id: 4, name: 'Pekan 4'},
];

const FoodSuggestionScreen = ({navigation, route}) => {
  const calculationId = route.params.calculationId || null;
  const handleCalculationId = route.params.handleCalculationId || null;
  const {token} = useContext(AppContext);
  const [calories, setCalories] = useState(
    calculationId ? {tipe_menu_sehat: calculationId?.calorieId} : null,
  );
  const [totalCaloriesData, setTotalCaloriesData] = useState([]);
  const [pekan, setPekan] = useState(
    calculationId
      ? {id: calculationId.pekanId, name: calculationId.name}
      : {id: 1, name: 'Pekan 1'},
  );
  const [foodMenuData, setFoodMenuData] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [loading, setLoading] = useState({
    get: true,
    menu: false,
    pekan: false,
    refresh: false,
  });
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resHealtyCalories = await getHealtyCaloriesAPI(token);
      setTotalCaloriesData(resHealtyCalories.data.data);

      if (calculationId) {
        const resMenu = await getHealtyCaloriesByIdAPI(
          token,
          calories.tipe_menu_sehat,
          pekan.id,
        );
        const calculation = caloriesCalculation(
          resMenu.data.data[0].menuPekan[0],
        );
        setFoodMenuData(calculation);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleCalorie = useCallback(
    async item => {
      setLoading(state => ({...state, menu: true}));
      setFoodMenuData(null);
      try {
        setIsSelect(true);
        setCalories(item);
        const resMenu = await getHealtyCaloriesByIdAPI(
          token,
          item.tipe_menu_sehat,
          pekan.id,
        );

        const calculation = caloriesCalculation(
          resMenu.data.data[0].menuPekan[0],
        );
        setFoodMenuData(calculation);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(state => ({...state, menu: false}));
      }
    },
    [token, pekan.id, setError],
  );

  const handlePekan = useCallback(
    async event => {
      setLoading(state => ({...state, pekan: true}));
      const oldData = pekan;
      try {
        setPekan(event);
        const resMenu = await getHealtyCaloriesByIdAPI(
          token,
          calories?.tipe_menu_sehat,
          event.id,
        );
        const calculation = caloriesCalculation(
          resMenu.data.data[0].menuPekan[0],
        );
        setFoodMenuData(calculation);
      } catch (e) {
        setError(e);
        setPekan(oldData);
      } finally {
        setLoading(state => ({...state, pekan: false}));
      }
    },
    [pekan, token, calories?.tipe_menu_sehat, setError],
  );

  const handleSave = () => {
    handleCalculationId({
      calorieId: calories.tipe_menu_sehat,
      pekanId: pekan.id,
      name: pekan.name,
    });
    navigation.goBack();
  };

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };

  return (
    <Container>
      <HeaderTitle title="Atur menu makanan" />
      {loading?.get ? (
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
          <Text
            style={[
              FONTS.textBold12,
              {color: COLORS.black, marginLeft: 16, marginTop: 24},
            ]}>
            Pilih Total Kalori (Kkal)
          </Text>
          <ScrollView
            horizontal
            contentContainerStyle={styles.listCalories}
            showsHorizontalScrollIndicator={true}>
            {totalCaloriesData.map(item => (
              <TouchableOpacity
                style={[
                  styles.caloriesItem,
                  calories?.tipe_menu_sehat === item.tipe_menu_sehat
                    ? styles.active
                    : styles.inActive,
                ]}
                onPress={() => handleCalorie(item)}
                activeOpacity={SIZES.opacity}
                key={item.tipe_menu_sehat}>
                <Text
                  style={[
                    FONTS.text12,
                    calories?.tipe_menu_sehat === item.tipe_menu_sehat
                      ? styles.textActive
                      : styles.textInactive,
                  ]}>
                  {item.keterangan}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {loading.menu ? (
            <View style={styles.margin}>
              <LoadingComponent />
            </View>
          ) : (
            <>
              {foodMenuData ? (
                <>
                  <View style={styles.row}>
                    {pekanData.map(item => (
                      <TouchableOpacity
                        key={item.id}
                        activeOpacity={SIZES.opacity}
                        onPress={() => handlePekan(item)}
                        style={[
                          styles.pekan,
                          pekan?.id === item.id && styles.pekenActive,
                        ]}>
                        <Text style={[FONTS.text12]}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Divider />
                  <View style={styles.padding}>
                    <View style={styles.row}>
                      <MaterialCommunityIcons
                        name="silverware-fork-knife"
                        size={16}
                      />
                      <Text
                        style={[
                          FONTS.textBold14,
                          {color: COLORS.black, marginLeft: 10},
                        ]}>
                        Saran Menu Makanan
                      </Text>
                    </View>
                    {loading.pekan ? (
                      <View style={styles.margin}>
                        <LoadingComponent />
                      </View>
                    ) : (
                      <>
                        <MealSuggestions data={foodMenuData} />
                        <Divider height={1} />
                        <MainButton
                          title="Simpan"
                          style={styles.saveButton}
                          onPress={handleSave}
                        />
                      </>
                    )}
                  </View>
                </>
              ) : null}
            </>
          )}
        </ScrollView>
      )}
      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  listCalories: {paddingHorizontal: 8, marginVertical: 16},
  caloriesItem: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  active: {backgroundColor: COLORS.shadowPrimary, borderColor: COLORS.primary},
  inActive: {backgroundColor: COLORS.white, borderColor: COLORS.white},
  textActive: {color: COLORS.primary},
  textInactive: {color: COLORS.black},
  row: {flexDirection: 'row', alignItems: 'center'},
  suggestion: {color: COLORS.primary, flex: 1, marginLeft: 8},
  margin: {marginTop: 80},
  pekan: {width: '25%', alignItems: 'center', paddingBottom: 4, paddingTop: 24},
  pekenActive: {borderBottomWidth: 1, borderColor: COLORS.primary},
  padding: {padding: 16},

  saveButton: {marginTop: 24},
});

export default FoodSuggestionScreen;
