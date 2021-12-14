import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  Linking,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container} from '../../components/Container';
import {AskButton} from '../../components/Buttons';

import {
  // VideoRecomendation,
  ArticleRecomendation,
  BookRekomendation,
  SearchDataComponent,
} from '../../components/Search';
import {dropdownalert} from '../../components/AlertProvider';
import {LoadingComponent} from '../../components/Loadings';
import {SearchInput} from '../../components/Inputs';
import {FONTS} from '../../constants';
import {NoInternet, ErrorServer} from '../../components/Errors';
import {getTopArticle} from '../../api/article';
import {getTopBook} from '../../api/book';
import {searchAllDataAPI} from '../../api/faq';
import {AppContext} from '../../index';
import useErrorHandler from '../../hooks/useErrorHandler';

const SearchScreen = ({navigation}) => {
  const {token} = useContext(AppContext);
  const [articleRecomended, setArticleRecomended] = useState([]);
  const [bookRecomended, setBookRecomended] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resTopArticle = await getTopArticle(token);
      const resTopBook = await getTopBook(token);
      setArticleRecomended(resTopArticle.data.data);
      setBookRecomended(resTopBook.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleNavigator = useCallback(
    (screen, param) => {
      navigation.navigate(screen, param);
    },
    [navigation],
  );
  const handleSearch = text => {
    setSearch(text);
  };

  const onSubmit = useCallback(async () => {
    Keyboard.dismiss();
    if (!isSearch) {
      setIsSearch(true);
    }
    setLoading({get: true, refresh: false});
    try {
      const formData = new FormData();
      formData.append('search', search);
      const resSearch = await searchAllDataAPI(formData);
      setSearchData(resSearch.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  }, [search, isSearch, setError]);

  // const handleMedia = val => {
  //   if (val.typeFile === 2) {
  //     navigation.navigate('Video', {url: val.url_frame});
  //   } else if (val.typeFile === 3) {
  //     navigation.navigate('Pdf', {
  //       link: val.url,
  //     });
  //   } else {
  //     setSelected(val);
  //     setIsDownload(true);
  //   }
  //   //   type_file
  //   //  1 foto, 2 video, 3 pdf, 4 pptx
  //   // 1,2,3 bisa di view baru download, 4 langsung download
  // };

  const handleNavigatorSearch = async (event, type) => {
    if (type === 1) {
      if (event.isUrl === 0) {
        navigation.navigate('Article', {articleId: event.idArticle});
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
    } else if (type === 2) {
      navigation.navigate('Pdf', {link: event.urlBook});
    } else {
    }
  };

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.justify}>
          <Text style={FONTS.textBold20}>Telusuri</Text>
          <Icon name="bookmark-outline" size={20} />
        </View>
        <View style={{paddingHorizontal: 16}}>
          <SearchInput
            placeholder={'Cari judul artikel, video atau buku'}
            value={search}
            onChangeText={handleSearch}
            onSubmitEditing={onSubmit}
            on
          />
        </View>
      </View>
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
          contentContainerStyle={styles.scroll}>
          {isSearch ? (
            <SearchDataComponent
              data={searchData}
              onPress={handleNavigatorSearch}
            />
          ) : (
            <>
              {articleRecomended.length ? (
                <ArticleRecomendation
                  data={articleRecomended}
                  onPress={articleId => handleNavigator('Article', {articleId})}
                  seeAllOnPress={() =>
                    handleNavigator('BungaRampaiList', {
                      type: 4,
                      title: 'Artikel',
                    })
                  }
                />
              ) : null}
              {bookRecomended.length ? (
                <BookRekomendation
                  data={bookRecomended}
                  onPress={url => handleNavigator('Pdf', {link: url})}
                  seeAllOnPress={() =>
                    handleNavigator('BungaRampaiList', {type: 1, title: 'Buku'})
                  }
                />
              ) : null}
            </>
          )}

          {/* <VideoRecomendation
          onPress={() => navigation.navigate('VideoDetail')}
        />
          <ImportanLink /> */}

          <View style={styles.footer}>
            <Text
              style={[
                FONTS.textBold16,
                {textAlign: 'center', marginBottom: 16},
              ]}>
              Butuh informasi lainnya?
            </Text>
            <AskButton onPress={() => navigation.navigate('Faq')} />
          </View>
        </ScrollView>
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {paddingBottom: 16},
  scroll: {paddingHorizontal: 16, paddingBottom: 16},
  justify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  footer: {marginTop: 44},
});

export default SearchScreen;
