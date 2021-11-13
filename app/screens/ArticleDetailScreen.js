import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {Container} from '../components/Container';
import {LoadingComponent} from '../components/Loadings';
import {OutlineButton, MainButton} from '../components/Buttons';
import {VideoItem, ArticleItem, CalculatorItem} from '../components/Items';

import {VideoHeader} from '../components/Headers';
import {AppContext} from '../index';
import {COLORS, FONTS, SIZES} from '../constants';
import {getArticleByRoomAPI, getRoomTypeByIdAPI} from '../api/room';
import QuizIcon from '../assets/icons/quiz.svg';

const ArticleDetailScreen = ({navigation, route}) => {
  const {number, typeRuang} = route.params;
  const {token, setLoading} = useContext(AppContext);
  const [query, setQuery] = useState({page: number, totalPages: 0});
  const [articleData, setArticleData] = useState(null);
  const [videoData, setVideoData] = useState([]);
  const [selectVideo, setSelecVideo] = useState(null);
  const [load, setLoad] = useState({get: false, refresh: false});
  const [isArticle, setIsArticle] = useState(false);

  useEffect(() => {
    getInitialData();
  }, []);
  console.log(`query`, query);
  const getInitialData = async () => {
    try {
      console.log(`number`, number);
      const res = await getArticleByRoomAPI(typeRuang, query?.page);
      console.log(`res`, res);
      const resVideo = await getRoomTypeByIdAPI(typeRuang);
      console.log(`resVideo`, resVideo);
      setArticleData(res.data.data.content[0]);
      setVideoData(resVideo.data.data[0].media);
      setSelecVideo(resVideo.data.data[0]?.media[0]);
      setQuery({
        page: res.data.data.number,
        totalPages: res.data.data.totalPages - 1,
      });
    } catch (err) {
      console.log(`err`, {...err});
    } finally {
      setLoad({get: false, refresh: false});
    }
  };

  const handleArticleButton = useCallback(() => {
    setIsArticle(state => !state);
  }, []);

  const selectedVideo = useCallback(val => {
    setSelecVideo(val);
  }, []);

  const handleNextArticle = async val => {
    setLoading(true);
    const oldQuery = query;
    console.log(`test`, val, token, oldQuery, typeRuang);

    try {
      console.log('1');
      const res = await getArticleByRoomAPI(
        typeRuang,
        val ? query.page + 1 : query.page - 1,
      );
      console.log(`res1`, res);
      setArticleData(res.data.data.content[0]);
      setQuery({
        page: res.data.data.number,
        totalPages: res.data.data.totalPages - 1,
      });
    } catch (e) {
      console.log(`e`, e, {...e});
      setQuery(oldQuery);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <VideoHeader />
      {load.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <View style={styles.row}>
              <View style={styles.category}>
                <Text style={[FONTS.textBold10, {color: COLORS.primary}]}>
                  Sayangi dirimu
                </Text>
              </View>
              <Text style={[FONTS.textBold10, {color: COLORS.gray}]}>
                12 Januari 2021 29:30
              </Text>
            </View>
            <Text style={[FONTS.textBold16, {color: COLORS.black}]}>
              {articleData?.nameArticle}
            </Text>
          </View>
          <View>
            <Image source={{uri: selectVideo?.url}} style={styles.img} />
            <ScrollView
              contentContainerStyle={styles.listItem}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {videoData.map(item => (
                <TouchableOpacity
                  key={item.idMedia}
                  activeOpacity={1}
                  onPress={() => selectedVideo(item)}
                  style={styles.imgWrapper}>
                  <Image source={{uri: item.url}} style={styles.imgList} />
                  {/* <View
                    style={[
                      styles.imgList,
                      item.idMedia !== selectVideo?.idMedia && styles.imgShadow,
                    ]}
                  /> */}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.wrapper}>
            <RenderHtml
              contentWidth={SIZES.width}
              source={{
                html: isArticle
                  ? articleData?.bodyArticle
                  : articleData?.abstractArticle,
              }}
            />
            <OutlineButton
              title={isArticle ? 'Lihat Lebih Sedikit' : 'Lihat Selengkapnya'}
              onPress={handleArticleButton}
              style={styles.button}
            />
            {query.page === 0 ? (
              <>
                {query?.totalPages > 0 ? (
                  <>
                    <MainButton
                      title={'Chapter Selanjutnya'}
                      onPress={() => handleNextArticle(true)}
                      style={styles.button}
                      right
                    />
                  </>
                ) : null}
              </>
            ) : (
              <>
                {query?.page === query?.totalPages ? (
                  <MainButton
                    title={'Chapter Selanjutnya'}
                    onPress={() => handleNextArticle(false)}
                    style={styles.button}
                    left
                  />
                ) : (
                  <>
                    {query?.page > 0 && query?.page < query?.totalPages ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: 16,
                        }}>
                        <OutlineButton
                          title={'Selanjutnya'}
                          onPress={() => handleNextArticle(true)}
                          style={{width: '48%'}}
                          right
                        />
                        <MainButton
                          title={'Kembali'}
                          onPress={() => handleNextArticle(false)}
                          style={{width: '48%'}}
                          left
                        />
                      </View>
                    ) : null}
                  </>
                )}
              </>
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 16,
                flexWrap: 'wrap',
              }}>
              {articleData?.hastag?.map(item => (
                <View style={styles.room} key={item.idHastag}>
                  <Text style={[FONTS.text10, {color: COLORS.black}]}>
                    {item.nameCategory}
                  </Text>
                </View>
              ))}
            </View>
            <CalculatorItem
              image={<QuizIcon width={60} height={60} />}
              // onPress={() => handleNavigation('WeightCalculator')}
              backgroundColor={COLORS.primary}
              title="Ayo ikutan Quiz!"
              description="Uji pengetahuanmu dengan quiz
              kesehatan dari mammaSIP."
            />
          </View>
        </ScrollView>
      )}

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
  wrapper: {padding: 16},
  row: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  category: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightPrimary,
    borderRadius: 40,
    marginRight: 16,
  },
  img: {height: SIZES.width2, width: SIZES.width},
  imgWrapper: {marginRight: 10},
  imgList: {
    height: 50,
    width: 80,
    borderRadius: 6,
    // marginBottom: 16,
  },
  imgShadow: {
    height: 50,
    width: 80,
    marginTop: -50,
    backgroundColor: COLORS.red,
    // position: 'absolute',
    // zIndex: 99,
    borderRadius: 6,
    // top: 0,
  },
  listItem: {paddingVertical: 16, paddingLeft: 16},
  button: {marginTop: 16},
  room: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: COLORS.separator,
    borderRadius: 40,
    marginRight: 10,
    marginTop: 8,
  },
});
