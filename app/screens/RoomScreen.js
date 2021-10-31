import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import {HeaderTitle} from '../components/Headers';
import {HomeItem} from '../components/Items';
import {VideoRecomendation} from '../components/Search';
import {LoadingComponent} from '../components/Loadings';
import {getRoomTypeByIdAPI} from '../api/room';
import {COLORS} from '../constants';
import {AppContext} from '../index';

const RoomScreen = ({navigation, route}) => {
  const {idRuang} = route.params;
  const {user, token} = useContext(AppContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(token, idRuang);
      console.log(`res`, res);
      setData(res.data.data[0]);
    } catch (e) {
      console.log('e', {...e});
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <>
          <HeaderTitle
            title={data?.parent_ruang}
            backgroundColor={COLORS.primary}
            white
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                styles.header,
                {
                  backgroundColor: COLORS.primary,
                },
              ]}>
              <HomeItem
                title={data?.nama_ruang}
                desc={data?.description}
                // color={data.color}
                style={styles.category}
                // source={data.source}
                // image={data.image}
              />
            </View>
            <View style={styles.padding}>
              <VideoRecomendation
                onPress={() => navigation.navigate('VideoDetail')}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  header: {height: 40, paddingHorizontal: 16},
  category: {elevation: 8},
  padding: {paddingHorizontal: 16, marginTop: 56},
});
