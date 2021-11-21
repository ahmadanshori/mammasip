import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import {HeaderTitle} from '../components/Headers';
import {HomeItem} from '../components/Items';
import {VideoRecomendation} from '../components/Search';
import {LoadingComponent} from '../components/Loadings';
// import {VideoDetailItem} from '../components/Items';
import {getRoomByParentAPI} from '../api/room';
import {getArticleByRuangAPI} from '../api/article';
import {COLORS} from '../constants';
import {AppContext} from '../index';

const RoomScreen = ({navigation, route}) => {
  const {idRuang, title} = route.params;
  const {user, token} = useContext(AppContext);
  const [data, setData] = useState([]);
  // const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomByParentAPI(idRuang);
      // const resArticle = await getArticleByRuangAPI(idRuang);
      console.log(`res`, res);
      setData(res.data.data);
    } catch (e) {
      console.log('e', {...e});
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const renderItem = ({item, index}) => (
    <HomeItem
      data={item}
      key={item.id_ruang}
      onPress={() => navigation.navigate('ArticleDetail', {typeRuang: 9})}
      colorId={item.flag_mobile_color}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <>
          <HeaderTitle title={title} backgroundColor={COLORS.primary} white />
          {/* <View>
            <View style={styles.header} />
            <View style={{marginTop: -40, paddingHorizontal: 16}}>
              <HomeItem
                title={data?.nama_ruang}
                desc={data?.description}
                // color={data.color}
                style={styles.category}
                // source={data.source}
                // image={data.image}
              />
            </View>
          </View> */}
          <FlatList
            // onEndReached={nextPage}
            // onEndReachedThreshold={0.5}
            // refreshing={loading}
            // onRefresh={handleRefresh}
            data={data}
            keyExtractor={item => item.id_ruang.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.padding}
          />
        </>
      )}
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {height: 40, backgroundColor: COLORS.primary},
  category: {elevation: 8},
  padding: {padding: 16},
});
