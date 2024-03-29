import React, {useState, useContext, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {SportItem} from '../../components/Journal';
import {ActivityModal} from '../../components/Modals';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
// import Reminder from '../../components/Reminder';
// import Divider from '../../components/Divider';
// import {AskButton} from '../../components/Buttons';
import {createJournalSportAPI, getJournalSportAPI} from '../../api/journal';
import {COLORS, FONTS, SIZES} from '../../constants';
import {AppContext} from '../../index';
import formatDate from '../../libs/formatDate';
import useErrorHandler from '../../hooks/useErrorHandler';

const SportsJournalScreen = () => {
  const {token, user, setLoading} = useContext(AppContext);
  const [isActivity, setIsActivity] = useState(false);
  // const [time, setTime] = useState(null);
  // const [isCalendar, setIsCalendar] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [journalData, setJournalData] = useState(null);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = useCallback(async () => {
    try {
      const res = await getJournalSportAPI(token, user.id_user);
      let newData = [];
      res.data.data.jurnal_olahraga_last.map(item => {
        newData.push({...item, date: formatDate(item.created_date, 'dd/MM')});
      });
      setJournalData({...res.data.data, jurnal_olahraga_last: newData});
    } catch (e) {
      setError(e);
    } finally {
      setIsLoad(false);
    }
  }, [token, user.id_user, setError]);

  const handleAddActivity = useCallback(
    async value => {
      setIsActivity(false);
      setLoading(true);
      try {
        const postData = {
          id_user: user?.id_user,
          lama_berolahraga: value.time,
          level_olahraga: value.activity,
        };
        await createJournalSportAPI(token, postData);
        const res = await getJournalSportAPI(token, user.id_user);
        let newData = [];
        res.data.data.jurnal_olahraga_last.map(item => {
          newData.push({...item, date: formatDate(item.created_date, 'dd/MM')});
        });
        setJournalData({...res.data.data, jurnal_olahraga_last: newData});
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [token, setLoading, user.id_user, setError],
  );

  const handleRefresh = useCallback(() => {
    setError();
    setIsLoad(true);
    getInitialData();
  }, [setError, getInitialData]);
  // const handleReminder = () => {
  //   setIsReminder(false);
  // };
  // const handleCloseReminder = () => {
  //   setIsReminder(false);
  //   setTime(null);
  // };
  // const onChange = event => {
  //   setIsCalendar(false);
  //   setTime(event);
  // };

  return (
    <Container>
      <HeaderTitle title="Jurnal olahraga Anda" />
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
                  <Text style={FONTS.text12}>Aktivitas dalam seminggu</Text>
                  <View style={styles.row}>
                    <Text style={FONTS.textBold24}>
                      {journalData?.jurnal_olahraga_total}
                    </Text>
                    <Text
                      style={[
                        FONTS.text16,
                        {color: COLORS.gray, marginLeft: 6},
                      ]}>
                      Menit
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={FONTS.text12}>Rekomendasi</Text>
                  <View style={styles.row}>
                    <Text style={[FONTS.textBold24, {color: COLORS.green}]}>
                      {journalData?.jurnal_olahraga_rekomendasi}
                    </Text>
                    <Text
                      style={[
                        FONTS.text16,
                        {color: COLORS.gray, marginLeft: 6},
                      ]}>
                      Menit
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setIsActivity(true)}
                  style={styles.circleIcon}>
                  <Icon name="pluscircle" size={50} color={COLORS.darkBlue} />
                </TouchableOpacity>
              </View>
              <View style={styles.pengingat}>
                <MaterialCommunityIcons
                  name={'alert-circle'}
                  size={20}
                  color={COLORS.darkBlue}
                />
                <Text style={[FONTS.text12, {flex: 1, marginLeft: 12}]}>
                  Sahabat MammaSIP dalam seminggu sebaiknya berolahraga selama{' '}
                  <Text style={FONTS.textBold12}>150 </Text>
                  menit untuk olahraga sedang, dan{' '}
                  <Text style={FONTS.textBold12}>75 </Text> menit untuk olahraga
                  berat.
                </Text>
              </View>
              {journalData.jurnal_olahraga_last.length ? (
                <>
                  <View style={styles.row}>
                    <View style={styles.margin}>
                      <Text
                        style={[
                          FONTS.textBold12,
                          {transform: [{rotate: '270deg'}]},
                        ]}>
                        Menit
                      </Text>
                    </View>
                    <VictoryChart
                      width={SIZES.width}
                      theme={VictoryTheme.material}
                      domainPadding={10}>
                      <VictoryBar
                        data={journalData?.jurnal_olahraga_last.reverse()}
                        x="date"
                        y="lama_berolahraga"
                        // cornerRadius={{topLeft: data => console.log(`datum`, data)}}
                        style={{data: {fill: COLORS.secondary}}}
                      />
                    </VictoryChart>
                  </View>
                  <Text style={[FONTS.textBold12, styles.tanggal]}>
                    Tanggal
                  </Text>
                  <View style={styles.history}>
                    {journalData?.jurnal_olahraga_last.map(item => (
                      <SportItem key={item.id_jurnal_olahraga} data={item} />
                    ))}
                  </View>
                </>
              ) : null}

              {/* <Reminder
            onPress={() => setIsReminder(true)}
            time={time}
            title="Reminder Harian Aktif"
          /> */}
            </View>
          </ScrollView>
        )}

        {isActivity && (
          <ActivityModal
            onClose={() => setIsActivity(false)}
            onAddPress={handleAddActivity}
          />
        )}
      </KeyboardAvoidingView>
      {/* {isReminder && (
        <ReminderModals
          onCalendar={() => setIsCalendar(true)}
          time={time}
          onSave={handleReminder}
          onClose={handleCloseReminder}
        />
      )} */}

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
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  pengingat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F6FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 24,
  },
  margin: {
    marginLeft: -16,
    marginRight: -16,
  },
  tanggal: {color: COLORS.black, textAlign: 'center', marginTop: -16},

  history: {marginTop: 24},
  circleIcon: {elevation: 10, backgroundColor: COLORS.white, borderRadius: 50},
});
export default SportsJournalScreen;
