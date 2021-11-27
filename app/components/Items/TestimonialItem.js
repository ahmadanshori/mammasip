import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

const TestimonialItem = ({data}) => {
  return (
    <View style={styles.box}>
      <View style={styles.wrapper}>
        <Image source={{uri: data?.url_picture}} style={styles.img} />
        <View style={{flex: 1}}>
          <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
            {data?.nama}
          </Text>
          <Text style={[FONTS.textBold10, {color: COLORS.primary}]}>
            {data?.profesi}
          </Text>
        </View>
      </View>
      <View style={styles.testimoni}>
        <Text style={[FONTS.text12, {color: COLORS.black}]}>
          “{data?.kata_testimoni}”
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    padding: 16,
    width: SIZES.width1,
    marginRight: 8,
    borderRadius: 8,
    borderColor: COLORS.separator,
  },
  wrapper: {flexDirection: 'row'},
  img: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: 'red',
    marginRight: 8,
  },
  testimoni: {
    marginTop: 16,
    backgroundColor: COLORS.lightGray,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

export default TestimonialItem;
