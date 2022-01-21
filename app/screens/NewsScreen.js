import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Linking,
  RefreshControl,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Container} from '../components/Container';
import {NoInternet, ErrorServer} from '../components/Errors';
import useErrorHandler from '../hooks/useErrorHandler';
import {AppContext} from '../index';
import {COLORS, FONTS, SIZES} from '../constants';
import {getNewsDetailAPI} from '../api/faq';
import formatDate from '../libs/formatDate';
import {LoadingComponent} from '../components/Loadings';

const NewsScreen = ({route, navigation}) => {
  const {id} = route.params;
  const {token} = useContext(AppContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitalData();
  }, []);

  const getInitalData = async () => {
    try {
      const res = await getNewsDetailAPI(token, id);
      setData(res.data.data[0]);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const linkHandler = useCallback(async () => {
    await Linking.openURL(data?.linkPendaftaran);
  }, [data?.linkPendaftaran]);

  const handleRefresh = () => {
    setError();
    setLoading({get: false, refresh: true});
    getInitalData();
  };

  return (
    <Container>
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
          }>
          <View>
            <Image
              source={{uri: data?.urlPicture}}
              style={styles.backgroundImage}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.goBack();
              }}
              activeOpacity={SIZES.opacity}>
              <Icon
                name={Platform.OS === 'ios' ? 'left' : 'arrowleft'}
                size={18}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{data?.namaBerita}</Text>
            <View style={styles.wrapper}>
              <Text style={styles.date}>
                Diposting pada{' '}
                {formatDate(data?.createdDate, 'eeee, dd MMMM yyyy HH:mm')}
              </Text>
            </View>

            <Text style={styles.desc}>{data?.description}</Text>
          </View>
        </ScrollView>
      )}
      {error.noInternet ? <NoInternet onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  body: {padding: 16},
  backgroundImage: {width: '100%', height: SIZES.width1},
  button: {
    position: 'absolute',
    padding: 16,
    top: 0,
    left: 0,
  },
  title: {...FONTS.textBold18},
  wrapper: {
    marginVertical: 20,
  },

  date: {
    ...FONTS.textBold12,
    color: COLORS.primary,
  },
  desc: {...FONTS.text14, color: COLORS.black},
});
export default NewsScreen;
