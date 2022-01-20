import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import formatDate from '../../libs/formatDate';

const AgendaItem = ({onPress, data}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={1}>
          {data?.namaEvent}
        </Text>
        <View style={styles.row}>
          <Text style={styles.time}>{formatDate(data.startDate, 'HH:mm')}</Text>
          <Text style={styles.date}>
            {formatDate(data.startDate, 'eeee, dd MMMM yyyy')}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.separator,
    marginBottom: 16,
  },
  title: {...FONTS.textBold14},
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  time: {...FONTS.textBold12, color: COLORS.secondary, marginRight: 8},
  date: {...FONTS.text12, color: COLORS.gray},
});

export default AgendaItem;
