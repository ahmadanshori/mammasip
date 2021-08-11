import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, SIZES} from '../constants';

const CategoryHome = ({onPressCategory}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={SIZES.opacity}
        onPress={onPressCategory}>
        <View style={[styles.iconWrapper, {backgroundColor: COLORS.secondary}]}>
          <MaterialIcons name="filter-vintage" size={26} color={COLORS.white} />
        </View>
        <Text style={[FONTS.text8, {color: COLORS.black}]}>Skrining</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={SIZES.opacity}
        onPress={onPressCategory}>
        <View style={[styles.iconWrapper, {backgroundColor: COLORS.primary}]}>
          <Ionicons name="search" size={26} color={COLORS.white} />
        </View>
        <Text style={[FONTS.text8, {color: COLORS.black}]}>
          Artikel Pilihan
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={SIZES.opacity}
        onPress={onPressCategory}>
        <View style={[styles.iconWrapper, {backgroundColor: COLORS.primary}]}>
          <Ionicons name="play-circle" size={26} color={COLORS.white} />
        </View>
        <Text style={[FONTS.text8, {color: COLORS.black}]}>Video</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={SIZES.opacity}
        onPress={onPressCategory}>
        <View style={[styles.iconWrapper, {backgroundColor: COLORS.yellow}]}>
          <MaterialIcons name="calculate" size={26} color={COLORS.white} />
        </View>
        <Text style={[FONTS.text8, {color: COLORS.black}]}>
          Kalkulator kalori
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: -50,
    borderRadius: 12,
    elevation: 6,
  },
  wrapper: {
    width: '24%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 46,
    marginBottom: 8,
  },
});

export default CategoryHome;
