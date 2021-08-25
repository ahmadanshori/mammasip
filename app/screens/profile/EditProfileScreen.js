import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {TitleInput} from '../../components/Inputs';
import {ImageModal} from '../../components/Modals';
import {MainButton, TitleButton} from '../../components/Buttons';
import PhotoProfile from '../../components/PhotoProfile';
import {Gender} from '../../components/RadioButton';
import {COLORS, FONTS, SIZES} from '../../constants';

const options = {
  width: SIZES.width,
  height: SIZES.width,
  cropping: true,
  mediaType: 'photo',
  compressImageQuality: 0.8,
};

const EditProfileScreen = ({navigation}) => {
  const [field, setField] = useState({
    name: '',
    email: '',
    date: '',
    phone: '',
    gender: '',
  });
  const [error, setError] = useState(null);
  const [isPicture, setIsPicture] = useState(false);
  const [picture, setPicture] = useState(null);

  const handleInput = useCallback((val, type) => {
    setField(state => ({...state, [type]: val}));
  }, []);

  const handleEditProfile = useCallback(() => {
    setError(null);
  }, []);

  const pictureWithCamera = async () => {
    setIsPicture(false);
    try {
      const res = await ImagePicker.openCamera(options);
      setPicture(res);
      //   const newData = {
      //     uri: res.path,
      //     type: res.mime,
      //     name: `mammasip${Math.floor(Math.random() * 1000001)}`,
      //   };
    } catch (err) {
      //   setError(err);
    }
  };

  const pictureWithGalery = async () => {
    setIsPicture(false);
    try {
      const res = await ImagePicker.openPicker(options);
      //   const newData = {
      //     uri: res.path,
      //     type: res.mime,
      //     name: `bnb${Math.floor(Math.random() * 1000001)}`,
      //   };
      setPicture(res);
    } catch (err) {}
  };
  const handleOpenPhoto = () => setIsPicture(true);

  return (
    <Container>
      <HeaderTitle
        back
        title="Edit data diri"
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <PhotoProfile source={picture} onPress={handleOpenPhoto} />
        <TitleInput
          title="Nama Lengkap"
          placeholder="Syifa Hadju"
          onChangeText={val => handleInput(val, 'name')}
          value={field.name}
          maxLength={50}
        />
        <TitleButton title="Tanggal Lahir" placeholder="30 November 2000" />
        <Gender />
        <TitleInput
          title="Email"
          placeholder="mammasip@gmail.com"
          keyboardType="email-address"
          style={styles.pass}
          onChangeText={val => handleInput(val, 'email')}
          value={field.email}
        />
        <TitleInput
          title="No Handphone"
          placeholder="08123456789"
          keyboardType="numeric"
          style={styles.pass}
          onChangeText={val => handleInput(val, 'phone')}
          value={field.phone}
          maxLength={16}
        />
        {error ? (
          <View style={styles.error}>
            <Icon name="alert-circle" style={styles.errorIcon} size={16} />
            <Text style={[FONTS.text10, styles.errorIcon]}>{error}</Text>
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.wrapper}>
        <MainButton
          title="Simpan"
          disable={!field.email || !field.phone || !field.name || !field.date}
          onPress={handleEditProfile}
        />
      </View>
      <ImageModal
        visible={isPicture}
        cameraPress={pictureWithCamera}
        galeryPress={pictureWithGalery}
        onPresBack={() => setIsPicture(false)}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {padding: 16},
  secondary: {color: COLORS.black},
  pass: {marginTop: 16},
  error: {flexDirection: 'row', marginTop: 6},
  errorIcon: {color: COLORS.red},
});

export default EditProfileScreen;
