import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../constants';

const RoomItem = ({title, onPress}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.box}>
        <Text style={[FONTS.textBold12, styles.text]}>{title}</Text>
        <Icon
          name="arrowright"
          size={20}
          color={COLORS.black}
          style={styles.margin}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.separator,
    marginBottom: 16,
  },
  text: {color: COLORS.black, flex: 1},
  margin: {marginLeft: 8},
});

export default RoomItem;
