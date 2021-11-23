import React from 'react';
import {View, TouchableOpacity, Platform, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, SIZES} from '../../constants';

const VideoHeader = ({onSharePress, onDownload, onBookmark, onFavorite}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
        activeOpacity={SIZES.opacity}>
        <Icon name={Platform.OS === 'ios' ? 'left' : 'arrowleft'} size={18} />
      </TouchableOpacity>
      <View style={styles.row}>
        {/* <TouchableOpacity style={styles.heartIcon} onPress={onFavorite}>
          <Icon name="heart" size={16} style={styles.margin} />
          <Text style={FONTS.text12}>100</Text>
        </TouchableOpacity> */}
        {onSharePress && (
          <TouchableOpacity style={styles.wrapper} onPress={onSharePress}>
            <Icon name="sharealt" size={16} />
          </TouchableOpacity>
        )}
        {onDownload && (
          <TouchableOpacity style={styles.wrapper} onPress={onDownload}>
            <MaterialIcons name="file-download" size={18} />
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity style={styles.wrapper} onPress={onBookmark}>
          <MaterialIcons name="bookmark-outline" size={18} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: COLORS.white,
    zIndex: 99,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  heartIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 4,
  },
  margin: {marginRight: 8},
  wrapper: {paddingVertical: 16, paddingRight: 16, paddingLeft: 4},
});

export default VideoHeader;
