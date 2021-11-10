import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {MainButton, OutlineButton} from '../Buttons';
import {COLORS} from '../../constants';

const DownloadModal = ({onClose, onDownload}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onClose}>
      <TouchableOpacity style={styles.box} activeOpacity={1}>
        <MainButton title="Download" onPress={onDownload} />
        <OutlineButton
          title="Kembali"
          style={styles.margin}
          onPress={onClose}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  box: {
    padding: 24,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
  },
  margin: {marginTop: 24},
});

export default DownloadModal;
