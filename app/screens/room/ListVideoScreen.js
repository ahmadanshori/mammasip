import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {VideoDetailItem} from '../../components/Items';
import {NoInternet, ErrorServer} from '../../components/Errors';
import {getVideoAPI} from '../../api/room';
import useErrorHandler from '../../hooks/useErrorHandler';

const ListVideoScreen = ({navigation, route}) => {
  const {id} = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState({
    get: true,
    refresh: false,
  });
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resVideo = await getVideoAPI(id);
      setData(resVideo.data.data.media);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const renderItem = ({item}) => (
    <VideoDetailItem
      key={item.idMedia}
      data={item}
      onPress={() => navigation.navigate('Video', {url: item.url_frame})}
    />
  );

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };

  return (
    <Container>
      <HeaderTitle back title={'Video Olahraga'} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <FlatList
          // onEndReached={nextPage}
          // onEndReachedThreshold={0.5}
          refreshing={loading.refresh}
          onRefresh={handleRefresh}
          data={data}
          keyExtractor={item => item.idMedia.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {padding: 16},
});

export default ListVideoScreen;
