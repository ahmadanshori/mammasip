import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../../constants';

const HeaderTitle = ({onPressBack, title}) => {
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressBack}
          activeOpacity={SIZES.opacity}>
          <AntDesign
            name={Platform.OS === 'ios' ? 'chevron-left' : 'arrowleft'}
            size={18}
          />
        </TouchableOpacity>
        <Text style={[FONTS.textBold14, {color: COLORS.black}]}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.blackShadow,
    shadowOffset: {height: 0, width: 2},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 6,
    zIndex: 99,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBack: {
    height: 30,
    width: 30,
  },
  settingButton: {padding: 8},
});

export default HeaderTitle;
