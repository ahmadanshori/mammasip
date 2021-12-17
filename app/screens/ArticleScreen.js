import React, {useState, useEffect, useMemo} from 'react';
import {Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {LoadingComponent} from '../components/Loadings';
import {NoInternet, ErrorServer} from '../components/Errors';
// import Accordion from '../components/Accordion';
import {getArticleByIdAPI} from '../api/article';
import formatDate from '../libs/formatDate';
import {COLORS, SIZES, FONTS} from '../constants';
import useErrorHandler from '../hooks/useErrorHandler';

const ArticleScreen = ({route}) => {
  const {id} = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  const html = useMemo(() => {
    return `<html>
  <head>
  </head>
  <body>
  ${data?.bodyArticle}
  </body>
</html>`;
  }, [data?.bodyArticle]);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getArticleByIdAPI(id);
      setData(res.data.data[0]);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };

  return (
    <Container>
      <HeaderTitle back title="Artikel" />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={handleRefresh}
              refreshing={loading.refresh}
            />
          }
          contentContainerStyle={styles.container}>
          <Text
            style={[
              FONTS.textBold16,
              {color: COLORS.black, textAlign: 'center', marginTop: 16},
            ]}>
            {data?.nameArticle}
          </Text>
          <Text style={[FONTS.text10, {color: COLORS.gray, marginTop: 8}]}>
            Dipublikasi pada{' '}
            {formatDate(data?.createdDate, 'dd MMMM yyyy HH:mm')}
          </Text>
          <RenderHtml
            contentWidth={SIZES.width}
            source={{
              html: html,
            }}
          />
        </ScrollView>
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  scroll: {paddingHorizontal: 16, paddingBottom: 16},
  container: {paddingHorizontal: 16},
  title: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArticleScreen;
