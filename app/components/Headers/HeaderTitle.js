import React from 'react';
import {Text, View, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, SIZES} from '../../constants';

const HeaderTitle = ({
  title,
  onSharePress,
  onGoBack,
  onDownloadPress,
  backgroundColor,
  white,
}) => {
  const navigation = useNavigation();
  const containerStyles = [styles.body];
  if (backgroundColor) {
    containerStyles.push({backgroundColor});
  }
  return (
    <View style={containerStyles}>
      <TouchableOpacity
        style={styles.button}
        onPress={onGoBack ? onGoBack : () => navigation.goBack()}
        activeOpacity={SIZES.opacity}>
        <Icon
          name={Platform.OS === 'ios' ? 'left' : 'arrowleft'}
          size={18}
          color={white ? COLORS.white : COLORS.black}
        />
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Text
          style={[
            FONTS.textBold14,
            {color: white ? COLORS.white : COLORS.black, flex: 1},
          ]}
          numberOfLines={2}>
          {title}
        </Text>
      </View>
      {onSharePress ? (
        <TouchableOpacity style={styles.shareButton} onPress={onSharePress}>
          <Icon name="sharealt" size={18} />
        </TouchableOpacity>
      ) : null}
      {onDownloadPress ? (
        <TouchableOpacity style={styles.shareButton} onPress={onDownloadPress}>
          <MaterialIcons name="file-download" size={18} />
        </TouchableOpacity>
      ) : (
        <View style={styles.empty} />
      )}
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
    borderBottomWidth: 1,
    borderColor: COLORS.separator,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    paddingVertical: 16,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shareButton: {paddingVertical: 16, paddingHorizontal: 24},
  empty: {width: '15%', height: 44},
});

export default HeaderTitle;
