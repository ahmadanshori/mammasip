import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {Sadari, Sadanis} from '../../components/Journal';
import {SkriningModal} from '../../components/Modals';
import {LoadingComponent} from '../../components/Loadings';
import Divider from '../../components/Divider';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import {COLORS, FONTS} from '../../constants';
import {
  getJournalSkriningAPI,
  createJournalSadariAPI,
  createJournalSadanisAPI,
  updateSadanisAPI,
  updateSadariAPI,
} from '../../api/journal';
import formatDate from '../../libs/formatDate';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';

const SkriningJournalScreen = () => {
  const {token, user, setLoading} = useContext(AppContext);
  const [data, setData] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  let convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

  const getInitialData = useCallback(async () => {
    try {
      const res = await getJournalSkriningAPI(token, user.id_user);

      let newData = [];
      res.data.data.marked_dates.map(item => {
        newData.push({
          tanggal: item.tanggal,
          dots: [
            {color: item.sadari && COLORS.red},
            {color: item.sadanis && COLORS.green},
            {color: item.haid && COLORS.primary},
          ],
        });
      });
      const convertData = convertArrayToObject(newData, 'tanggal');
      setData({...res.data.data, marked_dates: convertData});
    } catch (e) {
      setError(e);
    } finally {
      setIsLoad(false);
    }
  }, [token, user.id_user, setError]);

  const handleAddActivity = useCallback(
    async event => {
      setIsShow(false);
      setLoading(true);
      try {
        const postData = {
          id_user: user?.id_user,
          ...event,
        };
        if (selected === 'sadari') {
          if (data?.sadari_flag) {
            await updateSadariAPI(
              token,
              data?.jurnal_sadari_last[0]?.id_jurnal_sadari,
              postData,
            );
          } else {
            await createJournalSadariAPI(token, postData);
          }
        } else {
          if (data?.sadanis_flag) {
            await updateSadanisAPI(
              token,
              data?.jurnal_sadanis_last[0]?.id_jurnal_sadanis,
              postData,
            );
          } else {
            await createJournalSadanisAPI(token, postData);
          }
        }
        getInitialData();
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [data, token, setLoading, selected, user.id_user, setError, getInitialData],
  );
  const handleSkrining = val => {
    setSelected(val);
    setIsShow(true);
  };

  const handleRefresh = () => {
    setError();
    setIsLoad(true);
    getInitialData();
  };
  return (
    <Container>
      <HeaderTitle title="Jurnal skrining SADARI & SADANIS" />
      {isLoad ? (
        <LoadingComponent />
      ) : (
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.row}>
              <Text style={FONTS.textBold12}>Hari ini</Text>
              <Text
                style={[
                  FONTS.textBold12,
                  {color: COLORS.lightBlue, marginLeft: 8},
                ]}>
                {formatDate(new Date(), 'EEEE, dd MMMM yyyy')}
              </Text>
            </View>
            <View style={styles.calendar}>
              <Calendar
                current={formatDate(new Date(), 'yyyy-MM-dd')}
                monthFormat={'MMMM yyyy'}
                firstDay={1}
                disableAllTouchEventsForDisabledDays={true}
                markingType={'multi-dot'}
                markedDates={data?.marked_dates}
                enableSwipeMonths={true}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.dot}>
                <View style={styles.haid} />
                <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                  Haid
                </Text>
              </View>
              <View style={[styles.dot, {marginHorizontal: 16}]}>
                <View style={styles.sadari} />
                <Text style={[FONTS.textBold12, {color: COLORS.red}]}>
                  SADARI
                </Text>
              </View>
              <View style={styles.dot}>
                <View style={styles.sadanis} />
                <Text style={[FONTS.textBold12, {color: COLORS.green}]}>
                  SADANIS
                </Text>
              </View>
            </View>
          </View>
          <Divider />
          <View style={styles.wrapper}>
            <Text style={[FONTS.textBold16, styles.margin8]}>SADARI</Text>
            <Text style={FONTS.text12}>Pemeriksaan Payudara Sendiri</Text>
            <Sadari
              data={data?.jurnal_sadari_last}
              flag={data?.sadari_flag}
              getInitialData={getInitialData}
              onPress={() => handleSkrining('sadari')}
            />
          </View>
          <Divider />
          <View style={styles.wrapper}>
            <Text style={[FONTS.textBold16, styles.margin8]}>SADANIS</Text>
            <Text style={FONTS.text12}>Pemeriksaan Payudara Klinis</Text>
            <Sadanis
              data={data?.jurnal_sadanis_last}
              flag={data?.sadanis_flag}
              onPress={() => handleSkrining('sadanis')}
            />
          </View>
        </ScrollView>
      )}
      {isShow && (
        <SkriningModal
          selected={selected}
          onClose={() => setIsShow(false)}
          onAddPress={handleAddActivity}
        />
      )}
      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 16, paddingVertical: 24},
  row: {flexDirection: 'row', alignItems: 'center'},
  calendar: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 4,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  icon: {marginRight: 8},
  information: {
    color: COLORS.black,
    marginBottom: 16,
    marginTop: 32,
    textAlign: 'center',
  },
  margin8: {marginBottom: 8},
  sadari: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginRight: 4,
    backgroundColor: COLORS.red,
  },
  sadanis: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginRight: 4,
    backgroundColor: COLORS.green,
  },
  haid: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginRight: 4,
    backgroundColor: COLORS.primary,
  },
  dot: {flexDirection: 'row', alignItems: 'center', marginTop: 16},
});
export default SkriningJournalScreen;
