import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import {COLORS, FONTS, SIZES} from '../../constants';

const VideoMessageContent = ({data, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={{uri: data?.url_narsum}} style={styles.img} />
        <View style={styles.text}>
          <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
            {data?.nama_narsum}
          </Text>
          <Text style={[FONTS.text12, {color: COLORS.black}]}>
            {data?.profesi_narsum}
          </Text>
        </View>
      </View>
      <Text style={[FONTS.text12, styles.pengantar]}>
        “{data?.kata_pengantar}”
      </Text>
      <View style={styles.imgWrapper}>
        <WebView
          source={{uri: data?.url}}
          mediaPlaybackRequiresUserAction={true}
          automaticallyAdjustContentInsets={false}
          //   userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        />
        <TouchableOpacity style={styles.shadow} onPress={onPress} />
      </View>
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
  },
  text: {marginLeft: 12, justifyContent: 'center', flex: 1},
  img: {height: 60, width: 60, borderRadius: 60, backgroundColor: COLORS.gray},
  margin: {
    marginRight: 6,
  },
  pengantar: {
    color: COLORS.black,
    marginVertical: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  imgWrapper: {
    height: SIZES.width2,
    width: SIZES.width - 56,
  },
  shadow: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: COLORS.shadowWhite,
  },
});

export default VideoMessageContent;
