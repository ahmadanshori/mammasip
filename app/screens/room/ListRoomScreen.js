import React, {useEffect, useState, useCallback, useContext} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {BackgroundHeader} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {Container} from '../../components/Container';
import {RoomItem} from '../../components/Items';
import {NoInternet, ErrorServer} from '../../components/Errors';
import {getRoomTypeByIdAPI} from '../../api/room';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';

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
                onPress={() => onRoom(item.id_ruang)}
              />
            ))}
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
});

export default ListRoomScreen;
