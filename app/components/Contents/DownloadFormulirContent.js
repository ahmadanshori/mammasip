import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, SIZES, ICON} from '../../constants';

const DownloadFormulirContent = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={SIZES.opacity}
      onPress={onPress}>
      <ICON.panduan height={60} width={60} />
      <View style={{flex: 1, marginHorizontal: 8}}>
        <Text
          style={[FONTS.textBold12, {color: COLORS.white, marginBottom: 4}]}>
          Unduh Formulir Panduan Pemeriksaan Payudara Klinis (SADANIS)
        </Text>
        <Text style={[FONTS.text10, {color: COLORS.white, flex: 1}]}>
          Fasilitas Kesehatan Tingkat Pertama (FKTP)
        </Text>
      </View>
      <View>
        <Icon name="download" size={25} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: COLORS.darkOrange,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  img: {width: 60, height: 60},
});

export default DownloadFormulirContent;
