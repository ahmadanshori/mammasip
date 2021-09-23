import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {COLORS} from '../../constants';

export default () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};
