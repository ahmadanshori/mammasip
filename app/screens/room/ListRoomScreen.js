import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {BackgroundHeader} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {Container} from '../../components/Container';
import {RoomItem} from '../../components/Items';
import {getRoomTypeByIdAPI} from '../../api/room';

const ListRoomScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(id);
      setData(res.data.data);
    } catch (e) {
      // console.log('e', e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };
  const onRoom = useCallback(
    roomId => {
      navigation.navigate('Room', {roomId});
    },
    [navigation],
  );

  return (
    <Container>
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView>
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
    </Container>
  );
};

const styles = StyleSheet.create({
  padding: {paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16},
});

export default ListRoomScreen;
