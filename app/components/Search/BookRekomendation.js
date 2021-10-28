import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ArticleItem, BookItem} from '../Items';
import {OutlineButton} from '../Buttons';
import {COLORS, FONTS} from '../../constants';

const data1 = [1, 2, 3, 4];

const ArticleRecomendation = ({seeAllOnPress, data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <MaterialIcons name="menu-book" size={18} style={styles.icon} />
          <Text style={FONTS.textBold14}>Rekomendasi Buku</Text>
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.margin}>
        {data.map(item => (
          <BookItem
            key={item.idBook}
            title={item.nameBook}
            desc={item.description}
            source={item.urlBanner}
            publisher={item.publisherBook}
            author={item.authorBook}
            date="2018"
          />
        ))}
      </ScrollView>
      {/* <OutlineButton title="Lihat Semua Buku" /> */}
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
  body: {marginBottom: 8},
  margin: {marginBottom: 16},
});
export default ArticleRecomendation;
