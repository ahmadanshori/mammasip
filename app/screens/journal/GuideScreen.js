import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import Divider from '../../components/Divider';
import {JournalItem} from '../../components/Items';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import {COLORS, FONTS, ICON, SIZES} from '../../constants';
import {getJournalGuideAPI, getCheckJournalGuideAPI} from '../../api/journal';
import {getVideoSkriningAPI} from '../../api/room';

import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';
import {MainButton, AskButton} from '../../components/Buttons';
import formatDate from '../../libs/formatDate';

const GuideScreen = ({navigation}) => {
  const {token, user} = useContext(AppContext);
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [video, setVideo] = useState(null);
  const [isJournal, setIsJournal] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    isFocused && getInitialData();
  }, [isFocused]);

  const getInitialData = useCallback(async () => {
    try {
      const resCheckJournal = await getCheckJournalGuideAPI(
        token,
        user.id_user,
      );
      setIsJournal(resCheckJournal.data.data.length ? true : false);
      const resVideo = await getVideoSkriningAPI();
      setVideo(resVideo.data.data);
      const resGuid = await getJournalGuideAPI(token, user.id_user);
      setData(resGuid.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoad(false);
    }
  }, [token, user.id_user, setError]);

  const handleRefresh = () => {
    setError();
    setIsLoad(true);
    getInitialData();
  };

  return (
    <Container>
      <HeaderTitle title="Jurnal Panduan Skrining" />
      {isLoad ? (
        <LoadingComponent />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            {video?.url_frame ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('Video', {url: video.url_frame})
                }>
                <Image source={{uri: video.url}} style={styles.imgVideo} />
                <View style={styles.shadowImg}>
                  <View style={styles.circleIcon}>
                    <Ionicons
                      name="play-circle"
                      size={40}
                      color={COLORS.white}
                      style={styles.circle}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.notfoundImg}>
                <Ionicons name="image-outline" size={30} color={COLORS.gray} />
              </View>
            )}
            {isJournal ? (
              <View style={{...styles.header, backgroundColor: '#ECFFEE'}}>
                <ICON.panduan2 height={80} width={80} />
                <View style={{flex: 1, marginLeft: 16}}>
                  <Text style={FONTS.textBold14}>
                    Anda sudah mengisi jurnal panduan skrining bulan ini!
                  </Text>
                  <Text style={{...FONTS.text12, marginTop: 8}}>
                    Pastikan anda rutin melakukan SADARI ya Sahabat MammaSIP!
                  </Text>
                </View>
              </View>
            ) : (
              <>
                <View style={{...styles.header, backgroundColor: '#FFECEC'}}>
                  <ICON.panduan height={80} width={80} />
                  <View style={{flex: 1, marginLeft: 16}}>
                    <Text style={FONTS.textBold14}>
                      Anda belum mengisi jurnal panduan SADARI bulan ini!
                    </Text>
                    <Text style={{...FONTS.text12, marginTop: 8}}>
                      Silahkan isi jurnal panduan SADARI secara rutin untuk
                      memantau kesehatan anda.
                    </Text>
                  </View>
                </View>
                <MainButton
                  title={'Tulis Jurnal Sekarang'}
                  right
                  style={styles.mt}
                  onPress={() => navigation.navigate('GuideQuestion')}
                />
              </>
            )}
          </View>
          <Divider />
          <View style={styles.wrapper}>
            <View style={styles.between}>
              <View style={styles.row}>
                <Icon size={20} name="history" style={{marginRight: 8}} />
                <Text style={FONTS.textBold14}>Riwayat Jurnal</Text>
              </View>
              {/* FILTER BY YEAR */}
              {/* <View style={styles.year}>
                <Text style={FONTS.text14}>2022</Text>
                <Icon name="chevron-down" size={25} />
              </View> */}
            </View>
            {data.length ? (
              <>
                {data.map(item => (
                  <JournalItem
                    key={item.id_jurnal_sadari.toString()}
                    data={item}
                    onPress={() =>
                      navigation.navigate('GuideDetail', {
                        id: item.id_jurnal_sadari,
                        month: formatDate(item.created_date, 'MMMM'),
                      })
                    }
                  />
                ))}
              </>
            ) : (
              <View style={styles.noData}>
                <Text style={{...FONTS.text18, color: COLORS.gray}}>
                  Belum ada jurnal
                </Text>
              </View>
            )}
          </View>
          <Divider />
          <View style={styles.wrapper}>
            <View style={styles.footer}>
              <Text
                style={[
                  FONTS.textBold16,
                  {textAlign: 'center', marginBottom: 16},
                ]}>
                Butuh informasi lainnya?
              </Text>
              <AskButton onPress={() => navigation.navigate('Faq')} />
            </View>
          </View>
        </ScrollView>
      )}

      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 16, paddingVertical: 24},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 8,
  },
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  year: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    borderColor: '#E0E0E0',
  },
  noData: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mt: {marginTop: 24},
  imgVideo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width2,
    width: '100%',
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    marginBottom: 16,
  },
  shadowImg: {
    height: SIZES.width2,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 99,
  },
  notfoundImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.width5 - 8,
    width: SIZES.width5 - 8,
    borderRadius: 8,
    backgroundColor: COLORS.separator,
  },
  circleIcon: {
    backgroundColor: COLORS.background,
    borderRadius: 50,
    height: 47,
    width: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {marginLeft: 2},
});
export default GuideScreen;
