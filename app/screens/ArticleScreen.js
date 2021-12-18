import React, {useState, useEffect, useMemo} from 'react';
import {Text, StyleSheet, ScrollView, View, RefreshControl} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {WebView} from 'react-native-webview';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {LoadingComponent} from '../components/Loadings';
import {NoInternet, ErrorServer} from '../components/Errors';
// import Accordion from '../components/Accordion';
import {getArticleByIdAPI} from '../api/article';
// import formatDate from '../libs/formatDate';
import {SIZES} from '../constants';
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
      <HeaderTitle back title={data?.nameArticle} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <View style={styles.webview}>
          <WebView
            originWhitelist={['*']}
            source={{html: data?.bodyArticle}}
            containerStyle={[styles.webview]}
            scrollEnabled
          />
        </View>
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  webview: {height: SIZES.height, width: '100%'},
});

export default ArticleScreen;
