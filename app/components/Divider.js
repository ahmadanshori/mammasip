import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS} from '../constants';

const Divider = ({height, style = {}}) => {
  const containerStyles = [[styles.divider, style]];
  if (height) {
    containerStyles.push({height});
  }
  return <View style={containerStyles} />;
};

const styles = StyleSheet.create({
  divider: {height: 14, width: '100%', backgroundColor: COLORS.lightGray},
});

export default Divider;
