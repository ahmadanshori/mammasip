import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import formatDate from '../../libs/formatDate';

const WeightItem = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.between}>
        <Text style={[FONTS.text12, {color: COLORS.gray, marginRight: 6}]}>
          {formatDate(data.created_date, 'dd MMMM yyyy HH:mm')}
        </Text>
        <Text
          style={[
            FONTS.textBold12,
            {color: COLORS.blue, textAlign: 'right', width: '50%'},
          ]}>
          {data?.desc_value}
        </Text>
      </View>
      <View style={[styles.between, {marginTop: 8}]}>
        <View style={styles.row}>
          <View style={[styles.row, {marginRight: 16}]}>
            <Text style={[FONTS.textBold16, {color: COLORS.black}]}>
              {data?.berat_badan}
            </Text>
            <Text style={[FONTS.text12, {color: COLORS.gray, marginLeft: 4}]}>
              Kg
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[FONTS.textBold16, {color: COLORS.black}]}>
              {data?.tinggi_badan}
            </Text>
            <Text style={[FONTS.text12, {color: COLORS.gray, marginLeft: 4}]}>
              Cm
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[FONTS.text12, {color: COLORS.gray}]}>IMT</Text>
          <Text
            style={[FONTS.textBold16, {color: COLORS.black, marginLeft: 4}]}>
            {data?.imt_value.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: COLORS.separator,
    backgroundColor: '#FBFBFB',
    marginBottom: 8,
  },
  between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WeightItem;
