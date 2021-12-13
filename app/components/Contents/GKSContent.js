import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {COLORS, FONTS, SIZES} from '../../constants';

const GKSContent = ({data}) => {
  const html = `<html>
    <head>
    </head>
    <body>
    ${data.gks_text}
    </body>
    </html>`;
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: data.gks_color_bg || COLORS.primary},
      ]}>
      {data.flag_important === 1 && (
        <View style={styles.logoWrapper}>
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/logo.gif')}
            style={styles.logo}
          />
        </View>
      )}
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: data.gks_media_list[0].url,
          }}
          style={styles.img}
        />
      </View>
      <Text style={[FONTS.textBold16, styles.text]}>
        {data?.kata_pengantar}
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
    padding: 16,
    marginBottom: 16,
    elevation: 6,
    backgroundColor: COLORS.red,
  },
  logoWrapper: {alignItems: 'flex-end'},
  logo: {height: 50, width: 50},
  imageWrapper: {alignItems: 'center'},
  img: {
    height: SIZES.width2 - 16,
    width: SIZES.width2 - 16,
    borderRadius: SIZES.width2,
    marginBottom: 16,
  },
  text: {color: COLORS.black, textAlign: 'center', marginBottom: 16},
});

export default GKSContent;
