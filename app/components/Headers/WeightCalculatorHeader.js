import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../../constants';

const WeightCalculatorHeader = ({onPressBack, title, backgroundColor}) => {
  const containerStyles = [styles.container];
  if (backgroundColor) {
    containerStyles.push({backgroundColor});
  }
  return (
    <View style={containerStyles}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressBack}
          activeOpacity={SIZES.opacity}>
          <AntDesign
            name={Platform.OS === 'ios' ? 'chevron-left' : 'arrowleft'}
            size={18}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <Text
          style={[FONTS.textBold14, {color: COLORS.white, marginBottom: 16}]}>
          {title}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 16,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  button: {
    paddingBottom: 16,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBack: {
    height: 30,
    width: 30,
  },
});

export default WeightCalculatorHeader;
