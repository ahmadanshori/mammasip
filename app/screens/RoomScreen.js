import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {Container} from '../components/Container';
import {LoadingComponent} from '../components/Loadings';
import {dropdownalert} from '../components/AlertProvider';
import {OutlineButton, MainButton} from '../components/Buttons';
import {VideoItem, ArticleItem, CalculatorItem} from '../components/Items';
import {
  DestinationContent,
  VideoContent,
  ImageContent,
  ButtonContent,
  GKSContent,
  ArticleContent,
} from '../components/Contents';

import {VideoHeader} from '../components/Headers';
import {AppContext} from '../index';
import {COLORS, FONTS, SIZES} from '../constants';
import {getArticleByRoomAPI, getRoomTypeByIdAPI} from '../api/room';
import QuizIcon from '../assets/icons/quiz.svg';

const RoomScreen = ({navigation, route}) => {
  const {typeRuang} = route.params;
  const {token, setLoading} = useContext(AppContext);
  // const [query, setQuery] = useState({page: 1, totalPages: 0});
  // const [articleData, setArticleData] = useState(null);
  const [data, setData] = useState(null);
  // const [selectVideo, setSelecVideo] = useState(null);
  const [load, setLoad] = useState({get: true, refresh: false});
  // const [isArticle, setIsArticle] = useState(false);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      // const res = await getArticleByRoomAPI(typeRuang, query?.page);
      // console.log(`res`, res);
      const resRoom = await getRoomTypeByIdAPI(typeRuang);
      //   console.log(`resRoom`, resRoom);
      // setArticleData(res.data.data.content[0]);
      setData(resRoom.data.data);
      // setSelecVideo(resRoom.data.data);
      // setQuery({
      //   page: res.data.data.number,
      //   totalPages: res.data.data.totalPages - 1,
      // });
    } catch (err) {
      console.log(`err`, {...err});
    } finally {
      setLoad({get: false, refresh: false});
    }
  };

  // const handleArticleButton = useCallback(() => {
  //   setIsArticle(state => !state);
  // }, []);

  // const selectedVideo = useCallback(val => {
  //   setSelecVideo(val);
  // }, []);

  // const handleNextArticle = async val => {
  //   setLoading(true);
  //   const oldQuery = query;
  //   console.log(`test`, val, token, oldQuery, typeRuang);

  //   try {
  //     console.log('1');
  //     const res = await getArticleByRoomAPI(
  //       typeRuang,
  //       val ? query.page + 1 : query.page - 1,
  //     );
  //     console.log(`res1`, res);
  //     setArticleData(res.data.data.content[0]);
  //     setQuery({
  //       page: res.data.data.number,
  //       totalPages: res.data.data.totalPages - 1,
  //     });
  //   } catch (e) {
  //     console.log(`e`, e, {...e});
  //     setQuery(oldQuery);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const headerComponent = () => (
    <View style={styles.wrapper}>
      <Text style={[FONTS.textBold16, {color: COLORS.black}]}>
        {data?.nama_ruang}
      </Text>
      <Text style={[FONTS.text12, {color: COLORS.black}]}>
        {data?.description}
      </Text>
    </View>
  );

  const onQuiz = () => {
    dropdownalert.alertWithType('warn', '', 'Belum bisa, Masih Diproses!!');
  };

  const renderItem = ({item}) => {
    if (item.typeContent === 1) {
      return <DestinationContent data={item} />;
    } else if (item.typeContent === 2) {
      return <ImageContent data={item} />;
    } else if (item.typeContent === 3) {
      return <GKSContent data={item} />;
    } else if (item.typeContent === 4) {
      return <ImageContent data={item} />;
    } else if (item.typeContent === 5) {
      return (
        <VideoContent
          data={item}
          onPress={() => navigation.navigate('Video', {url: item.url_frame})}
        />
      );
    } else if (item.typeContent === 6) {
      return <ButtonContent data={item} onPress={onQuiz} />;
    } else {
      return <ArticleContent data={item} />;
    }
  };

  return (
    <Container>
      <VideoHeader />
      {load.get ? (
        <LoadingComponent />
      ) : (
        <View>
          {/* <View style={styles.row}>
              <View style={styles.category}>
                <Text style={[FONTS.textBold10, {color: COLORS.primary}]}>
                  Sayangi dirimu
                </Text>
              </View>
              <Text style={[FONTS.textBold10, {color: COLORS.gray}]}>
                12 Januari 2021 29:30
              </Text>
            </View> */}

          {/* <Image source={{uri: selectVideo?.url}} style={styles.img} /> */}
          <FlatList
            data={data.media}
            keyExtractor={item => item.idMedia.toString()}
            renderItem={renderItem}
            ListHeaderComponent={headerComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}
          />

          {/* <View style={styles.wrapper}>
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
          </View> */}
        </View>
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

export default RoomScreen;

const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 16, marginBottom: 16},
  // row: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  // category: {
  //   paddingVertical: 4,
  //   paddingHorizontal: 10,
  //   backgroundColor: COLORS.lightPrimary,
  //   borderRadius: 40,
  //   marginRight: 16,
  // },
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
