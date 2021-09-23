import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {COLORS, SIZES} from '../../constants';

export default () => {
  return (
    <View
      style={{
        height: SIZES.height,
        position: 'absolute',
        zIndex: 999,
        width: SIZES.width,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={COLORS.white} />
    </View>
  );
};
