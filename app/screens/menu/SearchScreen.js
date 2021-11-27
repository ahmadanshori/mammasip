import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container} from '../../components/Container';
import {AskButton} from '../../components/Buttons';

import {VideoItem, VideoDetailItem} from '../../components/Items';
import {
  VideoRecomendation,
  ArticleRecomendation,
  BookRekomendation,
  ImportanLink,
} from '../../components/Search';
import {COLORS, FONTS, SIZES} from '../../constants';
import {getTopArticle} from '../../api/article';
import {getTopBook} from '../../api/book';
import {getRoomAPI} from '../../api/room';
import {AppContext} from '../../index';
import {LoadingComponent} from '../../components/Loadings';

const SearchScreen = ({navigation}) => {
  const {token} = useContext(AppContext);
  const [articleRecomended, setArticleRecomended] = useState([]);
  const [bookRecomended, setBookRecomended] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resRoom = await getRoomAPI();
      const resTopArticle = await getTopArticle(token);
      const resTopBook = await getTopBook(token);
      setRoomData(resRoom.data.data);
      setArticleRecomended(resTopArticle.data.data);
      setBookRecomended(resTopBook.data.data);
    } catch (e) {
      //   console.log(`e`, e, {...e});
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleNavigator = (screen, param) => {
    navigation.navigate(screen, param);
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.justify}>
          <Text style={FONTS.textBold20}>Telusuri</Text>
          <Icon name="bookmark-outline" size={20} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 8}}>
          {roomData.map(item => (
            <TouchableOpacity
              activeOpacity={SIZES.opacity}
              onPress={() =>
                handleNavigator('ListRoom', {
                  idRuang: item.id_ruang,
                  title: item.nama_ruang,
                })
              }
              key={item.id_ruang}
              style={styles.category}>
              <Text style={[FONTS.text10, {color: COLORS.secondary}]}>
                {item.nama_ruang}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}>
          {/* <VideoRecomendation
          onPress={() => navigation.navigate('VideoDetail')}
        /> */}

          {articleRecomended.length ? (
            <ArticleRecomendation
              data={articleRecomended}
              onPress={(id, typeRuang) =>
                handleNavigator('Room', {id, typeRuang})
              }
              seeAllOnPress={() =>
                handleNavigator('ListSearch', {title: 'Artikel'})
              }
            />
          ) : null}

          {bookRecomended.length ? (
            <BookRekomendation
              data={bookRecomended}
              seeAllOnPress={() =>
                handleNavigator('ListSearch', {title: 'Buku'})
              }
            />
          ) : null}

          {/* <ImportanLink /> */}

          {/* ======== VIDEO ======== */}
          {/* <View>
          <View style={styles.header}>
            <View style={styles.row}>
              <MaterialCommunityIcons
                name="television-play"
                size={18}
                style={styles.icon}
              />
              <Text style={FONTS.textBold14}>Video</Text>
            </View>
            <Text style={[FONTS.text12, {color: COLORS.primary}]}>
              Lihat Semua
            </Text>
          </View>
          <VideoDetailItem />
          <VideoDetailItem />
          <VideoDetailItem />
        </View> */}
          {/* ======== ARTICLE ======== */}
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
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {paddingBottom: 16},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
  },
  justify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  icon: {marginRight: 8},
  category: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 4,
    borderColor: COLORS.secondary,
  },
  footer: {marginTop: 44},
});

export default SearchScreen;
