import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ArticleItem, ArticleDetailItem} from '../Items';
import {OutlineButton} from '../Buttons';
import {COLORS, FONTS} from '../../constants';
import formatDate from '../../libs/formatDate';

// const data1 = [1, 2, 3, 4];
// const data2 = [
//   {id: 1, active: true},
//   {id: 2, active: false},
//   {id: 3, active: false},
// ];

const ArticleRecomendation = ({data, onPress, seeAllOnPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <MaterialIcons name="library-books" size={16} style={styles.icon} />
          <Text style={FONTS.textBold14}>Rekomendasi Artikel</Text>
        </View>
        <Text
          style={[
            FONTS.text12,
            {color: COLORS.primary, paddingVertical: 6, paddingLeft: 8},
          ]}
          onPress={seeAllOnPress}>
          Lihat Semua
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map(item => (
          <ArticleItem
            key={item.idArticle}
            onPress={() => onPress(item.idArticle, item.typeRuang)}
            title={item.nameArticle}
            category={item.hastag[0]?.nameCategory}
            date={formatDate(item.createdDate)}
            source={item.media[0]?.url}
          />
        ))}
      </ScrollView>
      {/* <View style={styles.body}>
        {data.map(item => (
          <ArticleDetailItem
            key={item.idArticle}
            title={item.nameArticle}
            category={item.hastag[0]?.nameCategory}
            date={formatDate(item.createdDate)}
            source={{uri: item.media[0]?.url}}
          />
        ))}
      </View> */}
      {/* <OutlineButton title="Lihat Semua Artikel" /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginBottom: 8},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  icon: {marginRight: 8},
  body: {marginTop: 24, marginBottom: 8},
});
export default ArticleRecomendation;
