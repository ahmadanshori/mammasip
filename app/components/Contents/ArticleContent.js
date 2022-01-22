import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderHtml from 'react-native-render-html';
import {COLORS, FONTS, SIZES} from '../../constants';
import {ArticleItem} from '../Items';
import formatDate from '../../libs/formatDate';
import {OutlineButton} from '../Buttons';

const ArticleContent = ({data, onArticle, show}) => {
  const html = `${data.article.abstractArticle}`;
  return (
    <View style={styles.container}>
      {!show ? (
        <View style={styles.box}>
          <Image
            source={require('../../assets/images/ayla.png')}
            style={styles.icon}
          />
          <Text style={[FONTS.text10, {flex: 1, color: COLORS.white}]}>
            Semoga Sahabat MammaSIP paham ya semua informasi sebelumnya. Untuk
            Sahabat yang ingin membaca informasi yang lebih lengkap dan detil,
            silahkan buka artikel di bawah ini.
          </Text>
        </View>
      ) : null}
      <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
        {data.article?.nameArticle}
      </Text>
      <Text style={[FONTS.text10, {color: COLORS.gray, marginTop: 8}]}>
        Dipublikasi pada{' '}
        {formatDate(data.article.createdDate, 'dd MMMM yyyy HH:mm')}
      </Text>
      {data?.kata_pengantar && (
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor:
                data.flag_important === 1 ? COLORS.darkYellow : COLORS.primary,
            },
          ]}>
          <Ionicons
            name="alert-circle-outline"
            size={16}
            color={data.flag_important === 1 ? COLORS.primary : COLORS.white}
            style={styles.margin}
          />
          <Text
            style={[
              FONTS.text10,
              {
                color:
                  data.flag_important === 1 ? COLORS.primary : COLORS.white,
                flex: 1,
              },
            ]}>
            {data.kata_pengantar}
          </Text>
          {data.flag_important === 1 && (
            <Image
              resizeMode="contain"
              source={require('../../assets/icons/logo.png')}
              style={styles.logo}
            />
          )}
        </View>
      )}
      <RenderHtml
        contentWidth={SIZES.width}
        source={{
          html: html,
        }}
      />
      <OutlineButton
        title={'Lihat Selengkapnya'}
        onPress={() => onArticle(data.article.idArticle)}
      />
      {data.list_article_relasi.length ? (
        <>
          <Text
            style={[
              FONTS.textBold14,
              {color: COLORS.secondary, marginTop: 16},
            ]}>
            Artikel Lainnya:
          </Text>
          <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal: 16}}>
            {data.list_article_relasi.map(item => (
              <ArticleItem
                key={item.idArticle}
                isImage={false}
                title={item.nameArticle}
                date={item.createdDate}
                onPress={() => onArticle(item.idArticle)}
              />
            ))}
          </ScrollView>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.separator,
    marginHorizontal: 16,
  },
  box: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {height: 75, width: 75, marginRight: 8},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 6,
    width: '100%',
  },
  margin: {
    marginRight: 6,
  },
  logo: {height: 70, width: 70},
});

export default ArticleContent;
