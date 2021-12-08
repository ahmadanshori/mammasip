import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BackgroundHeader} from '../../components/Headers';
import {getRoomTypeByIdAPI} from '../../api/room';

const KnowYourSelfScreen = ({route}) => {
  const {id} = route.params;

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(id);
      console.log('res', res);
      //   setDoctorRoomData(res.data.data);
    } catch (e) {
      console.log('e', e);
    }
  };
  return (
    <View>
      <BackgroundHeader title="aaaaa" />
      <Text>KnowYourSelfScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default KnowYourSelfScreen;
