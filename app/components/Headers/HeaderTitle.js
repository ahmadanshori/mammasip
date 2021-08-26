import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../../constants';

const HeaderTitle = ({ title, onSharePress}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.body}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}
            activeOpacity={SIZES.opacity}>
            <Icon
              name={Platform.OS === 'ios' ? 'chevron-left' : 'arrowleft'}
              size={18}
            />
          </TouchableOpacity>
          <Text
            style={[FONTS.textBold14, {color: COLORS.black, flex: 1}]}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: COLORS.white,
    zIndex: 99,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
