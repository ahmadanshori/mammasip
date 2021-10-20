import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Container} from '../../components/Container';

import {loginAPI} from '../../api/auth';
import {COLORS, FONTS, SIZES} from '../../constants';
import {AppContext} from '../../index';

const LoginScreen = ({navigation, route}) => {
  const {setLoading, setUser, setToken} = useContext(AppContext);
  //   const {nav} = route.params;
  const [field, setField] = useState({
    username: 'hanifalbaaits@gmail.com',
    password: '12345',
    device: 'mobile',
    ip_address: '-',
  });

  return (
    <Container>
      <Text>aaaa</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
