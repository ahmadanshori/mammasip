import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../../components/Container';
import {AskButton} from '../../components/Buttons';
import {SearchHeader} from '../../components/Headers';
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
import {AppContext} from '../../index';
import {LoadingComponent} from '../../components/Loadings';

const dataCategory = [
  {id: 1, name: 'Sayangi dirimu'},
  {id: 2, name: 'Anda pemenang'},
  {id: 3, name: 'Cinta'},
  {id: 4, name: 'Gerbang Dokter'},
];
const SearchScreen = ({navigation}) => {
  const {token} = useContext(AppContext);
  const [articleRecomended, setArticleRecomended] = useState([]);
  const [bookRecomended, setBookRecomended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      console.log(`e`, e, {...e});
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = useCallback(value => {
    setSelectedCategory(value);
  }, []);

  const handleArticle = useCallback(
    (id, typeRuang) => {
      navigation.navigate('ArticleDetail', {id, typeRuang});
    },
    [navigation],
  );

  return (
    <Container>
      <SearchHeader
        data={dataCategory}
        loading={loading}
        selected={selectedCategory}
        onCategory={handleCategory}
      />
      {loading ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}>
          {/* <VideoRecomendation
          onPress={() => navigation.navigate('VideoDetail')}
        /> */}
          <ArticleRecomendation
            data={articleRecomended}
            onPress={handleArticle}
          />
          <BookRekomendation
            data={bookRecomended}
            seeAllOnPress={() =>
              navigation.navigate('ListSearch', {title: 'Book'})
            }
          />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
  },
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  icon: {marginRight: 8},
  footer: {marginTop: 44},
});

export default SearchScreen;
