import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../../constants';
import {MainButton} from '../Buttons';
import {CalculatorInput} from '../Inputs';
import formatDate from '../../libs/formatDate';

const WeightModal = ({onClose, onAddPress}) => {
  const [field, setField] = useState({tinggi_badan: '', berat_badan: ''});

  const handleInput = useCallback((type, value) => {
    setField(state => ({...state, [type]: value}));
  }, []);
  const handleButton = useCallback(() => {
    const {tinggi_badan, berat_badan} = field;
    if (berat_badan && tinggi_badan) {
      onAddPress(field);
    }
  }, [field, onAddPress]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onClose}>
      <TouchableOpacity style={styles.box} activeOpacity={1}>
        <View style={styles.row}>
          <View style={styles.wrapper} />
          <View style={[styles.wrapper, {alignItems: 'center'}]}>
            <View style={styles.line} />
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.wrapper, {alignItems: 'flex-end'}]}>
            <AntDesign name="close" size={25} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        <Text style={[FONTS.textBold14, {marginVertical: 24}]}>
          Tambah aktivitas hari ini
        </Text>
        <Text style={[FONTS.textBold18, {marginBottom: 24}]}>
          {formatDate(new Date(), 'EEEE, dd MMMM yyyy')}
        </Text>

        <CalculatorInput
          title="Tinggi Badan"
          type="Cm"
          placeholder="170"
          maxLength={4}
          keyboardType="numeric"
          onChangeText={val => handleInput('tinggi_badan', val)}
          value={field.tinggi_badan}
        />
        <CalculatorInput
          title="Berat Badan"
          type="Kg"
          placeholder="60"
          maxLength={4}
          keyboardType="numeric"
          onChangeText={val => handleInput('berat_badan', val)}
          value={field.berat_badan}
        />
        <MainButton
          title="Tambah"
          style={styles.addButton}
          disable={!field.tinggi_badan || !field.berat_badan}
          onPress={handleButton}
        />
      </TouchableOpacity>
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
  wrapper: {width: '33%'},
  line: {height: 6, width: 60, borderRadius: 40, backgroundColor: COLORS.gray},
  addButton: {marginTop: 16},
});

export default WeightModal;
