import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {VideoDetailItem} from '../../components/Items';

import {getVideoAPI} from '../../api/room';

const ListVideoScreen = ({navigation, route}) => {
  const {id} = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState({
    get: true,
    refresh: false,
  });

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resVideo = await getVideoAPI(id);
      setData(resVideo.data.data.media);
    } catch (e) {
      //   console.log('e', e);
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

  return (
    <Container>
      <HeaderTitle back title={'Video Olahraga'} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <FlatList
          // onEndReached={nextPage}
          // onEndReachedThreshold={0.5}
          // refreshing={loading}
          // onRefresh={handleRefresh}
          data={data}
          keyExtractor={item => item.idMedia.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {padding: 16},
});

export default ListVideoScreen;
