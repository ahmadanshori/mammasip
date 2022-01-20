import React, {useEffect, useState, useCallback, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  Image,
} from 'react-native';
import {BackgroundHeader} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {Container} from '../../components/Container';
import {RoomItem} from '../../components/Items';
import {NoInternet, ErrorServer} from '../../components/Errors';
import {getRoomTypeByIdAPI} from '../../api/room';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';
import {COLORS, FONTS} from '../../constants';

const ListRoomScreen = ({route, navigation}) => {
  const {id} = route.params;
  const {token} = useContext(AppContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(id, token);
      console.log(`res`, res);
      setData(res.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };
  const onRoom = useCallback(
    roomId => {
      navigation.navigate('Room', {id: roomId});
    },
    [navigation],
  );

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };
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
            white
          />
          <View style={styles.padding}>
            {data.child_ruang.map(item => (
              <RoomItem
                key={item.id_ruang}
                title={item.nama_ruang}
                source={item.url_picture_mobile}
                onPress={() => onRoom(item.id_ruang)}
              />
            ))}
            {id === 3 ? (
              <View style={styles.body}>
                <Text
                  style={[
                    FONTS.textBold16,
                    {textAlign: 'center', marginBottom: 24},
                  ]}>
                  Seputar Pendukung Pasien dan Penyintas
                </Text>
                <View style={{...styles.box, backgroundColor: '#AE72DD'}}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/cinta1.png')}
                    style={styles.img}
                  />
                  <Text style={[FONTS.text14, styles.flex]}>
                    Bersikap Tepat Sebagai Teman dan Orang Terdekat Penyintas
                    Kanker Payudara.
                  </Text>
                </View>
                <View style={{...styles.box, backgroundColor: '#F2666E'}}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/cinta2.png')}
                    style={styles.img}
                  />
                  <Text style={[FONTS.text14, styles.flex]}>
                    Sikap Tepat Suami Pasien atau Penyintas Kanker Payudara.
                  </Text>
                </View>
                <View style={{...styles.box, backgroundColor: '#FFA4A3'}}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/cinta3.png')}
                    style={styles.img}
                  />
                  <Text style={[FONTS.text14, styles.flex]}>
                    Mari Bantu Pasien Kanker Payudara Menghadapi Stigma
                    Masyarakat yang Salah
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  padding: {paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16},
  body: {
    paddingTop: 24,
    borderTopWidth: 1,
    marginTop: 24,
    borderColor: COLORS.separator,
  },
  box: {
    padding: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  img: {height: 70, width: 70, marginRight: 24},
  flex: {flex: 1, color: COLORS.white},
});

export default ListRoomScreen;
