import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import {Container} from '../components/Container';
import {VideoItem, ArticleItem} from '../components/Items';
import {VideoHeader} from '../components/Headers';
import {COLORS, FONTS, SIZES} from '../constants';

const VideoDetailScreen = () => {
  return (
    <Container>
      <VideoHeader />
      <Text>VideoDetailScreen</Text>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={FONTS.textBold14}>Artikel lain yang terkait</Text>
          {/* <Text style={[FONTS.text12, {color: COLORS.primary}]}>
            Lihat Semua
          </Text> */}
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
      </View>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={FONTS.textBold14}>Video yang mungkin anda suka</Text>
          {/* <Text style={[FONTS.text12, {color: COLORS.primary}]}>
            Lihat Semua
          </Text> */}
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
      </View>
    </Container>
  );
};

export default VideoDetailScreen;

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
