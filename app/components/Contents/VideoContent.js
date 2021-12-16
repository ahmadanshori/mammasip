import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../constants';

const VideoContent = ({data, onPress}) => {
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
        {data.flag_important === 1 && (
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/logo.gif')}
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
    padding: 6,
    borderRadius: 6,
    width: '100%',
  },
  logo: {height: 50, width: 50},
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
