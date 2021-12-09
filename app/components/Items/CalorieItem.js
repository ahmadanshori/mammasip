import React, {useMemo} from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../constants';

const CalorieItem = ({data, onPress}) => {
  const validationColor = useMemo(() => {
    const {tipe_menu_sehat} = data;
    if (tipe_menu_sehat === 3 || tipe_menu_sehat === 4) {
      return {backgroundColor: COLORS.blue};
    } else if (tipe_menu_sehat === 5 || tipe_menu_sehat === 6) {
      return {backgroundColor: COLORS.secondary};
    } else if (tipe_menu_sehat === 7 || tipe_menu_sehat === 8) {
      return {backgroundColor: COLORS.red};
    } else {
      return {backgroundColor: COLORS.primary};
    }
  }, [data]);
  return (
    <TouchableNativeFeedback onPress={() => onPress(data)}>
      <View style={[styles.container, validationColor]} activeOpacity={1}>
        <Text style={[FONTS.text12, {color: COLORS.white}]}>Kalori Harian</Text>
        <View style={styles.justify}>
          <Text style={[FONTS.textBold18, {color: COLORS.white}]}>
            {data?.keterangan}
          </Text>
          <Icon name="arrowright" size={25} color={COLORS.white} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.primary,
    marginTop: 16,
    borderRadius: 6,
  },
  justify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
});

export default CalorieItem;
