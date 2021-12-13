import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {LoadingComponent} from '../components/Loadings';
// import Accordion from '../components/Accordion';
import {getArticleByIdAPI} from '../api/article';
import formatDate from '../libs/formatDate';
import {COLORS, SIZES, FONTS} from '../constants';

const ArticleScreen = ({route}) => {
  const {articleId} = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getArticleByIdAPI(articleId);
      setData(res.data.data[0]);
    } catch (e) {
      // console.log(`e`, e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  return (
    <Container>
      <HeaderTitle back title="Artikel" />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
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
              html: `${data?.bodyArticle}`,
            }}
          />
        </ScrollView>
      )}
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
