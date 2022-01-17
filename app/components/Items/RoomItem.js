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

const RoomItem = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1638913662415-8c5f79b20656?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        }}
        style={styles.img}
        imageStyle={styles.border}>
        <View style={styles.box}>
          <Text style={[FONTS.textBold12, styles.text]}>{title}</Text>
          <Icon
            name="arrowright"
            size={20}
            color={COLORS.white}
            style={styles.margin}
          />
        </View>
        <View style={styles.shadow} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {width: '100%', marginBottom: 16},
  border: {borderRadius: 8},
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  text: {color: COLORS.white, flex: 1},
  margin: {marginLeft: 16},
  // shadow: {
  //   height: '100%',
  //   width: '100%',
  //   position: 'absolute',
  //   backgroundColor: COLORS.shadowPrimary,
  // },
});

export default RoomItem;
