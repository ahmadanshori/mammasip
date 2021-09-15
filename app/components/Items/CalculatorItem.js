import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../constants';

const CalculatorItem = ({
  title,
  description,
  source,
  backgroundColor,
  onPress,
  image,
}) => {
  const containerStyles = [styles.wrapper];
  if (backgroundColor) {
    containerStyles.push({backgroundColor});
  }
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={containerStyles}>
        {image}
        {/* <Image source={source} style={styles.img} /> */}
        <View style={styles.textWrapper}>
          <Text style={[FONTS.textBold12, {color: COLORS.white}]}>{title}</Text>
          <Text style={[FONTS.text10, {color: COLORS.white, marginTop: 4}]}>
            {description}
          </Text>
        </View>
        <View style={styles.iconWrapper}>
          <Icon name="chevron-right" size={20} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  img: {height: 60, width: 60},
  textWrapper: {flex: 1, marginHorizontal: 8},
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 6,
    borderRadius: 40,
  },
});

export default CalculatorItem;
