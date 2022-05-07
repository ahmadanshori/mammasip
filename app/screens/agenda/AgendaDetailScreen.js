import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Linking,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';
import {COLORS, FONTS} from '../../constants';
import {getAgendaDetailAPI} from '../../api/agenda';
import formatDate from '../../libs/formatDate';
import {LoadingComponent} from '../../components/Loadings';

const AgendaScreen = ({route}) => {
  const {id} = route.params;
  const {token} = useContext(AppContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitalData();
  }, []);

  const getInitalData = async () => {
    try {
      const res = await getAgendaDetailAPI(token, id);
      setData(res.data.data[0]);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const linkHandler = useCallback(async () => {
    await Linking.openURL(data?.linkPendaftaran);
  }, [data?.linkPendaftaran]);

  const handleRefresh = () => {
    setError();
    setLoading({get: false, refresh: true});
    getInitalData();
  };

  return (
    <Container>
      <HeaderTitle title={'Detail Agenda'} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={handleRefresh}
              refreshing={loading.refresh}
            />
          }>
          <Text style={styles.title}>{data?.namaEvent}</Text>
          <View style={styles.wrapper}>
            <View style={styles.row}>
              <Icon name="calendar" size={16} color={COLORS.secondary} />
              <Text style={styles.date}>
                {formatDate(data?.startDate, 'eeee, dd MMMM yyyy')}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="clock-o" size={16} color={COLORS.gray} />
              <Text style={styles.time}>
                {formatDate(data?.startDate, 'HH:mm')}
              </Text>
            </View>
          </View>
          <Text style={styles.register}>Link Pendaftaran</Text>
          <Text style={styles.link} onPress={linkHandler}>
            {data?.linkPendaftaran}
          </Text>
          <Text style={styles.desc}>{data?.description}</Text>
        </ScrollView>
      )}
      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  scroll: {padding: 16},
  title: {...FONTS.textBold18},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  date: {
    ...FONTS.textBold12,
    color: COLORS.secondary,
    marginLeft: 8,
    marginRight: 24,
  },
  time: {...FONTS.textBold12, color: COLORS.gray, marginLeft: 8},
  register: {...FONTS.textBold12, marginBottom: 4},
  link: {...FONTS.textBold12, color: COLORS.blue, marginBottom: 16},
  desc: {...FONTS.text14, color: COLORS.black},
});
export default AgendaScreen;
