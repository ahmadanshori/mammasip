import React, {useState, useEffect} from 'react';
import {Linking, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {ArticleDetailItem, VideoDetailItem} from '../../components/Items';
import {dropdownalert} from '../../components/AlertProvider';

import {getArticleAPI} from '../../api/article';
import {getBookAPI, getVideoPageAPI} from '../../api/room';
import {COLORS} from '../../constants';

const BungaRampaiListScreen = ({navigation, route}) => {
  const {type, title} = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState({
    get: true,
    refresh: false,
    nextPage: false,
  });

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      let resData;
      if (type === 4) {
        resData = await getArticleAPI();
      } else if (type === 5) {
        resData = await getVideoPageAPI();
      } else {
        resData = await getBookAPI(type);
      }
      setData(resData.data.data);
    } catch (e) {
      //   console.log('e', e);
    } finally {
      setLoading({get: false, refresh: false, nextPage: false});
    }
  };

  const handleNavigator = async event => {
    if (type === 4) {
      if (event.isUrl === 0) {
        navigation.navigate('Room', {roomId: event.typeRuang});
      } else {
        const supported = await Linking.canOpenURL(event?.urlArticle);
        if (supported) {
          await Linking.openURL(event?.urlArticle);
        } else {
          dropdownalert.alertWithType(
            'warn',
            '',
            'link sedang dalam perbaikan!!',
          );
        }
      }
    } else if (type === 3) {
      const supported = await Linking.canOpenURL(event?.urlBook);
      if (supported) {
        await Linking.openURL(event?.urlBook);
      } else {
        dropdownalert.alertWithType(
          'warn',
          '',
          'website salah atau sedang dalam perbaikan!!',
        );
      }
    } else {
      navigation.navigate('Pdf', {link: event.urlBook});
    }
  };

  const renderItem = ({item}) => {
    if (type === 5) {
      return (
        <VideoDetailItem
          key={item.idMedia}
          data={item}
          narsum={item.nama_narsum}
          profesi={item.profesi_narsum}
          onPress={() => navigation.navigate('Video', {url: item.url_frame})}
        />
      );
    } else {
      return (
        <ArticleDetailItem
          title={
            type === 4
              ? item.nameArticle
              : type === 5
              ? item.kata_pengantar
              : item.nameBook
          }
          source={type === 5 ? item.url : item.urlBanner}
          date={item.createdDate}
          onPress={() => handleNavigator(item)}
        />
      );
    }
  };

  const nextPage = async () => {
    if (data.number < data.totalPages - 1) {
      setLoading(state => ({...state, nextPage: true}));
      try {
        let resData;
        if (type === 4) {
          resData = await getArticleAPI(data.number + 1);
        } else if (type === 5) {
          resData = await getVideoPageAPI(data.number + 1);
        } else {
          resData = await getBookAPI(type, data.number + 1);
        }
        setData({
          ...resData.data.data,
          content: [...data.content, ...resData.data.data.content],
        });
      } catch (err) {
        // console.log(`err`, err);
        // setError(err);
      } finally {
        setLoading(state => ({...state, nextPage: false}));
      }
    }
  };

  //   const handleRefresh = () => {
  //     setLoading(true);
  //     handleCustomerSearch(search);
  //   };

  return (
    <Container>
      <HeaderTitle back title={title} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <FlatList
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
          // refreshing={loading}
          // onRefresh={handleRefresh}
          data={data?.content}
          keyExtractor={item =>
            type === 4
              ? item.idArticle.toString()
              : type === 5
              ? item.idMedia.toString()
              : item.idBook.toString()
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            loading.nextPage && (
              <ActivityIndicator size="large" color={COLORS.primary} />
            )
          }
          contentContainerStyle={{
            padding: 16,
          }}
        />
      )}
    </Container>
  );
};

// const styles = StyleSheet.create({});

export default BungaRampaiListScreen;