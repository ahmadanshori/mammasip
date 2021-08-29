import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants';

const MealItem = ({icon, name, calories}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[FONTS.text14, {color: COLORS.black}]}>{name}</Text>
        <Text style={[FONTS.text12, {color: COLORS.gray, marginLeft: 6}]}>
          {calories} Kkal
        </Text>
      </View>
      {icon ? <Icon name="chevron-down" size={20} /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.border,
    backgroundColor: COLORS.darkWhite,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
});

export default MealItem;
