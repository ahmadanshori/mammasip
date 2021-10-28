import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import _ from 'lodash';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {ArticleItem} from '../components/Items';
import Accordion from '../components/Accordion';
import {getArticleAPI} from '../api/article';
import formatDate from '../libs/formatDate';
import {COLORS, FONTS} from '../constants';

const ListSearchScreen = ({navigation, route}) => {
  const {title} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [query, setQuery] = useState({page: 0, totalPages: 1});

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resArticle = await getArticleAPI();
      console.log('resArticle', resArticle);
      setData(resArticle.data.data.content);
      setQuery(state => ({
        ...state,
        totalPages: resArticle.data.data.totalPages,
      }));
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading({get: true, refresh: false});
    }
  };

  const renderItem = ({item}) => (
    <ArticleItem
      onPress={() =>
        navigation.navigate('ArticleDetail', {
          id: item.idArticle,
          typeRuang: item.typeRuang,
        })
      }
      title={item.nameArticle}
      //   category={item.hastag[0]?.nameCategory}
      date={formatDate(item.createdDate)}
      source={item.media[0]?.url}
    />
  );

  return (
    <Container>
      <HeaderTitle back title={title} />

      <FlatList
        // onEndReached={nextPage}
        // onEndReachedThreshold={0.5}
        // refreshing={loading}
        // onRefresh={handleRefresh}
        data={data}
        keyExtractor={item => item.idArticle.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  scroll: {paddingHorizontal: 16, paddingBottom: 16},
  title: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListSearchScreen;
