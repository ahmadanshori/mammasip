import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {FONTS, COLORS, SIZES} from '../../constants';

const HomeModal = ({onPresBack, visible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPresBack}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onPresBack}>
        <TouchableOpacity style={styles.box} activeOpacity={1}>
          <View style={styles.top}>
            <View />
            <TouchableOpacity
              activeOpacity={SIZES.opacity}
              onPress={onPresBack}>
              <Icon name="close" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Image
              source={require('../../assets/icons/peopleCircle.png')}
              style={styles.img}
            />
            <View>
              <Text style={[FONTS.textBold18]}>Kenali Payudara</Text>
              <Text style={[FONTS.home, {color: COLORS.secondary}]}>
                Sayangi Dirimu
              </Text>
            </View>
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
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {height: SIZES.width3 - 16, width: SIZES.width3 - 16},
});

export default HomeModal;
