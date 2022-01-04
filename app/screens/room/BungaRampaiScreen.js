import React, {useState, useCallback, useEffect, useContext} from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';
import {Container} from '../../components/Container';
import {BackgroundHeader} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {ArticleItem, BookItem} from '../../components/Items';
import {dropdownalert} from '../../components/AlertProvider';
import ImportantMessage from '../../components/ImportantMessage';
import {NoInternet, ErrorServer} from '../../components/Errors';
import {getArticleAPI} from '../../api/article';
import {getRoomTypeByIdAPI, getBookAPI, getVideoPageAPI} from '../../api/room';
import {COLORS, FONTS, SIZES} from '../../constants';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';

const BungaRampaiScreen = ({navigation, route}) => {
  const {id} = route.params;
  const {token} = useContext(AppContext);
  const [roomData, setRoomData] = useState(null);
  const [book, setBook] = useState([]);
  const [journal, setJournal] = useState([]);
  const [article, setArticle] = useState([]);
  const [bookRecomendation, setBookRecomendation] = useState([]);
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = useCallback(async () => {
    try {
      const res = await getRoomTypeByIdAPI(id, token);
      setRoomData(res.data.data);
      const resBook = await getBookAPI(1, 0, 2);
      const resJournal = await getBookAPI(2, 0, 2);
      const resArticle = await getArticleAPI(0, 2);
      const resVideo = await getVideoPageAPI(0, 2);
      const resBookRecommendation = await getBookAPI(3, 0, 2);
      setBook(resBook.data.data.content);
      setJournal(resJournal.data.data.content);
      setArticle(resArticle.data.data.content);
      setVideo(resVideo.data.data.content);
      setBookRecomendation(resBookRecommendation.data.data.content);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  }, [id, setError, token]);

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
    // const supported = await Linking.canOpenURL(event?.urlBook);
    // if (supported) {
    //   await Linking.openURL(event?.urlBook);
    // } else {
    //   dropdownalert.alertWithType(
    //     'warn',
    //     '',
    //     'website salah atau sedang dalam perbaikan!!',
    //   );
    // }
    await Linking.openURL(event?.urlBook);
  }, []);

  const handleRefresh = useCallback(() => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  }, [setError, getInitialData]);

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
                <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              <View style={styles.row}>
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
                <TouchableOpacity
                  style={styles.seeAll}
                  activeOpacity={SIZES.opacity}
                  onPress={() => onSeeAll('E-Book', 1)}>
                  <Icon name="rightcircle" size={26} color={COLORS.primary} />
                  <Text
                    style={[
                      FONTS.textBold10,
                      {color: COLORS.primary, marginTop: 8},
                    ]}>
                    Lihat Semua
                  </Text>
                </TouchableOpacity>
              </View>
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
                <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              <View style={styles.row}>
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
                <TouchableOpacity
                  style={styles.seeAll}
                  activeOpacity={SIZES.opacity}
                  onPress={() => onSeeAll('Jurnal', 2)}>
                  <Icon name="rightcircle" size={26} color={COLORS.primary} />
                  <Text
                    style={[
                      FONTS.textBold10,
                      {color: COLORS.primary, marginTop: 8},
                    ]}>
                    Lihat Semua
                  </Text>
                </TouchableOpacity>
              </View>
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
                <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              <View style={styles.row}>
                {article.map(item => (
                  <ArticleItem
                    key={item.idArticle}
                    title={item.nameArticle}
                    source={item.urlBanner}
                    date={item.createdDate}
                    onPress={() => handleArticle(item)}
                  />
                ))}
                <TouchableOpacity
                  style={styles.seeAll}
                  activeOpacity={SIZES.opacity}
                  onPress={() => onSeeAll('Artikel', 4)}>
                  <Icon name="rightcircle" size={26} color={COLORS.primary} />
                  <Text
                    style={[
                      FONTS.textBold10,
                      {color: COLORS.primary, marginTop: 8},
                    ]}>
                    Lihat Semua
                  </Text>
                </TouchableOpacity>
              </View>
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
              <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
            <View style={styles.row}>
              {video.map(item => (
                <ArticleItem
                  key={item.idMedia}
                  title={item.kata_pengantar}
                  source={item.url}
                  date={item.createdDate}
                  onPress={() =>
                    navigation.navigate('Video', {url: item.url_frame})
                  }
                  video
                />
              ))}
              <TouchableOpacity
                style={styles.seeAll}
                activeOpacity={SIZES.opacity}
                onPress={() => onSeeAll('Video', 5)}>
                <Icon name="rightcircle" size={26} color={COLORS.primary} />
                <Text
                  style={[
                    FONTS.textBold10,
                    {color: COLORS.primary, marginTop: 8},
                  ]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
            </View>
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
              <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
            <View style={styles.row}>
              {bookRecomendation.map(item => (
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
              <TouchableOpacity
                style={styles.seeAll}
                activeOpacity={SIZES.opacity}
                onPress={() => onSeeAll('Buku Rekomendasi', 3)}>
                <Icon name="rightcircle" size={26} color={COLORS.primary} />
                <Text
                  style={[
                    FONTS.textBold10,
                    {color: COLORS.primary, marginTop: 8},
                  ]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
            </View>
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
  seeAll: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 6,
    flex: 1,
    height: SIZES.width2 - 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {flexDirection: 'row'},
});

export default BungaRampaiScreen;
