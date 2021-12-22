import React, {useState, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {TitleInput} from '../../components/Inputs';
import {ImageModal} from '../../components/Modals';
import {MainButton, TitleButton} from '../../components/Buttons';
import PhotoProfile from '../../components/PhotoProfile';
import {ActivityLevelButton} from '../../components/RadioButton';
import {dropdownalert} from '../../components/AlertProvider';
// import {Gender} from '../../components/RadioButton';
import {COLORS, FONTS, SIZES} from '../../constants';
import {uploaddFileAPI, updateUserAPI} from '../../api/auth';
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
  const {user, token, setLoading, setUser} = useContext(AppContext);
  const [field, setField] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    tgl_lahir: new Date(user?.tgl_lahir),
    phone: user?.phone,
    gender: user?.gender,
  });
  const [isDate, setIsDate] = useState(false);
  const [error, setError] = useState(null);
  const [isPicture, setIsPicture] = useState(false);
  const [picture, setPicture] = useState(user?.image_path || null);
  const [isLocal, setIsLocal] = useState(false);

  const handleInput = useCallback((val, type) => {
    setField(state => ({...state, [type]: val}));
  }, []);

  const handleEditProfile = useCallback(async () => {
    Keyboard.dismiss();
    setError(null);
    setLoading(true);
    try {
      if (isLocal) {
        const formData = new FormData();
        formData.append('type', 'profile');
        formData.append('file', {
          uri: picture.path,
          type: picture.mime,
          name: `mammasip${Math.floor(Math.random() * 1000001)}`,
        });
        const resUpload = await uploaddFileAPI(token, formData);
        const newData = {...field, image_path: resUpload.data.message};
        const resUpdate = await updateUserAPI(token, user?.id_user, newData);
        setUser(resUpdate.data.data);
        await AsyncStorage.setItem('user', JSON.stringify(resUpdate.data.data));
      } else {
        const resUpdate = await updateUserAPI(token, user?.id_user, field);
        setUser(resUpdate.data.data);
        await AsyncStorage.setItem('user', JSON.stringify(resUpdate.data.data));
      }
      dropdownalert.alertWithType(
        'success',
        '',
        'Berhasil merubah data diri..',
      );
    } catch (e) {
      // setError(e);
    } finally {
      setLoading(false);
    }
  }, [token, isLocal, picture, field, user.id_user, setLoading, setUser]);

  const pictureWithCamera = useCallback(async () => {
    setIsPicture(false);
    try {
      const res = await ImagePicker.openCamera(options);
      setIsLocal(true);
      setPicture(res);
    } catch (err) {
      //   setError(err);
    }
  }, []);

  const pictureWithGalery = useCallback(async () => {
    setIsPicture(false);
    try {
      const res = await ImagePicker.openPicker(options);
      setIsLocal(true);
      setPicture(res);
    } catch (err) {}
  }, []);
  const handleOpenPhoto = () => setIsPicture(true);

  const onChange = (event, selectedDate) => {
    setIsDate(false);
    setField(state => ({...state, tgl_lahir: selectedDate}));
  };

  return (
    <Container>
      <HeaderTitle back title="Edit data diri" />
      <ScrollView
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}>
        <PhotoProfile
          source={picture}
          onPress={handleOpenPhoto}
          isLocal={isLocal}
        />
        <TitleInput
          title="Nama Depan"
          placeholder="Syifa"
          onChangeText={val => handleInput(val, 'first_name')}
          value={field.first_name}
          maxLength={50}
        />
        <TitleInput
          title="Nama Belakang"
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
            !field.phone ||
            !field.first_name ||
            !field.last_name ||
            !field.tgl_lahir ||
            !field.gender
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
