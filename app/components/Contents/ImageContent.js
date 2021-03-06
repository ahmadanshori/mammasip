import React from 'react';
import RenderHtml from 'react-native-render-html';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../../constants';

const ImageContent = ({data, onPress}) => {
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
        <Ionicons
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
      <TouchableOpacity activeOpacity={SIZES.opacity} onPress={onPress}>
        <Image
          source={{uri: data?.url}}
          style={styles.img}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.separator,
    backgroundColor: COLORS.white,
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
  margin: {
    marginRight: 6,
  },
  logo: {height: 70, width: 70},
  img: {
    height: SIZES.width + 56,
    width: SIZES.width - 56,
    borderRadius: 6,
  },
  iconPlay: {
    padding: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    zIndex: 999,
  },
});

export default ImageContent;
