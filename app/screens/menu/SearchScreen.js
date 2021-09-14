import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../../components/Container';
import {SearchHeader} from '../../components/Headers';
import {VideoItem, VideoDetailItem} from '../../components/Items';
import {
  VideoRecomendation,
  ArticleRecomendation,
  BookRekomendation,
  ImportanLink,
} from '../../components/Search';
import {COLORS, FONTS, SIZES} from '../../constants';
const dataCategory = [
  {id: 1, name: 'Sayangi dirimu'},
  {id: 2, name: 'Anda pemenang'},
  {id: 3, name: 'Cinta'},
  {id: 4, name: 'Gerbang Dokter'},
];
const SearchScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    name: 'Sayangi dirimu',
  });

  const handleCategory = value => {
    setSelectedCategory(value);
  };
  return (
    <Container>
      <SearchHeader
        data={dataCategory}
        selected={selectedCategory}
        onCategory={handleCategory}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}>
        <VideoRecomendation />
        <ArticleRecomendation />
        <BookRekomendation />
        <ImportanLink />
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
      </ScrollView>
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
});

export default SearchScreen;
