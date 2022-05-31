import React from 'react';
import {Text, TouchableOpacity, Modal, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS} from '../../constants';
import {MainButton} from '../Buttons';

const UpdateModal = ({onPress, visible, onClose}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.container} activeOpacity={1}>
        <TouchableOpacity style={styles.box} activeOpacity={1}>
          <View style={styles.wrapper}>
            <Text style={FONTS.textBold18}>Perlu Update Nih</Text>
            <TouchableOpacity style={styles.close} onPress={onClose}>
              <Icon name="close" size={25} color="red" />
            </TouchableOpacity>
          </View>

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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  close: {paddingLeft: 8},
  box: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  button: {marginTop: 16},
});

export default UpdateModal;
