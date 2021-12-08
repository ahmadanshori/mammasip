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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, SIZES} from '../../constants';

const DoctorHeader = ({
  title,
  onSharePress,
  onDownloadPress,
  source,
  backgroundColor,
  white,
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
        <View style={{width: '60%'}}>
          <Text
            style={[
              FONTS.textBold14,
              {color: white ? COLORS.white : COLORS.black, flex: 1},
            ]}>
            Kenali Diri
          </Text>
          <Text
            style={[
              FONTS.textBold14,
              {color: white ? COLORS.white : COLORS.black, flex: 1},
            ]}>
            Kenali Diri
          </Text>
        </View>

        <View style={{width: '20%', height: 50, backgroundColor: 'blue'}} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {height: SIZES.width2, width: SIZES.width},
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
    width: '20%',
    backgroundColor: 'red',
  },
  iconBack: {
    height: 30,
    width: 30,
  },
  settingButton: {padding: 8},
  shareButton: {paddingVertical: 16, paddingHorizontal: 24},
});

export default DoctorHeader;
