import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {COLORS, FONTS, SIZES} from '../../constants';

const GKSContent = ({data, onPress}) => {
  const html = `${data.gks_text}`;
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
            source={require('../../assets/icons/logo.png')}
            style={styles.logo}
          />
        </View>
      )}
      <View style={styles.imageWrapper}>
        <View style={styles.imgWrapper}>
          <Image
            source={{
              uri: data.gks_media_list[0].url,
            }}
            style={styles.img}
          />
        </View>
      </View>
      <Text style={[FONTS.textBold16, styles.text]}>
        {data?.kata_pengantar}
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          onPress(data.redirect_mobile_path, data.redirect_mobile_id)
        }>
        <View pointerEvents="none">
          <RenderHtml
            contentWidth={SIZES.width}
            originWhitelist={['*']}
            source={{
              html: html,
            }}
          />
        </View>
      </TouchableOpacity>
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
  logoWrapper: {position: 'absolute', right: 16, top: 16},
  logo: {height: 80, width: 80},
  imageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgWrapper: {
    backgroundColor: 'white',
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 16,
  },
  img: {
    height: SIZES.width3,
    width: SIZES.width3,
  },
  text: {color: COLORS.black, marginBottom: 8},
  webview: {},
});

export default GKSContent;
