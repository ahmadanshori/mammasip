import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../constants';

const ImageContent = ({data, onPress}) => {
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
          {data.kata_pengantar}
        </Text>
        {data.flag_important === 1 && (
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/logo.gif')}
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
    padding: 6,
    borderRadius: 6,
    width: '100%',
  },
  margin: {
    marginRight: 6,
  },
  logo: {height: 50, width: 50},
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
