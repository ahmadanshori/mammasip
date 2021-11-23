import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderHtml from 'react-native-render-html';
import {COLORS, FONTS, SIZES} from '../../constants';
import formatDate from '../../libs/formatDate';

const ArticleContent = ({data}) => {
  return (
    <View style={styles.container}>
      {data?.kata_pengantar && (
        <View style={styles.wrapper}>
          <Ionicons
            name="alert-circle-outline"
            size={16}
            color={COLORS.darkBlue}
            style={styles.margin}
          />
          <Text style={[FONTS.text10, {color: COLORS.black, flex: 1}]}>
            {data.kata_pengantar}
          </Text>
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
          html: data.article.bodyArticle,
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
    elevation: 6,
    backgroundColor: COLORS.white,
    ...SIZES.shadow,
    marginHorizontal: 16,
  },
  wrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#F2F6FF',
    padding: 6,
    borderRadius: 6,
    width: '100%',
  },
  margin: {
    marginRight: 6,
  },
});

export default ArticleContent;
