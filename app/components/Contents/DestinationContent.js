import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {COLORS, ICON, SIZES} from '../../constants';

const DestinationContent = ({data, onPress}) => {
  const html = `<div style="color: #ffffff;">${data?.kata_tujuan}</div>`;
  return (
    <View style={styles.container}>
      <ICON.ayla height={80} width={80} />
      <View style={styles.trianggle} />
      <View style={styles.wrapper}>
        {data.flag_important === 1 && (
          <View style={styles.logoWraper}>
            <Image
              resizeMode="contain"
              source={require('../../assets/icons/logo.gif')}
              style={styles.logo}
            />
          </View>
        )}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            onPress(data.redirect_mobile_path, data.redirect_mobile_id)
          }>
          <View pointerEvents="none">
            <RenderHtml
              contentWidth={SIZES.width}
              source={{
                html: html,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 16, alignItems: 'center'},
  trianggle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.primary,
    marginTop: 6,
  },
  wrapper: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.separator,
  },
  text: {color: COLORS.white, textAlign: 'center'},
  logoWraper: {alignItems: 'center', marginBottom: 6},
  logo: {height: 50, width: 50},
});

export default DestinationContent;
