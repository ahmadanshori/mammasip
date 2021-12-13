import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderHtml from 'react-native-render-html';
import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';

const ArticleContent = ({data}) => {
  const html = `<html>
    <head>
    </head>
    <body>
    ${data.article.bodyArticle}
    </body>
    </html>`;
  return (
    <View style={styles.container}>
      {data?.kata_pengantar && (
        <View style={styles.wrapper}>
          <Ionicons
            name="alert-circle-outline"
            size={16}
            color={COLORS.white}
            style={styles.margin}
          />
          <Text style={[FONTS.text10, {color: COLORS.white, flex: 1}]}>
            {data.kata_pengantar}
          </Text>
          {data.flag_important === 1 && (
            <Image
              resizeMode="contain"
              source={require('../../assets/icons/logo.gif')}
              style={styles.logo}
            />
          )}
        </View>
      )}

      <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
        {data.article?.nameArticle}
      </Text>
      <Text style={[FONTS.text10, {color: COLORS.gray, marginTop: 8}]}>
        Dipublikasi pada{' '}
        {formatDate(data.article.createdDate, 'dd MMMM yyyy HH:mm')}
      </Text>
      <RenderHtml
        contentWidth={SIZES.width}
        source={{
          html: html,
        }}
      />
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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: COLORS.primary,
    padding: 6,
    borderRadius: 6,
    width: '100%',
  },
  margin: {
    marginRight: 6,
  },
  logo: {height: 50, width: 50},
});

export default ArticleContent;
