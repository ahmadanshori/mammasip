import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {ArticleDetailItem, BookDetailItem} from '../components/Items';
import {LoadingComponent} from '../components/Loadings';
import {NoInternet, ErrorServer} from '../components/Errors';
import {getArticleAPI, getBookAPI} from '../api/article';
import {COLORS} from '../constants';
import useErrorHandler from '../hooks/useErrorHandler';

const ListSearchScreen = ({navigation, route}) => {
  const {title} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({
    get: true,
    refresh: false,
    nextPage: false,
  });
  const [query, setQuery] = useState({page: 0, totalPages: 1});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      if (title === 'Buku') {
        const resBook = await getBookAPI();
        console.log(`resBook`, resBook);
        setData(resBook.data.data.content);
        setQuery({
          totalPages: resBook.data.data.totalPages - 1,
          page: resBook.data.data.number,
        });
      } else {
        const resArticle = await getArticleAPI();
        setData(resArticle.data.data.content);
        setQuery({
          totalPages: resArticle.data.data.totalPages - 1,
          page: resArticle.data.data.number,
        });
      }
    } catch (e) {
      setError(e);
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
      } catch (e) {
        setError(e);
      } finally {
        setLoading(state => ({...state, nextPage: false}));
      }
    }
  };

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
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
          refreshing={loading.refresh}
          onRefresh={handleRefresh}
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
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  padding: {padding: 16},
});

export default ListSearchScreen;
