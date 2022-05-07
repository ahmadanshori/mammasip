import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import debounce from 'lodash/debounce';
import {Container} from '../../components/Container';
import {SearchHeader} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';
import {AgendaItem} from '../../components/Items';
import {COLORS, FONTS, SIZES} from '../../constants';
import {getAgendaAPI, searchAgendaAPI} from '../../api/agenda';

const AgendaScreen = ({navigation}) => {
  const {token} = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [data, setData] = useState();
  const [loading, setLoading] = useState({
    get: true,
    refresh: false,
    next: false,
  });
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitalData();
  }, []);

  const getInitalData = async () => {
    try {
      const res = await getAgendaAPI(token);
      setData(res.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const renderItem = ({item}) => (
    <AgendaItem
      data={item}
      onPress={() => navigation.navigate('AgendaDetail', {id: item.idEvent})}
    />
  );
  const handleSearch = async text => {
    setSearch(text);
    setLoading(state => ({...state, refresh: true}));
    handleCustomerSearch(text);
  };

  const handleCustomerSearch = debounce(async text => {
    try {
      const formData = new FormData();
      formData.append('search', text);
      const res = await searchAgendaAPI(token, formData);
      setData({number: 0, totalPages: 1, content: res.data.data});
    } catch (e) {
      setError(e);
    } finally {
      setLoading(state => ({...state, refresh: false}));
    }
  }, 500);

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitalData();
  };

  const nextPage = async () => {
    if (data.number < data.totalPages - 1) {
      setLoading(state => ({...state, next: true}));
      try {
        const res = await getAgendaAPI(token, data.number + 1);
        setData({
          ...res.data.data,
          content: [...data.content, ...res.data.data.content],
        });
      } catch (e) {
        setError(e);
      } finally {
        setLoading(state => ({...state, next: false}));
      }
    }
  };

  return (
    <Container>
      <SearchHeader
        search={search}
        handleSearch={handleSearch}
        title="Agenda Pertemuan"
        desc="Ikuti dan Dapatkan Informasi Seputar Payudara"
        placeholder="Cari Agenda?"
        source={require('../../assets/images/agenda.jpg')}
      />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <>
          {data.content?.length ? (
            <FlatList
              onEndReached={nextPage}
              onEndReachedThreshold={0.5}
              refreshing={loading.refresh}
              onRefresh={handleRefresh}
              data={data.content}
              keyExtractor={item => item.idEvent.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <Text style={styles.title}>Agenda yang akan datang</Text>
              }
              ListFooterComponent={() =>
                loading.next ? (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                ) : null
              }
              contentContainerStyle={styles.list}
            />
          ) : (
            <View style={styles.notFound}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/agendaNotFound.png')}
                style={styles.img}
              />
              <Text style={styles.notFoundText}>
                Saat ini belum ada event yang akan berlangsung, Yuk check
                artikel atau ruang-ruang MammaSIP
              </Text>
            </View>
          )}
        </>
      )}

      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  title: {...FONTS.textBold14, color: COLORS.black, marginBottom: 16},
  list: {padding: 16},
  notFound: {alignItems: 'center', marginTop: 42, paddingHorizontal: 18},
  img: {height: SIZES.width1, width: '70%'},
  notFoundText: {...FONTS.text14, color: COLORS.secondary, textAlign: 'center'},
});
export default AgendaScreen;
