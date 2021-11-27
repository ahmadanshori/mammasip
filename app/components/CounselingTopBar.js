import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS} from '../constants';

const CounselingTopBar = ({onPress, select}) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <TouchableNativeFeedback onPress={() => onPress(1)}>
          <View style={[styles.button, select === 1 && styles.active]}>
            <Text
              style={[
                select === 1 ? FONTS.textBold12 : FONTS.text12,
                select === 1 ? styles.textActive : styles.textInActive,
              ]}>
              Brosur/Flyer Penyuluh
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => onPress(2)}>
          <View style={[styles.button, select === 2 && styles.active]}>
            <Text
              style={[
                select === 2 ? FONTS.textBold12 : FONTS.text12,
                select === 2 ? styles.textActive : styles.textInActive,
              ]}>
              Powerpoint Penyuluh
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => onPress(3)}>
          <View style={[styles.button, select === 3 && styles.active]}>
            <Text
              style={[
                select === 3 ? FONTS.textBold12 : FONTS.text12,
                select === 3 ? styles.textActive : styles.textInActive,
              ]}>
              Poster Penyuluh
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => onPress(4)}>
          <View style={[styles.button, select === 4 && styles.active]}>
            <Text
              style={[
                select === 4 ? FONTS.textBold12 : FONTS.text12,
                select === 4 ? styles.textActive : styles.textInActive,
              ]}>
              Vidio Penyuluh
            </Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingRight: 8, paddingLeft: 16},
  button: {
    marginRight: 16,
    paddingVertical: 8,
  },
  active: {
    borderBottomWidth: 3,
    borderColor: COLORS.primary,
  },
  textActive: {color: COLORS.primary},
  textInActive: {color: COLORS.black},
});

export default CounselingTopBar;
