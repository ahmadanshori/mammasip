import React, {useState, useContext, useCallback} from 'react';
import {View, ScrollView, StyleSheet, Keyboard} from 'react-native';

import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';

import {forgotPassowrdAPI} from '../../api/auth';
import {AppContext} from '../../index';
import {TitleInput} from '../../components/Inputs';
import {MainButton} from '../../components/Buttons';
import {dropdownalert} from '../../components/AlertProvider';

const ForgotPasswordScreen = ({navigation}) => {
  const {setLoading} = useContext(AppContext);
  const [email, setEmail] = useState('');

  const onChangeText = async event => {
    setEmail(event);
  };

  const handleForgotPassword = useCallback(async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const res = await forgotPassowrdAPI(email);
      setEmail('');
      dropdownalert.alertWithType('success', '', res.data.message);
      navigation.goBack();
    } catch (e) {
      dropdownalert.alertWithType('error', '', e.data.message);
    } finally {
      setLoading(false);
    }
  }, [email, setLoading, navigation]);

  return (
    <Container>
      <HeaderTitle back title="Ubah Kata Sandi" />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <TitleInput
          title={'Email'}
          placeholder={'your@mail.com'}
          value={email}
          onChangeText={onChangeText}
          onSubmitEditing={handleForgotPassword}
        />
      </ScrollView>
      <View style={styles.wrapper}>
        <MainButton title="Ubah" onPress={handleForgotPassword} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {padding: 16},
});

export default ForgotPasswordScreen;
