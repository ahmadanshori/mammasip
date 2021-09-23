import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import {Container} from '../components/Container';
import {VideoItem, ArticleItem} from '../components/Items';
import {VideoHeader} from '../components/Headers';
import {COLORS, FONTS, SIZES} from '../constants';

const ArticleDetailScreen = () => {
  return (
    <Container>
      <VideoHeader />
      <Text>ArticleDetailScreen</Text>
      {/* <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={FONTS.textBold14}>Artikel lain yang terkait</Text>
        
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontal}>
          <ArticleItem category />
          <ArticleItem category />
          <ArticleItem category />
          <ArticleItem category />
        </ScrollView>
      </View> */}
      {/* <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={FONTS.textBold14}>Video yang mungkin anda suka</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontal}>
          <ArticleItem video />
          <ArticleItem video />
          <ArticleItem video />
          <ArticleItem video />
        </ScrollView>
      </View> */}
    </Container>
  );
};

export default ArticleDetailScreen;

const styles = StyleSheet.create({
  wrapper: {paddingTop: 24},
  horizontal: {paddingHorizontal: 16},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
