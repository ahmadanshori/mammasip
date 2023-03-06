import React, {useState, useCallback, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Container} from '../../components/Container';
import {MainButton} from '../../components/Buttons';
import {HeaderTitle} from '../../components/Headers';
import {WeightItem} from '../../components/Journal';
import {WeightModal} from '../../components/Modals';
import {LoadingComponent} from '../../components/Loadings';
import Divider from '../../components/Divider';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import {createJournalWeightAPI, getJournalWeightAPI} from '../../api/journal';
import {COLORS, FONTS, SIZES} from '../../constants';
import {AppContext} from '../../index';
import useErrorHandler from '../../hooks/useErrorHandler';

// import {VideoItem} from '../../components/Items';
// import MealSuggestions from '../../components/MealSuggestions';
// import Reminder from '../../components/Reminder';
// import {dropdownalert} from '../../components/AlertProvider';

const WeightJournalScreen = ({navigation}) => {
  const {token, user, setLoading} = useContext(AppContext);
  const [isActivity, setIsActivity] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getJournalWeightAPI(token, user.id_user);
      setData(res.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoad(false);
    }
  };

  const handleCreateJournal = useCallback(
    async value => {
      setIsActivity(false);
      setLoading(true);
      try {
        const postData = {id_user: user?.id_user, ...value};
        await createJournalWeightAPI(token, postData);
        const res = await getJournalWeightAPI(token, user.id_user);
        setData(res.data.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [token, user?.id_user, setError, setLoading],
  );

  const handleRefresh = () => {
    setError();
    setIsLoad(true);
    getInitialData();
  };

  return (
    <Container>
      <HeaderTitle title="Jurnal berat badan Anda" />
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={40}
        style={styles.flex}
        enabled={Platform.OS === 'ios' ? true : false}>
        {isLoad ? (
          <LoadingComponent />
        ) : (
          <ScrollView>
            <View style={styles.wrapper}>
              <View style={styles.header}>
                <View>
                  <Text style={FONTS.text12}>Berat Badan Terakhir</Text>
                  {data?.jurnal_imt_berat_terakhir ? (
                    <View style={styles.row}>
                      <Text style={FONTS.textBold24}>
                        {data?.jurnal_imt_berat_terakhir}
                      </Text>
                      <Text
                        style={[
                          FONTS.text16,
                          {color: COLORS.gray, marginLeft: 6},
                        ]}>
                        Kg
                      </Text>
                    </View>
                  ) : null}
                </View>
                {data?.jurnal_imt_ideal ? (
                  <View>
                    <Text style={FONTS.text12}>Ideal</Text>
                    <View style={styles.row}>
                      <Text style={[FONTS.textBold24, {color: COLORS.green}]}>
                        {Math.round(data?.jurnal_imt_ideal)} -{' '}
                        {Math.round(data?.jurnal_imt_ideal_next)}
                      </Text>
                      <Text
                        style={[
                          FONTS.text16,
                          {color: COLORS.gray, marginLeft: 6},
                        ]}>
                        Kg
                      </Text>
                    </View>
                  </View>
                ) : null}
                <TouchableOpacity
                  onPress={() => setIsActivity(true)}
                  style={{
                    elevation: 10,
                    backgroundColor: COLORS.white,
                    borderRadius: 50,
                  }}>
                  <Icon name="pluscircle" size={50} color={COLORS.darkBlue} />
                </TouchableOpacity>
              </View>
              {data?.jurnal_imt_kondisi_terakhir ? (
                <Image
                  resizeMode="contain"
                  source={
                    data?.jurnal_imt_kondisi_terakhir === 'Under Weigth'
                      ? require('../../assets/images/1.png')
                      : data?.jurnal_imt_kondisi_terakhir === 'Normal Weight'
                      ? require('../../assets/images/2.png')
                      : data?.jurnal_imt_kondisi_terakhir === 'Over Weigth'
                      ? require('../../assets/images/3.png')
                      : data?.jurnal_imt_kondisi_terakhir === 'Obesity I'
                      ? require('../../assets/images/4.png')
                      : require('../../assets/images/5.png')
                  }
                  style={styles.img}
                />
              ) : null}

              {data.jurnal_imt_last.map(item => (
                <WeightItem key={item.id_jurnal_imt} data={item} />
              ))}
            </View>
            <Divider />
            <View style={styles.wrapper}>
              <Text
                style={[
                  FONTS.textBold16,
                  {color: COLORS.black, marginBottom: 8},
                ]}>
                Saran Menu Makanan
              </Text>
              <View style={styles.foodWrapper}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/icons/food.png')}
                  style={styles.foodImg}
                />
              </View>
              <MainButton
                title="Pilih Jumlah Kalori"
                onPress={() => navigation.navigate('CaloriesJournal')}
              />
            </View>
          </ScrollView>
        )}

        {/* {isReminder && (
        <ReminderModals
          onCalendar={() => setIsCalendar(true)}
          time={time}
          onSave={handleReminder}
          onClose={handleCloseReminder}
        />
      )} */}
        {isActivity && (
          <WeightModal
            onClose={() => setIsActivity(false)}
            onAddPress={handleCreateJournal}
          />
        )}
      </KeyboardAvoidingView>
      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  flex: {flex: 1},
  wrapper: {paddingHorizontal: 16, paddingVertical: 24},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  warningWrapper: {
    backgroundColor: COLORS.lightRed,
    padding: 16,
    borderRadius: 6,
  },
  changeButton: {
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 24,
  },

  warning: {flexDirection: 'row', alignItems: 'center'},
  foodWrapper: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 36,
  },
  foodImg: {height: SIZES.width3, width: SIZES.width2},
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  graphStyle: {backgroundColor: COLORS.white},
  icon: {marginRight: 8},
  img: {
    height: SIZES.width2,
    width: SIZES.width,
    marginBottom: 32,
    marginTop: 8,
    marginLeft: -16,
  },
});
export default WeightJournalScreen;
