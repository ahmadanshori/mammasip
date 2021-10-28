import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import {HeaderTitle} from '../components/Headers';
import {HomeItem} from '../components/Items';
import {VideoRecomendation} from '../components/Search';
import {getTopPenyuluhanAPI} from '../api/penyuluhan';
import {COLORS} from '../constants';
import {AppContext} from '../index';

const RoomScreen = ({navigation, route}) => {
  const {data} = route.params;
  const {user, token} = useContext(AppContext);
  const [penyuluhanData, setPenyuluhanData] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resPenyuluhan = await getTopPenyuluhanAPI(token);
      console.log('resPenyuluhan', resPenyuluhan);
      setPenyuluhanData(resPenyuluhan.data.data);
    } catch (e) {
      console.log('e', {...e});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={data.color} barStyle={'light-content'} />
      <HeaderTitle title={data.title} backgroundColor={data.color} white />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: data.color,
            },
          ]}>
          <HomeItem
            title={data.name}
            desc={data.desc}
            color={data.color}
            style={styles.category}
            source={data.source}
            image={data.image}
          />
        </View>
        <View style={styles.padding}>
          <VideoRecomendation
            onPress={() => navigation.navigate('VideoDetail')}
          />
        </View>
      </ScrollView>
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
