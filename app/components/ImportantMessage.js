import React from 'react';
import {StyleSheet, View} from 'react-native';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, SIZES} from '../constants';

const ImportantMessage = ({title, style}) => {
  const html = `<div style="color: #ffffff;">${title}</div>`;
  return (
    <View style={[styles.wrapper, style]}>
      <Icon
        name="alert-circle"
        size={20}
        color={COLORS.white}
        style={styles.icon}
      />
      <View style={{flex: 1}}>
        <RenderHtml
          contentWidth={SIZES.width}
          source={{
            html: html,
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
  },
  icon: {marginRight: 6},
});

export default ImportantMessage;
