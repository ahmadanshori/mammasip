import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import formatDate from '../../libs/formatDate';

const SportItem = ({data}) => {
  const validationActivity = useMemo(() => {
    if (data?.level_olahraga === 1) {
      return 'Olahraga Sedang';
    } else {
      return 'Olahraga Berat';
    }
  }, [data.level_olahraga]);
  return (
    <View style={styles.container}>
      <View>
        <Text style={[FONTS.text12, {color: COLORS.gray}]}>
          {formatDate(data.created_date, 'dd MMMM yyyy HH:mm')}
        </Text>
        <Text style={[FONTS.text14, {color: COLORS.secondary}]}>
          {validationActivity}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[FONTS.textBold16, {color: COLORS.black}]}>
          {data?.lama_berolahraga}
        </Text>
        <Text style={[FONTS.text12, {color: COLORS.gray, marginLeft: 4}]}>
          Menit
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: COLORS.separator,
    backgroundColor: '#FBFBFB',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SportItem;
