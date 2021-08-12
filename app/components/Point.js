import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, SIZES} from '../constants';

const Point = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circleWrapper}>
        <View style={styles.circle} />
      </View>
      <View>
        <View style={styles.row}>
          <Text style={[FONTS.textBold12, {color: COLORS.black}]}>
            Poin kuis anda
          </Text>
          <Text
            style={[FONTS.textBold12, {color: COLORS.primary, marginLeft: 8}]}>
            1.450
          </Text>
        </View>
        <Text style={[FONTS.text10, {color: COLORS.black}]}>
          Ayo jawab kuis buat perluas wawasan
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.lightYellow,
    borderRadius: 16,
    marginBottom: 24,
  },
  circleWrapper: {
    backgroundColor: COLORS.yellow,
    padding: 8,
    borderRadius: 50,
    marginRight: 20,
  },
  circle: {
    backgroundColor: COLORS.darkYellow,
    height: 42,
    width: 42,
    borderRadius: 42,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
});

export default Point;
