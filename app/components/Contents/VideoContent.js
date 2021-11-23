import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../constants';

const VideoContent = ({data, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Ionicons
          name="alert-circle-outline"
          size={20}
          color={COLORS.darkBlue}
          style={styles.margin}
        />
        <Text style={[FONTS.text10, {color: COLORS.black, flex: 1}]}>
          {data?.kata_pengantar}
        </Text>
      </View>
      <View style={styles.imgWrapper}>
        <WebView
          source={{uri: data?.url}}
          mediaPlaybackRequiresUserAction={true}
          automaticallyAdjustContentInsets={false}
          //   userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        />
        {/* <VideoPlayer
          source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
          seekColor={COLORS.primary}
        /> */}
        {/* <Image
          source={require('../../assets/images/aa.jpeg')}
          style={styles.img}
        /> */}
        <TouchableOpacity style={styles.shadow} onPress={onPress} />
        {/* <View style={styles.iconPlay}>
          <Ionicons name="play" size={30} color={COLORS.primary} />
        </View> */}
      </View>
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
  imgWrapper: {
    height: SIZES.width2,
    width: SIZES.width - 56,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  img: {
    height: SIZES.width2,
    width: SIZES.width - 56,
    borderRadius: 6,
    backgroundColor: COLORS.shadowWhite,
  },
  iconPlay: {
    padding: 14,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    zIndex: 999,
  },
  shadow: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: COLORS.shadowWhite,
  },
});

export default VideoContent;
