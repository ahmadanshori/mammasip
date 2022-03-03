import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, FlatList, View, Text, ScrollView} from 'react-native';
import debounce from 'lodash/debounce';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../components/Container';
import {SearchHeader} from '../components/Headers';
import Accordion from '../components/Accordion';
import {NoInternet, ErrorServer} from '../components/Errors';
import {getTopFaqAPI, getTopNewsAPI, searchFaqAPI} from '../api/faq';
import useErrorHandler from '../hooks/useErrorHandler';
import {AppContext} from '../index';
import {COLORS, FONTS} from '../constants';
import {ArticleDetailItem} from '../components/Items';
import {OutlineButton} from '../components/Buttons';
import {LoadingComponent} from '../components/Loadings';

const FaqScreen = ({navigation}) => {
  const {token} = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [top, setTop] = useState([]);
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(false);
  const [loadPage, setLoadPage] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitalData();
  }, []);

  const getInitalData = async () => {
    try {
      const res = await getTopFaqAPI(token);
      setTop(res.data.data);
      const resNews = await getTopNewsAPI(token);
      setNews(resNews.data.data);
    } catch (e) {
      setError(e);
    }
  };

  const renderItem = ({item}) => (
    <Accordion title={item.question_en} desc={item.answer_en} />
  );

  const handleSearch = async text => {
    if (!isSearch) {
      setIsSearch(true);
    }
    setSearch(text);
    setLoading(true);
    handleCustomerSearch(text);
  };

  const handleCustomerSearch = debounce(async text => {
    try {
      const formData = new FormData();
      formData.append('search', text);
      const resFaq = await searchFaqAPI(token, formData);
      setData(resFaq.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, 500);

  const navigationHandler = id => {
    navigation.navigate('News', {id});
  };

  const nextPage = async () => {
    if (news.number < news.totalPages - 1) {
      setLoadPage(true);
      try {
        const resNews = await getTopNewsAPI(token, news.number + 1);
        setNews({
          ...resNews.data.data.content,
          content: [...news.content, ...resNews.data.data.content],
        });
      } catch (e) {
        setError(e);
      } finally {
        setLoadPage(false);
      }
    }
  };

  const handleRefresh = () => {
    setError();
    setLoading(true);
    handleCustomerSearch(search);
  };

  return (
    <Container>
      <SearchHeader
        search={search}
        handleSearch={handleSearch}
        title="Tanya jawab sahabat mammaSIP"
        desc="Cari dan temukan jawaban yang tepat!"
        placeholder="Cari topik pertanyaan"
        source={require('../assets/images/ask.jpg')}
      />
      {isSearch ? (
        <FlatList
          refreshing={loading}
          onRefresh={handleRefresh}
          data={data}
          keyExtractor={item => item.id_faq.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListFooterComponent={
            <>
              {news?.content?.length ? (
                <>
                  <View style={styles.separator} />
                  <View style={styles.row}>
                    <MaterialCommunityIcons
                      name="clipboard-text-multiple"
                      size={20}
                    />
                    <Text style={styles.title}>Berita Terkini</Text>
                  </View>
                  {news?.content.map(item => (
                    <ArticleDetailItem
                      key={item.idBerita.toString()}
                      title={item.namaBerita}
                      source={item.urlPicture}
                      date={item.createdDate}
                      onPress={() => navigationHandler(item.idBerita)}
                    />
                  ))}
                  {news.number < news.totalPages - 1 ? (
                    <OutlineButton
                      title={'Tampilkan Selanjutnya'}
                      onPress={nextPage}
                    />
                  ) : null}
                </>
              ) : null}
            </>
          }
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}>
          {top.length ? (
            <View>
              <View style={styles.row}>
                <Icon name="questioncircle" size={20} />
                <Text style={styles.title}>Topik yang sering ditanyakan</Text>
              </View>
              {top.map(item => (
                <Accordion
                  key={item.id_faq.toString()}
                  title={item.question_en}
                  desc={item.answer_en}
                />
              ))}
            </View>
          ) : null}
          {news?.content?.length ? (
            <>
              <View style={styles.separator} />
              <View style={styles.row}>
                <MaterialCommunityIcons
                  name="clipboard-text-multiple"
                  size={20}
                />
                <Text style={styles.title}>Berita Terkini</Text>
              </View>
              {news?.content.map(item => (
                <ArticleDetailItem
                  key={item.idBerita.toString()}
                  title={item.namaBerita}
                  source={item.urlPicture}
                  date={item.createdDate}
                  onPress={() => navigationHandler(item.idBerita)}
                />
              ))}
              {loadPage ? (
                <LoadingComponent />
              ) : (
                <>
                  {news.number < news.totalPages - 1 ? (
                    <OutlineButton
                      title={'Tampilkan Selanjutnya'}
                      onPress={nextPage}
                    />
                  ) : null}
                </>
              )}
            </>
          ) : null}
        </ScrollView>
      )}

      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 24,
  },
  title: {...FONTS.textBold14, marginLeft: 8},
  separator: {borderTopWidth: 1, marginTop: 32, borderColor: COLORS.separator},
});

export default FaqScreen;
