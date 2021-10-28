import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';

import {loginAPI} from '../../api/auth';
import {COLORS, FONTS, SIZES} from '../../constants';
import {AppContext} from '../../index';

const OtpScreen = ({navigation, route}) => {
  const {setLoading, setUser, setToken} = useContext(AppContext);
  //   const {nav} = route.params;
  const [otp, setOtp] = useState('');

  return (
    <Container>
      <HeaderTitle back title="OTP" />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default OtpScreen;
