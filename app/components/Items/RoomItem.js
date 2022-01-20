import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../constants';

const RoomItem = ({title, onPress, source}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <ImageBackground
        source={{
          uri: source,
        }}
        style={styles.img}
        imageStyle={styles.border}>
        <View style={styles.wrapper}>
          <View style={styles.box}>
            <Text style={[FONTS.textBold14, styles.text]}>{title}</Text>
            <Icon
              name="arrowright"
              size={20}
              color={COLORS.white}
              style={styles.margin}
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {width: '100%', marginBottom: 16},
  border: {borderRadius: 8},
  wrapper: {backgroundColor: COLORS.background, borderRadius: 8},
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  text: {color: COLORS.white, flex: 1},
  margin: {marginLeft: 16},
});

export default RoomItem;
