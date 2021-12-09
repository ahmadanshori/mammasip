import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const DestinationContent = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={[FONTS.text12, styles.text]}>{data?.kata_tujuan}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.separator,
  },
  text: {color: COLORS.white, textAlign: 'center'},
});

export default DestinationContent;
