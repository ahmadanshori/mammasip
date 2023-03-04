import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS, SIZES, COLORS} from '../../constants';
import formatRupiah from '../../libs/formatRupiah';

export default ({progress, finishProgress}) => {
  return (
    <View style={styles.progressWrapper}>
      <View style={styles.progressBox}>
        <Text style={FONTS.text18}>Download Progress</Text>
        <Text style={[FONTS.textBold14, styles.mt]}>
          {formatRupiah(progress)} kb / {formatRupiah(finishProgress)} kb
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressWrapper: {
    position: 'absolute',
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: COLORS.shadowWhite,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  progressBox: {
    backgroundColor: COLORS.white,
    width: '100%',
    borderRadius: 8,
    paddingVertical: 32,
    alignItems: 'center',
  },
  mt: {marginTop: 16},
});
