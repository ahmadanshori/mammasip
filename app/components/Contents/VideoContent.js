import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../constants';

const VideoContent = ({data, onPress}) => {
  console.log(`data`, data);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Ionicons
          name="alert-circle-outline"
          size={20}
          color={COLORS.white}
          style={styles.margin}
        />
        <Text style={[FONTS.text10, {color: COLORS.white, flex: 1}]}>
          {data?.kata_pengantar}
        </Text>
      </View>
      {/* <View style={styles.imgWrapper}>
        <WebView
          source={{uri: data?.url}}
          mediaPlaybackRequiresUserAction={true}
          automaticallyAdjustContentInsets={false}
        />
        <TouchableOpacity style={styles.shadow} onPress={onPress} />
      </View> */}
      {/* <View style={styles.imgWrapper}>
        <Text>aaa</Text>
      </View> */}
      {data.url ? (
        <TouchableOpacity activeOpacity={SIZES.opacity} onPress={onPress}>
          <Image source={{uri: data.url}} style={styles.image} />
          <View style={styles.shadow}>
            <MaterialCommunityIcons
              name="youtube"
              size={60}
              color={COLORS.red}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.notfound}>
          <MaterialCommunityIcons
            name="video-off-outline"
            size={60}
            color={COLORS.gray}
          />
        </View>
      )}
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
    marginBottom: 12,
    backgroundColor: COLORS.primary,
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
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: COLORS.shadowWhite,
  },
  image: {height: SIZES.width2, width: SIZES.width - 56, borderRadius: 6},
  notfound: {
    backgroundColor: COLORS.lightGray,
    height: SIZES.width2,
    width: SIZES.width - 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
});

export default VideoContent;
