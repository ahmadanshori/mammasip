import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const DestinationContent = ({data}) => {
  return (
    <View style={styles.container}>
      {data.flag_important === 1 && (
        <View style={styles.logoWraper}>
          <Image
            resizeMode="contain"
            source={require('../../assets/icons/logo.gif')}
            style={styles.logo}
          />
        </View>
      )}
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
  logoWraper: {alignItems: 'center', marginBottom: 6},
  logo: {height: 50, width: 50},
});

export default DestinationContent;
