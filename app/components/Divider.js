import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS} from '../constants';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {height: 16, width: '100%', backgroundColor: COLORS.lightGray},
});

export default Divider;
