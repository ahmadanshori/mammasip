import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../../components/Container';
import {BackgroundHeader} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {
  ArticleDetailItem,
  BookItem,
  VideoDetailItem,
} from '../../components/Items';
import {dropdownalert} from '../../components/AlertProvider';
import ImportantMessage from '../../components/ImportantMessage';
import {NoInternet, ErrorServer} from '../../components/Errors';
import {getArticleAPI} from '../../api/article';
import {getRoomTypeByIdAPI, getBookAPI, getVideoPageAPI} from '../../api/room';
import {COLORS, FONTS} from '../../constants';
import useErrorHandler from '../../hooks/useErrorHandler';

const BungaRampaiScreen = ({navigation, route}) => {
  const {id} = route.params;
  const [roomData, setRoomData] = useState(null);
  const [book, setBook] = useState([]);
  const [journal, setJournal] = useState([]);
  const [article, setArticle] = useState([]);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(id);
      setRoomData(res.data.data);
      const resBook = await getBookAPI(1, 0, 5);
      const resJournal = await getBookAPI(2, 0, 5);
      const resArticle = await getArticleAPI(0, 5);
      const resVideo = await getVideoPageAPI(0, 5);
      const resBookRecommendation = await getBookAPI(3, 0, 5);
      setBook(resBook.data.data.content);
      setJournal(resJournal.data.data.content);
      setArticle(resArticle.data.data.content);
      setVideo(resVideo.data.data.content);
      setBook(resBookRecommendation.data.data.content);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const onSeeAll = useCallback(
    (title, type) => {
      navigation.navigate('BungaRampaiList', {
        title,
        type,
      });
    },
    [navigation],
  );

  const handleArticle = useCallback(
    async event => {
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
    },
    [navigation],
  );

  const handleBookRecommendation = useCallback(async event => {
    const supported = await Linking.canOpenURL(event?.urlBook);
    if (supported) {
      await Linking.openURL(event?.urlBook);
    } else {
      dropdownalert.alertWithType(
        'warn',
        '',
        'website salah atau sedang dalam perbaikan!!',
      );
    }
  }, []);

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };

  return (
    <Container>
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
          }>
          <BackgroundHeader
            title={roomData?.nama_ruang}
            desc={roomData?.description}
            source={{uri: roomData?.url_picture_bg}}
            white
          />
          <View style={styles.margin}>
            <ImportantMessage title={roomData?.kata_pengantar} />
            <View style={styles.body}>
              <TouchableOpacity
                style={styles.header}
                onPress={() => onSeeAll('E-Book', 1)}
                activeOpacity={1}>
                <View style={styles.wrapper}>
                  <MaterialCommunityIcons name="download" size={20} />
                  <Text
                    style={[
                      FONTS.textBold14,
                      {color: COLORS.black, marginLeft: 6},
                    ]}>
                    E-Book
                  </Text>
                </View>
                <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                {book.map(item => (
                  <BookItem
                    key={item.idBook}
                    title={item.nameBook}
                    source={item.urlBanner}
                    date={item.year}
                    uploadDate={item.createdDate}
                    publisher={item.publisherBook}
                    author={item.authorBook}
                    onPress={() =>
                      navigation.navigate('Pdf', {link: item.urlBook})
                    }
                  />
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.header}
                onPress={() => onSeeAll('Jurnal', 2)}
                activeOpacity={1}>
                <View style={styles.wrapper}>
                  <MaterialCommunityIcons name="link" size={20} />
                  <Text
                    style={[
                      FONTS.textBold14,
                      {color: COLORS.black, marginLeft: 6},
                    ]}>
                    Jurnal
                  </Text>
                </View>
                <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                {journal.map(item => (
                  <BookItem
                    key={item.idBook}
                    title={item.nameBook}
                    source={item.urlBanner}
                    date={item.year}
                    uploadDate={item.createdDate}
                    publisher={item.publisherBook}
                    author={item.authorBook}
                    onPress={() =>
                      navigation.navigate('Pdf', {link: item.urlBook})
                    }
                  />
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.header}
                onPress={() => onSeeAll('Artikel', 4)}
                activeOpacity={1}>
                <View style={styles.wrapper}>
                  <MaterialCommunityIcons
                    name="clipboard-text-multiple"
                    size={20}
                  />
                  <Text
                    style={[
                      FONTS.textBold14,
                      {color: COLORS.black, marginLeft: 6},
                    ]}>
                    Artikel
                  </Text>
                </View>
                <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              {article.map(item => (
                <ArticleDetailItem
                  key={item.idArticle}
                  title={item.nameArticle}
                  source={item.urlBanner}
                  date={item.createdDate}
                  onPress={() => handleArticle(item)}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.header}
              onPress={() => onSeeAll('Video', 5)}
              activeOpacity={1}>
              <View style={styles.wrapper}>
                <MaterialCommunityIcons name="video-outline" size={20} />
                <Text
                  style={[
                    FONTS.textBold14,
                    {color: COLORS.black, marginLeft: 6},
                  ]}>
                  Video
                </Text>
              </View>
              <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
            {video.map(item => (
              <VideoDetailItem
                key={item.idMedia}
                data={item}
                narsum={item.nama_narsum}
                profesi={item.profesi_narsum}
                onPress={() =>
                  navigation.navigate('Video', {url: item.url_frame})
                }
              />
            ))}
            <TouchableOpacity
              style={styles.header}
              onPress={() => onSeeAll('Buku Rekomendasi', 3)}
              activeOpacity={1}>
              <View style={styles.wrapper}>
                <MaterialCommunityIcons name="notebook-outline" size={20} />
                <Text
                  style={[
                    FONTS.textBold14,
                    {color: COLORS.black, marginLeft: 6},
                  ]}>
                  Buku Rekomendasi
                </Text>
              </View>
              <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              {book.map(item => (
                <BookItem
                  key={item.idBook}
                  title={item.nameBook}
                  // source={item.urlBanner}
                  isImage={false}
                  date={item.year}
                  uploadDate={item.createdDate}
                  publisher={item.publisherBook}
                  author={item.authorBook}
                  onPress={() => handleBookRecommendation(item)}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  margin: {padding: 16},
  body: {marginTop: 24},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 16,
  },
  wrapper: {flexDirection: 'row', alignItems: 'center'},
});

export default BungaRampaiScreen;
