import React, {useState, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {TitleInput} from '../../components/Inputs';
import {ImageModal} from '../../components/Modals';
import {MainButton, TitleButton} from '../../components/Buttons';
import PhotoProfile from '../../components/PhotoProfile';
import {ActivityLevelButton} from '../../components/RadioButton';
// import {Gender} from '../../components/RadioButton';
import {COLORS, FONTS, SIZES} from '../../constants';
import {AppContext} from '../../index';
import formatDate from '../../libs/formatDate';

const options = {
  width: SIZES.width,
  height: SIZES.width,
  cropping: true,
  mediaType: 'photo',
  compressImageQuality: 0.8,
};

const EditProfileScreen = ({navigation}) => {
  const {user} = useContext(AppContext);
  const [field, setField] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    tgl_lahir: '',
    phone: user?.phone,
    gender: user?.gender,
  });
  const [isDate, setIsDate] = useState(false);
  const [error, setError] = useState(null);
  const [isPicture, setIsPicture] = useState(false);
  const [picture, setPicture] = useState(null);

  console.log(`user`, user);
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
      //     first_name: `mammasip${Math.floor(Math.random() * 1000001)}`,
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
      //     first_name: `bnb${Math.floor(Math.random() * 1000001)}`,
      //   };
      setPicture(res);
    } catch (err) {}
  };
  const handleOpenPhoto = () => setIsPicture(true);

  const onChange = (event, selectedDate) => {
    setIsDate(false);
    console.log(`selectedDate`, selectedDate);
    setField(state => ({...state, tgl_lahir: selectedDate}));
  };
  return (
    <Container>
      <HeaderTitle back title="Edit data diri" />
      <ScrollView
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}>
        <PhotoProfile source={picture} onPress={handleOpenPhoto} />
        <TitleInput
          title="Nama Lengkap"
          placeholder="Syifa"
          onChangeText={val => handleInput(val, 'first_name')}
          value={field.first_name}
          maxLength={50}
        />
        <TitleInput
          title="Nama Lengkap"
          placeholder="Hadju"
          onChangeText={val => handleInput(val, 'last_name')}
          style={styles.pass}
          value={field.last_name}
          maxLength={50}
        />
        <TitleButton
          title="Tanggal Lahir"
          placeholder="30 November 2000"
          data={field?.tgl_lahir ? formatDate(field?.tgl_lahir) : null}
          onPress={() => setIsDate(true)}
        />
        {/* <Gender /> */}
        <TitleInput
          title="Email"
          placeholder="mammasip@gmail.com"
          keyboardType="email-address"
          style={styles.pass}
          onChangeText={val => handleInput(val, 'email')}
          value={field.email}
        />
        <ActivityLevelButton
          title="Jenis Kelamin"
          onPress={val => handleInput(val, 'gender')}
          radio1="Laki-laki"
          radio2="Perempuan"
          value1={1}
          value2={2}
          selected={field.gender}
          style={styles.pass}
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
          disable={
            !field.email ||
            !field.phone ||
            !field.first_name ||
            !field.last_name ||
            !field.tgl_lahir
          }
          onPress={handleEditProfile}
        />
      </View>
      <ImageModal
        visible={isPicture}
        cameraPress={pictureWithCamera}
        galeryPress={pictureWithGalery}
        onPresBack={() => setIsPicture(false)}
      />

      {isDate ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={field?.tgl_lahir || new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      ) : null}
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
