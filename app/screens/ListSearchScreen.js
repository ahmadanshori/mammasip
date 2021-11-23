import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {ArticleDetailItem, BookDetailItem} from '../components/Items';
import {LoadingComponent} from '../components/Loadings';
import Accordion from '../components/Accordion';
import {getArticleAPI, getBookAPI} from '../api/article';
import formatDate from '../libs/formatDate';
import {COLORS, FONTS} from '../constants';

const ListSearchScreen = ({navigation, route}) => {
  const {title} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({
    get: true,
    refresh: false,
    nextPage: false,
  });
  const [query, setQuery] = useState({page: 0, totalPages: 1});

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      if (title === 'Buku') {
        const resBook = await getBookAPI();

        setData(resBook.data.data.content);
        setQuery({
          totalPages: resBook.data.data.totalPages - 1,
          page: resBook.data.data.number,
        });
      } else {
        const resArticle = await getArticleAPI();
        // console.log('resArticle', resArticle);
        setData(resArticle.data.data.content);
        setQuery({
          totalPages: resArticle.data.data.totalPages - 1,
          page: resArticle.data.data.number,
        });
      }
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading({get: false, refresh: false, nextPage: false});
    }
  };

  const renderItem = ({item}) => (
    <>
      {title === 'Buku' ? (
        <BookDetailItem
          data={item}
          onPress={() =>
            navigation.navigate('Pdf', {
              link: 'http://103.31.38.171:8200/core-mammasip/view_file/book/book-3c7169e2-a276-4177-b7ea-fc8807867dfe-1631876324662.pdf',
            })
          }
        />
      ) : (
        <ArticleDetailItem key={item} title={item.nameArticle} />
      )}
    </>
  );

  const nextPage = async () => {
    if (query.page < query.totalPages) {
      setLoading(state => ({...state, nextPage: true}));
      try {
        const resArticle = await getArticleAPI(query.page + 1);

        setData([...data, ...resArticle.data.data.content]);
        setQuery({
          totalPages: resArticle.data.data.totalPages - 1,
          page: resArticle.data.data.number,
        });
      } catch (err) {
        // setError(err);
      } finally {
        setLoading(state => ({...state, nextPage: false}));
      }
    }
  };

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
          data={data}
          keyExtractor={item =>
            title === 'Buku'
              ? item.idBook.toString()
              : item.idArticle.toString()
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.padding}
          ListFooterComponent={() =>
            loading.nextPage && (
              <ActivityIndicator size="large" color={COLORS.primary} />
            )
          }
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  padding: {padding: 16},
});

export default ListSearchScreen;
