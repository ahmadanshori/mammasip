import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, FlatList} from 'react-native';
import {Container} from '../components/Container';
import {LoadingComponent} from '../components/Loadings';
// import {VideoItem, ArticleItem, CalculatorItem} from '../components/Items';
import {
  DestinationContent,
  VideoContent,
  ImageContent,
  ButtonContent,
  GKSContent,
  ArticleContent,
} from '../components/Contents';
import {NoInternet, ErrorServer} from '../components/Errors';
import {HeaderTitle} from '../components/Headers';
import {getRoomTypeByIdAPI} from '../api/room';
import useErrorHandler from '../hooks/useErrorHandler';
import {AppContext} from '../index';

const RoomScreen = ({navigation, route}) => {
  const {id} = route.params;
  const {token} = useContext(AppContext);
  const [data, setData] = useState(null);
  const [load, setLoad] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resRoom = await getRoomTypeByIdAPI(id, token);
      console.log('resRoom', resRoom);
      setData(resRoom.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoad({get: false, refresh: false});
    }
  };

  const handleNavigator = useCallback(
    (link, param) => {
      navigation.navigate(link, param);
    },
    [navigation],
  );

  const handleDeeplink = (path, pathId) => {
    if (pathId && pathId > 0) {
      navigation.navigate(path, {id: pathId});
    } else {
      if (path === 'KnowYourSelf') {
        navigation.navigate(path, {id: 4});
      } else {
        navigation.navigate(path);
      }
    }
  };

  const renderItem = ({item}) => {
    if (item.typeContent === 1) {
      return <DestinationContent data={item} onPress={handleDeeplink} />;
    } else if (item.typeContent === 2) {
      return (
        <ImageContent
          data={item}
          onPress={() => handleNavigator('Image', {url: item.url})}
        />
      );
    } else if (item.typeContent === 3) {
      return <GKSContent data={item} onPress={handleDeeplink} />;
    } else if (item.typeContent === 4) {
      return (
        <ImageContent
          data={item}
          onPress={() => handleNavigator('Image', {url: item.url})}
        />
      );
    } else if (item.typeContent === 5) {
      return (
        <VideoContent
          data={item}
          onPress={() => handleNavigator('Video', {url: item.url_frame})}
        />
      );
    } else if (item.typeContent === 6) {
      return (
        <ButtonContent
          data={item}
          onPress={() => handleNavigator('Quiz', {id: item.id_kuis})}
        />
      );
    } else {
      return (
        <ArticleContent
          data={item}
          onArticle={val => handleNavigator('Article', {id: val})}
        />
      );
    }
  };

  const handleRefresh = () => {
    setError();
    setLoad(state => ({...state, refresh: true}));
    getInitialData();
  };

  return (
    <Container>
      <HeaderTitle title={data?.nama_ruang} />
      {load.get ? (
        <LoadingComponent />
      ) : (
        <View>
          <FlatList
            data={data.media}
            refreshing={load.refresh}
            onRefresh={handleRefresh}
            keyExtractor={item => item.idMedia.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50, paddingTop: 16}}
          />
        </View>
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

export default RoomScreen;
