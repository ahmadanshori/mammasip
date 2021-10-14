import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import {Container} from '../components/Container';
import {VideoItem, ArticleItem} from '../components/Items';
import {VideoHeader} from '../components/Headers';
import {COLORS, FONTS, SIZES} from '../constants';
import {getArticleByRoomAPI} from '../api/room';

const ArticleDetailScreen = ({navigation, route}) => {
  const {id, typeRuang, token} = route.params;
  const [page, setPage] = useState(2);
  const [articleData, setArticleData] = useState(null);
  const [loading, setloading] = useState({get: false, refresh: false});

  console.log(`typeRuang`, typeRuang, id);
  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = useCallback(async () => {
    try {
      const res = await getArticleByRoomAPI(token, typeRuang, page);
      console.log(`res`, res);
      setArticleData(res.data.data.content[0]);
      setPage(res.data.data.number);
    } catch (err) {
      console.log(`err`, {...err});
    } finally {
      setloading({get: false, refresh: false});
    }
  }, [token, typeRuang, page]);
  return (
    <Container>
      <VideoHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>ArticleDetailScreen</Text>
      </ScrollView>

      {/* <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={FONTS.textBold14}>Artikel lain yang terkait</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontal}>
          <ArticleItem category />
          <ArticleItem category />
          <ArticleItem category />
          <ArticleItem category />
        </ScrollView>
      </View> */}
      {/* <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={FONTS.textBold14}>Video yang mungkin anda suka</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontal}>
          <ArticleItem video />
          <ArticleItem video />
          <ArticleItem video />
          <ArticleItem video />
        </ScrollView>
      </View> */}
    </Container>
  );
};

export default ArticleDetailScreen;

const styles = StyleSheet.create({
  wrapper: {paddingTop: 24},
  horizontal: {paddingHorizontal: 16},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
