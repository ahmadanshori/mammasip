import React from 'react';
import {Text, View, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../../constants';

const HeaderTitle = ({title, onSharePress, backgroundColor, white}) => {
  const navigation = useNavigation();
  const containerStyles = [styles.body];
  if (backgroundColor) {
    containerStyles.push({backgroundColor});
  }
  return (
    <View style={containerStyles}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={SIZES.opacity}>
          <Icon
            name={'arrowleft'}
            size={18}
            color={white ? COLORS.white : COLORS.black}
          />
        </TouchableOpacity>
        <Text
          style={[
            FONTS.textBold14,
            {color: white ? COLORS.white : COLORS.black, flex: 1},
          ]}
          numberOfLines={1}>
          {title}
        </Text>
      </View>
      {onSharePress ? (
        <TouchableOpacity style={styles.shareButton} onPress={onSharePress}>
          <Icon name="sharealt" size={18} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: COLORS.white,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBack: {
    height: 30,
    width: 30,
  },
  settingButton: {padding: 8},
  shareButton: {paddingVertical: 16, paddingHorizontal: 24},
});

export default HeaderTitle;
