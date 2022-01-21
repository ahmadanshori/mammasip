import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ArticleItem} from '../Items';
import {COLORS, FONTS} from '../../constants';

const ArticleRecomendation = ({data, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <MaterialIcons name="library-books" size={16} style={styles.icon} />
          <Text style={FONTS.textBold14}>Artikel Terpopuler</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        {data.map(item => (
          <ArticleItem
            key={item.idArticle}
            onPress={() => onPress(item.idArticle)}
            title={item.nameArticle}
            date={item.createdDate}
            source={item.urlBanner}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginVertical: 8},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  icon: {marginRight: 8},
  seeAll: {color: COLORS.primary, paddingVertical: 6, paddingLeft: 8},
});
export default ArticleRecomendation;
