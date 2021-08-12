import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const Container = ({children, backgroundColor, style = {}}) => {
  const containerStyles = [[styles.container, style]];
  if (backgroundColor) {
    containerStyles.push({backgroundColor});
  }
  return <View style={containerStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});

export default Container;
