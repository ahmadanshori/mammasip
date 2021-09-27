import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../constants';

const Accordion = ({title, desc}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleButton = () => {
    setIsSelected(state => !state);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleButton}
        activeOpacity={1}>
        <Text style={[FONTS.textBold12, styles.title]}>{title}</Text>
        <Icon
          name={isSelected ? 'up' : 'down'}
          size={14}
          color={COLORS.black}
          style={styles.icon}
        />
      </TouchableOpacity>
      {isSelected ? (
        <View style={styles.answerWrapper}>
          <Text style={[FONTS.text12, {color: COLORS.black}]}>{desc}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 12},
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.darkWhite,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {color: COLORS.black, marginRight: 8, flex: 1},
  answerWrapper: {
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.border,
  },
  icon: {marginRight: 8},
});

export default Accordion;
