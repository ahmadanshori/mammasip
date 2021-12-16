import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import GallerySwiper from 'react-native-gallery-swiper';
import IconClose from 'react-native-vector-icons/AntDesign';
import {Container} from '../components/Container';
import {COLORS} from '../constants';

const PreviewImageScreen = ({navigation, route}) => {
  const {url} = route.params;
  return (
    <Container>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}>
        <IconClose name="close" color={COLORS.white} size={40} />
      </TouchableOpacity>
      <GallerySwiper images={[{uri: url}]} initialPage={1} />
    </Container>
  );
};

const styles = StyleSheet.create({
  safearea: {
    backgroundColor: COLORS.black,
  },
  button: {
    zIndex: 999,
    paddingTop: 40,
    paddingLeft: 20,
    marginTop: -40,
    marginLeft: -20,
    top: 20,
    left: 20,
    backgroundColor: COLORS.black,
  },
});

export default PreviewImageScreen;
