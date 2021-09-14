import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ArticleItem, ArticleDetailItem} from '../Items';
import {OutlineButton} from '../Buttons';
import {COLORS, FONTS} from '../../constants';

const data1 = [1, 2, 3, 4];

const ArticleRecomendation = ({onPress}) => {
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
          ]}>
          Lihat Semua
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data1.map(item => (
          <ArticleItem key={item} onPress={onPress} category />
        ))}
      </ScrollView>
      <View style={styles.body}>
        <ArticleDetailItem />
        <ArticleDetailItem />
        <ArticleDetailItem />
      </View>
      <OutlineButton title="Lihat Semua Artikel" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginTop: 32},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  icon: {marginRight: 8},
  body: {marginTop: 24, marginBottom: 8},
});
export default ArticleRecomendation;
