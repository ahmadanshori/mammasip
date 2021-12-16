import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ArticleDetailItem, BookDetailItem} from '../Items';
import {COLORS, FONTS} from '../../constants';

const SearchDataComponent = ({data, onPress}) => {
  return (
    <View>
      {data?.articles?.length ? (
        <View style={styles.wrapper}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="clipboard-text-multiple" size={20} />
            <Text style={[FONTS.textBold14, styles.title]}>Artikel</Text>
          </View>
          {data?.articles?.map(item => (
            <ArticleDetailItem
              key={item.idArticle}
              title={item.nameArticle}
              source={item?.urlBanner}
              date={item.createdDate}
              onPress={() => onPress(item, 1)}
            />
          ))}
        </View>
      ) : null}
      {data?.bookJs?.length ? (
        <View style={styles.wrapper}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="notebook-outline" size={20} />
            <Text style={[FONTS.textBold14, styles.title]}>Buku</Text>
          </View>
          {data.bookJs.map(item => (
            <BookDetailItem
              key={item.idBook}
              data={item}
              onPress={() => onPress(item, 2)}
            />
          ))}
        </View>
      ) : null}

      {data?.penyuluhanJs?.length ? (
        <View style={styles.wrapper}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="alpha-p-circle-outline" size={20} />
            <Text style={[FONTS.textBold14, styles.title]}>Penyuluhan</Text>
          </View>
          {data.penyuluhanJs.map(item => (
            <ArticleDetailItem
              key={item.idPenyuluhan}
              title={item.tittle}
              source={item?.urlBanner}
              date={item.createdDate}
              onPress={() => onPress(item, 3)}
            />
          ))}
        </View>
      ) : null}
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
