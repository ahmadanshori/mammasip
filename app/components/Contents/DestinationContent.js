import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS, ICON, SIZES} from '../../constants';

const DestinationContent = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ICON.people1 height={90} width={90} />
      </View>
      <View style={styles.text}>
        <Text
          style={[FONTS.text12, {color: COLORS.white, textAlign: 'center'}]}>
          {data?.kata_tujuan}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.separator,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
  },
});

export default DestinationContent;
