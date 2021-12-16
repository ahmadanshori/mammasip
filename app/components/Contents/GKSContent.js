import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {COLORS, FONTS, SIZES} from '../../constants';

const GKSContent = ({data}) => {
  const html = `${data.gks_text}`;
  // const INJECTEDJAVASCRIPT = "document.body.style.userSelect = 'none'";
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
      <View pointerEvents="none">
        <RenderHtml
          contentWidth={SIZES.width}
          source={{
            html: html,
          }}
          // injectedJavaScript={INJECTEDJAVASCRIPT}
        />
      </View>
      <Text style={[FONTS.sayangi, {color: COLORS.black, marginTop: 8}]}>
        #Sayangi Dirimu!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 16,
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
  text: {color: COLORS.black, marginBottom: 8},
});

export default GKSContent;
