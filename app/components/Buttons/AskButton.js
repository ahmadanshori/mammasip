import React from 'react';
import {Text, View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../constants';

const AskButton = ({onPress, disable = false}) => {
  return (
    <TouchableNativeFeedback onPress={onPress} disabled={disable}>
      <View style={styles.button}>
        <Icon name="questioncircleo" size={20} color={COLORS.primary} />
        <Text
          style={[FONTS.textBold14, {color: COLORS.primary, marginLeft: 8}]}>
          Tanya Jawab
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.shadowPrimary,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
});

export default AskButton;
