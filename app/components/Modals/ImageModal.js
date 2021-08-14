import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS, COLORS} from '../../constants';

const ImageModal = ({onPresBack, cameraPress, galeryPress, visible}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onPresBack}>
        <TouchableOpacity style={styles.box} activeOpacity={1}>
          <Text style={[FONTS.textBold16, styles.text]}>Pilih Dengan</Text>
          <View style={styles.wrapper}>
            <TouchableOpacity style={styles.button} onPress={cameraPress}>
              <Icon name="camera" size={40} color={COLORS.primary} />
              <Text style={[FONTS.textBold12, styles.text]}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={galeryPress}>
              <Icon name="images" size={40} color={COLORS.primary} />
              <Text style={[FONTS.textBold12, styles.text]}>Galeri</Text>
            </TouchableOpacity>
          </View>
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
  wrapper: {flexDirection: 'row', alignItems: 'center'},
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  ask: {marginTop: 8},
  text: {color: COLORS.black, textAlign: 'center'},
});

export default ImageModal;
