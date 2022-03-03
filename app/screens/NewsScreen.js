import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  // Linking,
  RefreshControl,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
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
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitalData();
  }, []);

  const getInitalData = async () => {
    try {
      const res = await getNewsDetailAPI(token, id);
      setData(res.data.data[0]);
      if (res.data.data[0].media?.length) {
        setSelected(res.data.data[0].media[0]);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const onSelectedImg = val => {
    setSelected(val);
  };

  // const linkHandler = useCallback(async () => {
  //   await Linking.openURL(data?.linkPendaftaran);
  // }, [data?.linkPendaftaran]);

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
            <View style={styles.backgroundImage}>
              {selected?.typeFile === 2 ? (
                <WebView
                  source={{uri: selected?.url_frame}}
                  mediaPlaybackRequiresUserAction={false}
                  automaticallyAdjustContentInsets={false}
                  scrollEnabled={false}
                  allowsFullscreenVideo={true}
                  userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                />
              ) : (
                <Image
                  source={{
                    uri: data.media?.length
                      ? selected?.url
                      : selected?.urlPicture,
                  }}
                  style={styles.media}
                />
              )}
            </View>
            {data.media?.length ? (
              <ScrollView
                horizontal
                contentContainerStyle={styles.mediaWrapper}
                showsHorizontalScrollIndicator={false}>
                {data.media.map(item => (
                  <TouchableOpacity
                    style={styles.mediaBox}
                    key={item.urutan}
                    onPress={() => onSelectedImg(item)}
                    activeOpacity={SIZES.opacity}>
                    <Image
                      source={{uri: data?.urlPicture}}
                      style={styles.media}
                    />
                    <View
                      style={{
                        ...styles.video,
                        backgroundColor:
                          item.typeFile === selected.typeFile
                            ? COLORS.shadowWhite
                            : 'transparent',
                      }}>
                      {item.typeFile === 2 ? (
                        <Icon name={'play'} size={24} color={COLORS.white} />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : null}
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
  mediaWrapper: {marginTop: 16, paddingLeft: 16},
  mediaBox: {
    width: SIZES.width4 + 8,
    height: SIZES.width5,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
  },
  media: {width: '100%', height: '100%'},
  video: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
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
