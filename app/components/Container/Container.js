import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {COLORS} from '../../constants';

const Container = ({children, backgroundColor, style = {}}) => {
  const containerStyles = [[styles.container, style]];
  if (backgroundColor) {
    containerStyles.push({backgroundColor});
  }
  return (
    <>
      <SafeAreaView style={styles.safearea} />
      <View style={containerStyles}>{children}</View>
      <SafeAreaView style={styles.footer} />
    </>
  );
};

const styles = StyleSheet.create({
  safearea: {backgroundColor: COLORS.primary},
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  footer: {backgroundColor: COLORS.white},
});

export default Container;
