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
import ReactNativeBlobUtil from 'react-native-blob-util';
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
import DownloadModal from '../../components/Modals/DownloadModal';
import {NoInternet, ErrorServer} from '../../components/Errors';
import {getTopArticle} from '../../api/article';
import {getTopBook} from '../../api/book';
import {searchAllDataAPI} from '../../api/faq';
import {FONTS} from '../../constants';
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
  const [isDownload, setIsDownload] = useState(false);
  const [selected, setSelected] = useState(null);
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

  const handleNavigatorSearch = async (event, type) => {
    if (type === 1) {
      if (event.isUrl === 0) {
        navigation.navigate('Article', {id: event.idArticle});
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
      const media = event.media[0];
      if (media.typeFile === 2) {
        navigation.navigate('Video', {url: media.url_frame});
      } else if (media.typeFile === 3) {
        navigation.navigate('Pdf', {
          link: media.url,
        });
      } else {
        setSelected(media);
        setIsDownload(true);
      }
    }
  };

  const handleDownload = useCallback((link, type) => {
    ReactNativeBlobUtil.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: type,
        description: 'File downloaded by download manager.',
      },
    })
      .fetch('GET', link, {
        Accept: 'application/json',
      })
      .then(res => {})
      .then(data => {})
      .catch(e => {});
  }, []);

  const onDownload = useCallback(() => {
    setIsDownload(false);
    if (selected.typeFile === 1) {
      handleDownload(selected.url, 'image/png');
    } else if (selected.typeFile === 4) {
      handleDownload(
        selected.url,
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      );
    } else {
      return null;
    }
  }, [selected, handleDownload]);

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
                  onPress={articleId =>
                    handleNavigator('Article', {id: articleId})
                  }
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
      {isDownload && (
        <DownloadModal
          onClose={() => setIsDownload(false)}
          onDownload={onDownload}
        />
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
