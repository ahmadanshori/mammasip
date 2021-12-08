import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DoctorHeader} from '../../components/Headers';
import {getRoomTypeByIdAPI} from '../../api/room';

const DoctorRooomScreen = ({route}) => {
  const {id} = route.params;
  const [doctorRoomData, setDoctorRoomData] = useState(null);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(id);
      console.log('res', res);
      setDoctorRoomData(res.data.data);
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <View>
      <DoctorHeader />
      <Text>aaaa</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DoctorRooomScreen;
