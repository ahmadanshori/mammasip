import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {VideoDetailItem} from '../components/Items';
import {ErrorNetwork, ErrorServer} from '../components/Errors';
import {LoadingComponent} from '../components/Loadings';
import {getVideoAPI} from '../api/room';
import useErrorHandler from '../hooks/useErrorHandler';
import {COLORS, FONTS} from '../constants';
import {AppContext} from '../index';

const VideoDetailScreen = ({navigation}) => {
  const {token} = useContext(AppContext);
  const [video1, setVideo1] = useState([]);
  const [video2, setVideo2] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();
  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const resVideo1 = await getVideoAPI(token, 1);
      const resVideo2 = await getVideoAPI(token, 2);
      setVideo1(resVideo1.data.data.media.slice(0, 4));
      setVideo2(resVideo2.data.data.media.slice(0, 4));
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const onSeeAll = useCallback(
    val => {
      if (token) {
        navigation.navigate('ListVideo', {id: val});
      } else {
        navigation.navigate('Login', {nav: 'VidioDetail'});
      }
    },
    [token, navigation],
  );
  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };
  return (
    <Container>
      <HeaderTitle title="Video Olahraga" />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={handleRefresh}
              refreshing={loading.refresh}
            />
          }
          contentContainerStyle={styles.scroll}>
          <View style={styles.justify}>
            <View style={styles.video}>
              <Ionicons
                name="time-outline"
                size={18}
                color={COLORS.secondary}
              />
              <Text
                style={[
                  FONTS.textBold12,
                  {color: COLORS.secondary, marginLeft: 6},
                ]}>
                Durasi 10 - 20 Menit
              </Text>
            </View>
            <TouchableOpacity
              style={styles.seeAll}
              activeOpacity={1}
              onPress={() => onSeeAll(1)}>
              <Text
                style={[
                  FONTS.text12,
                  {color: COLORS.secondary, marginLeft: 6},
                ]}>
                Lihat Semuanya
              </Text>
            </TouchableOpacity>
          </View>
          {video1.map(item => (
            <VideoDetailItem
              key={item.idMedia}
              data={item}
              onPress={() =>
                navigation.navigate('Video', {url: item.url_frame})
              }
            />
          ))}
          <View style={styles.justify}>
            <View style={styles.video}>
              <Ionicons
                name="time-outline"
                size={18}
                color={COLORS.secondary}
              />
              <Text style={[FONTS.textBold12, styles.title]}>
                Durasi 30 - 40 Menit
              </Text>
            </View>
            <TouchableOpacity
              style={styles.seeAll}
              activeOpacity={1}
              onPress={() => onSeeAll(2)}>
              <Text
                style={[
                  FONTS.text12,
                  {color: COLORS.secondary, marginLeft: 6},
                ]}>
                Lihat Semuanya
              </Text>
            </TouchableOpacity>
          </View>
          {video2.map(item => (
            <VideoDetailItem
              key={item.idMedia}
              data={item}
              onPress={() =>
                navigation.navigate('Video', {url: item.url_frame})
              }
            />
          ))}
        </ScrollView>
      )}
      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  scroll: {padding: 16},
  justify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.separator,
    marginBottom: 16,
  },
  video: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {color: COLORS.secondary, marginLeft: 6},
  seeAll: {
    paddingVertical: 8,
    paddingLeft: 8,
  },
});

export default VideoDetailScreen;
