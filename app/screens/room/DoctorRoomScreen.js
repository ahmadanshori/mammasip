import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BackgroundHeader} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {Container} from '../../components/Container';
import {RoomItem} from '../../components/Items';
import ImportantMessage from '../../components/ImportantMessage';
import {getRoomTypeByIdAPI} from '../../api/room';
import {COLORS, FONTS} from '../../constants';

const DoctorRooomScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(id);
      setDoctorData(res.data.data);
    } catch (e) {
      // console.log('e', e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };
  const onRoom = useCallback(
    roomId => {
      navigation.navigate('Room', {id: roomId});
    },
    [navigation],
  );

  return (
    <Container>
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackgroundHeader
            title={doctorData?.nama_ruang}
            desc={doctorData?.description}
            source={{uri: doctorData?.url_picture_bg}}
          />
          <View style={styles.padding}>
            <TouchableNativeFeedback
              onPress={() => onRoom(doctorData.child_ruang[0].id_ruang)}>
              <View style={styles.message}>
                <View style={styles.flex}>
                  <View style={styles.row}>
                    <Icon name="message-text" size={25} color={COLORS.white} />
                    <Text style={[FONTS.textBold16, styles.messageText]}>
                      Pesan Pengingat
                    </Text>
                  </View>
                  <Text style={[FONTS.text12, {color: COLORS.white}]}>
                    Video senior akademisi mengenai mengemban amanah sebagai
                    orang berilmu (Prof. Dr. dr. H. Ari Fahrial Syam, SpPD-KGEH,
                    MMB, FINASIM, FACP dan Dr. dr. Sonar Soni Panigoro,
                    Sp.B.(K).Onk., M.Epid., MARS)
                  </Text>
                </View>
                <Icon name="play-circle" size={60} color={COLORS.white} />
              </View>
            </TouchableNativeFeedback>
            <ImportantMessage
              title={doctorData?.kata_pengantar}
              style={styles.mBottom}
            />
            {doctorData.child_ruang.map((item, index) => {
              if (index !== 0) {
                return (
                  <RoomItem
                    key={item.id_ruang}
                    title={item.nama_ruang}
                    onPress={() => onRoom(item.id_ruang)}
                  />
                );
              }
            })}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  padding: {padding: 16},
  mBottom: {marginBottom: 16},
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.darkBlue,
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  flex: {flex: 1},
  row: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
  messageText: {color: COLORS.white, marginLeft: 6},
});

export default DoctorRooomScreen;
