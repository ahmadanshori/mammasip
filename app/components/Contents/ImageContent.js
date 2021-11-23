import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, ICON, SIZES} from '../../constants';

const ImageContent = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Ionicons
          name="alert-circle-outline"
          size={16}
          color={COLORS.darkBlue}
          style={styles.margin}
        />
        <Text style={[FONTS.text10, {color: COLORS.black, flex: 1}]}>
          Bagaimana pemahaman masyarakat kebanyakan mengenai deteksi dini kanker
          payudara?
        </Text>
      </View>

      <Image
        source={require('../../assets/images/aa.jpeg')}
        style={styles.img}
      />
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

  img: {height: SIZES.width, width: SIZES.width - 56, borderRadius: 6},
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
