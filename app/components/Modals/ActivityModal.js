import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../constants';

const ActivityModal = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      <View style={styles.box}>
        <View style={styles.row}>
          <View style={styles.wrapper} />
          <View style={[styles.wrapper, {alignItems: 'center'}]}>
            <View style={styles.line} />
          </View>
          <TouchableOpacity style={[styles.wrapper, {alignItems: 'flex-end'}]}>
            <AntDesign name="close" size={25} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        <Text style={[FONTS.textBold14, {marginVertical: 24}]}>
          Tambah aktivitas hari ini
        </Text>
        <Text style={FONTS.textBold18}>Senin, 14 Juli 2021</Text>
        <View style={styles.justify}>
          <Text>Level Aktivitas</Text>
          <TouchableOpacity>
            <AntDesign name="questioncircle" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.blackShadow,
    justifyContent: 'flex-end',
  },
  box: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  justify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {width: '33%'},
  line: {height: 6, width: 60, borderRadius: 40, backgroundColor: COLORS.gray},
});

export default ActivityModal;
