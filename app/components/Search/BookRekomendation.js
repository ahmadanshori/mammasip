import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BookItem} from '../Items';
import {FONTS} from '../../constants';

const ArticleRecomendation = ({data, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <MaterialIcons name="menu-book" size={18} style={styles.icon} />
          <Text style={FONTS.textBold14}>Buku Terpopuler</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.margin}>
        {data.map(item => (
          <BookItem
            key={item.idBook}
            title={item.nameBook}
            desc={item.description}
            source={item.urlBanner}
            publisher={item.publisherBook}
            author={item.authorBook}
            date={item.year}
            uploadDate={item.createdDate}
            onPress={() => onPress(item.urlBook)}
            isImage={item.typeBook === 3 ? false : true}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginBottom: 24},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  icon: {marginRight: 8},
  margin: {marginBottom: 16},
});
export default ArticleRecomendation;
