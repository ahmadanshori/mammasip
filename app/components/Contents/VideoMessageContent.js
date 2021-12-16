import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
      {data?.url ? (
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
          <Image source={{uri: data.url}} style={styles.imgVideo} />
          <View style={styles.shadowImg}>
            <View style={styles.circleIcon}>
              <Icon
                name="play-circle"
                size={40}
                color={COLORS.red}
                style={styles.margin}
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
  },
  text: {marginLeft: 12, justifyContent: 'center', flex: 1},
  img: {height: 60, width: 60, borderRadius: 60, backgroundColor: COLORS.gray},
  pengantar: {
    color: COLORS.black,
    marginVertical: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  imgVideo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width2 - 8,
    width: '100%',
    borderRadius: 8,
  },
  shadowImg: {
    height: SIZES.width2 - 8,
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
  margin: {marginLeft: 2},
});

export default VideoMessageContent;
