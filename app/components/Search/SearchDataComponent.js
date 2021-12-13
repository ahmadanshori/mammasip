import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ArticleDetailItem, BookDetailItem} from '../Items';
import {COLORS, FONTS} from '../../constants';

const SearchDataComponent = ({data, onPress}) => {
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="clipboard-text-multiple" size={20} />
          <Text style={[FONTS.textBold14, styles.title]}>Artikel</Text>
        </View>
        {data?.articles.map(item => (
          <ArticleDetailItem
            key={item.idArticle}
            title={item.nameArticle}
            source={item.urlBanner}
            date={item.createdDate}
            onPress={() => onPress(item, 1)}
          />
        ))}
      </View>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="notebook-outline" size={20} />
          <Text style={[FONTS.textBold14, styles.title]}>Buku</Text>
        </View>
        {data?.books.map(item => (
          <BookDetailItem
            key={item.idBook}
            data={item}
            onPress={() => onPress(item, 2)}
          />
        ))}
      </View>
      {/* <View style={styles.wrapper}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="alpha-p-circle-outline" size={20} />
          <Text style={[FONTS.textBold14, styles.title]}>Penyuluhan</Text>
        </View>
        {data?.penyuluhans.map(item => (
          <ArticleDetailItem
            key={item.idPenyuluhan}
            title={item.tittle}
            desc={item.description}
            source={item.urlBanner}
            date={item.createdDate}
            onPress={() => onPress(item, 3)}
          />
        ))}
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.separator,
  },
  row: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  title: {color: COLORS.black, marginLeft: 6},
});
export default SearchDataComponent;
