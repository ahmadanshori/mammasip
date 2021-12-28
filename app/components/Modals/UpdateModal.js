import React from 'react';
import {Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {MainButton} from '../Buttons';

const UpdateModal = ({onPress, visible}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={styles.container} activeOpacity={1}>
        <TouchableOpacity style={styles.box} activeOpacity={1}>
          <Text style={FONTS.textBold18}>Perlu Update Nih</Text>
          <Text style={[FONTS.text14, {marginTop: 16}]}>
            Aplikasi MammaSIP kamu udah harus diupdate untuk bisa terus dipakai.
            Banyak fitur menarik di versi terbarunya loh!
          </Text>
          <MainButton
            title="Yuk, update sekarang!"
            style={styles.button}
            onPress={onPress}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blackShadow,
    paddingHorizontal: 16,
  },
  box: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  button: {marginTop: 16},
});

export default UpdateModal;
