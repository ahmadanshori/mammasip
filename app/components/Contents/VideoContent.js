import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../../constants';

const VideoContent = ({data, onPress}) => {
  const html = `<div style="color: ${
    data.flag_important === 1 ? COLORS.primary : COLORS.white
  };">${data?.kata_pengantar}</div>`;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor:
              data.flag_important === 1 ? COLORS.darkYellow : COLORS.primary,
          },
        ]}>
        <Icon
          name="alert-circle-outline"
          size={20}
          color={data.flag_important === 1 ? COLORS.primary : COLORS.white}
          style={styles.margin}
        />
        <View style={{flex: 1}}>
          <RenderHtml
            contentWidth={SIZES.width}
            source={{
              html: html,
            }}
          />
        </View>
        {data.flag_important === 1 && (
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/logo.png')}
            style={styles.logo}
          />
        )}
      </View>
      {data?.url ? (
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
          <Image source={{uri: data.url}} style={styles.imgVideo} />
          <View style={styles.shadowImg}>
            <View style={styles.circleIcon}>
              <Icon
                name="play-circle"
                size={40}
                color={COLORS.red}
                style={styles.circle}
              />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.notfoundImg}>
          <Icon name="image-outline" size={30} color={COLORS.gray} />
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
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 6,
    width: '100%',
  },
  logo: {height: 80, width: 80},
  margin: {
    marginRight: 6,
  },
  imgVideo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width2,
    width: '100%',
    borderRadius: 8,
  },
  shadowImg: {
    height: SIZES.width2,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 99,
  },
  notfoundImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width5 - 8,
    width: SIZES.width5 - 8,
    borderRadius: 8,
    backgroundColor: COLORS.separator,
  },
  circleIcon: {
    backgroundColor: COLORS.shadowWhite,
    borderRadius: 50,
    height: 47,
    width: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {marginLeft: 2},
});

export default VideoContent;
