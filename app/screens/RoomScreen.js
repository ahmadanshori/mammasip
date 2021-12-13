import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList} from 'react-native';

import {Container} from '../components/Container';
import {LoadingComponent} from '../components/Loadings';
// import {VideoItem, ArticleItem, CalculatorItem} from '../components/Items';
import {
  DestinationContent,
  VideoContent,
  ImageContent,
  ButtonContent,
  GKSContent,
  ArticleContent,
} from '../components/Contents';

import {HeaderTitle} from '../components/Headers';
// import {AppContext} from '../index';
// import {COLORS, SIZES} from '../constants';
import {getRoomTypeByIdAPI} from '../api/room';

const RoomScreen = ({navigation, route}) => {
  const {roomId} = route.params;
  // const {token, setLoading} = useContext(AppContext);
  const [data, setData] = useState(null);
  const [load, setLoad] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resRoom = await getRoomTypeByIdAPI(roomId);
      setData(resRoom.data.data);
    } catch (err) {
      // console.log(`err`, {...err});
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
  //   console.log(`test`, val, token, oldQuery, roomId);

  //   try {
  //     console.log('1');
  //     const res = await getArticleByRoomAPI(
  //       roomId,
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

  const onQuiz = useCallback(
    id => {
      navigation.navigate('Quiz', {id});
    },
    [navigation],
  );

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
      return <ButtonContent data={item} onPress={() => onQuiz(item.id_kuis)} />;
    } else {
      return <ArticleContent data={item} />;
    }
  };

  return (
    <Container>
      <HeaderTitle title={data?.nama_ruang} />
      {load.get ? (
        <LoadingComponent />
      ) : (
        <View>
          <FlatList
            data={data.media}
            keyExtractor={item => item.idMedia.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50, paddingTop: 16}}
          />
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
      </View>
      <View style={styles.wrapper}>
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

// const styles = StyleSheet.create({
//   wrapper: {paddingHorizontal: 16, marginBottom: 16},
//   // row: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
//   // category: {
//   //   paddingVertical: 4,
//   //   paddingHorizontal: 10,
//   //   backgroundColor: COLORS.lightPrimary,
//   //   borderRadius: 40,
//   //   marginRight: 16,
//   // },
//   img: {height: SIZES.width2, width: SIZES.width},
//   imgWrapper: {marginRight: 10},
//   imgList: {
//     height: 50,
//     width: 80,
//     borderRadius: 6,
//     // marginBottom: 16,
//   },
//   imgShadow: {
//     height: 50,
//     width: 80,
//     marginTop: -50,
//     backgroundColor: COLORS.red,
//     // position: 'absolute',
//     // zIndex: 99,
//     borderRadius: 6,
//     // top: 0,
//   },
//   listItem: {paddingVertical: 16, paddingLeft: 16},
//   button: {marginTop: 16},
//   room: {
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     backgroundColor: COLORS.separator,
//     borderRadius: 40,
//     marginRight: 10,
//     marginTop: 8,
//   },
// });
