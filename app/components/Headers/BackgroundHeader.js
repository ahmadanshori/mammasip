import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../../constants';

const BackgroundHeader = ({
  title,
  desc,
  source,
  backgroundColor,
  white = false,
}) => {
  const navigation = useNavigation();
  const containerStyles = [styles.body];
  if (backgroundColor) {
    containerStyles.push({backgroundColor});
  }
  return (
    <ImageBackground source={source} style={styles.background}>
      <View style={containerStyles}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={SIZES.opacity}>
          <Icon
            name={Platform.OS === 'ios' ? 'left' : 'arrowleft'}
            size={18}
            color={white ? COLORS.white : COLORS.black}
          />
        </TouchableOpacity>
        <View style={styles.w15} />
      </View>
      <View style={styles.textWrapper}>
        <Text
          style={[
            FONTS.textBold18,
            {color: white ? COLORS.white : COLORS.black, textAlign: 'center'},
          ]}>
          {title}
        </Text>
        <Text
          style={[
            FONTS.text14,
            {color: white ? COLORS.white : COLORS.black, textAlign: 'center'},
          ]}>
          {desc}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  background: {height: SIZES.width2 - 34, width: SIZES.width},
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  button: {
    width: '15%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  w15: {width: '15%'},
});

export default BackgroundHeader;
