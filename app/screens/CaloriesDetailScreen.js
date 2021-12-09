import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {LoadingComponent} from '../components/Loadings';
import Divider from '../components/Divider';
import MealSuggestions from '../components/MealSuggestions';
import {getHealtyCaloriesByIdAPI} from '../api/healtyMenu';
import {COLORS, FONTS, SIZES} from '../constants';
import caloriesCalculation from '../libs/caloriesCalculation';
import {AppContext} from '../index';

const pekanData = [
  {id: 1, name: 'Pekan 1'},
  {id: 2, name: 'Pekan 2'},
  {id: 3, name: 'Pekan 3'},
  {id: 4, name: 'Pekan 4'},
];

const CaloriesDetailScreen = ({route}) => {
  const {caloriesData} = route.params;
  const {token} = useContext(AppContext);
  const [pekan, setPekan] = useState({id: 1, name: 'Pekan 1'});
  const [foodMenuData, setFoodMenuData] = useState(null);

  const [loading, setLoading] = useState({
    get: true,
    menu: false,
    pekan: false,
    refresh: false,
  });

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resMenu = await getHealtyCaloriesByIdAPI(
        token,
        caloriesData.tipe_menu_sehat,
        pekan.id,
      );
      const calculation = caloriesCalculation(
        resMenu.data.data[0].menuPekan[0],
      );
      setFoodMenuData(calculation);
    } catch (err) {
      //   console.log('er', err, {...err});
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handlePekan = useCallback(
    async event => {
      setLoading(state => ({...state, pekan: true}));
      const oldData = pekan;
      try {
        setPekan(event);
        const resMenu = await getHealtyCaloriesByIdAPI(
          token,
          caloriesData?.tipe_menu_sehat,
          event.id,
        );
        const calculation = caloriesCalculation(
          resMenu.data.data[0].menuPekan[0],
        );
        setFoodMenuData(calculation);
      } catch (e) {
        // console.log('e', e);
        setPekan(oldData);
      } finally {
        setLoading(state => ({...state, pekan: false}));
      }
    },
    [pekan, token, caloriesData?.tipe_menu_sehat],
  );

  return (
    <Container>
      <HeaderTitle title="Atur menu makanan" />
      {loading?.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
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
                    <View style={[styles.row, {marginBottom: 8}]}>
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
                      <MealSuggestions data={foodMenuData} />
                    )}
                  </View>
                </>
              ) : null}
            </>
          )}
        </ScrollView>
      )}
    </Container>
  );
};
const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  margin: {marginTop: 80},
  pekan: {width: '25%', alignItems: 'center', paddingBottom: 4, paddingTop: 16},
  pekenActive: {borderBottomWidth: 1, borderColor: COLORS.primary},
  padding: {padding: 16},
});

export default CaloriesDetailScreen;
