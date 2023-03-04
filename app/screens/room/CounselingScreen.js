import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Icon from 'react-native-vector-icons/AntDesign';
import {Container} from '../../components/Container';
import {BackgroundHeader} from '../../components/Headers';
import {LoadingComponent, ProgreesLoading} from '../../components/Loadings';
import {ArticleItem, VideoDetailItem} from '../../components/Items';
import ImportantMessage from '../../components/ImportantMessage';
import DownloadModal from '../../components/Modals/DownloadModal';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import {
  getCounselingByIdAPI,
  getCounselingVideoAPI,
} from '../../api/penyuluhan';
import {getRoomTypeByIdAPI} from '../../api/room';
import {COLORS, FONTS, SIZES} from '../../constants';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';

const CounselingScreen = ({navigation, route}) => {
  const {id} = route.params;
  const {token} = useContext(AppContext);
  const [roomData, setRoomData] = useState(null);
  const [browserData, setBrowserData] = useState([]);
  const [powerpointData, setPowerpointData] = useState([]);
  const [posterData, setPosterData] = useState([]);
  const [video, setVideo] = useState([]);
  const [isDownload, setIsDownload] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isProgress, setIsProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [finishProgress, setFinishProgress] = useState(null);
  const [loading, setLoading] = useState({get: true, refresh: false});
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(id, token);
      setRoomData(res.data.data);
      const resBrowser = await getCounselingByIdAPI(token, 1, 0, 2);
      const resPowerpoint = await getCounselingByIdAPI(token, 2, 0, 2);
      const resPoster = await getCounselingByIdAPI(token, 3, 0, 2);
      const resVideo = await getCounselingVideoAPI(token);
      setVideo(resVideo.data.data);
      setBrowserData(resBrowser.data.data.content);
      setPowerpointData(resPowerpoint.data.data.content);
      setPosterData(resPoster.data.data.content);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleDownload = useCallback((link, type, name) => {
    if (Platform.OS === 'ios') {
      let dirs = ReactNativeBlobUtil.fs.dirs;
      let extension;
      if (type === 'image/png') {
        extension = '.png';
      } else if (type === 'application/pdf') {
        extension = '.pdf';
      } else {
        extension = '.pptx';
      }
      ReactNativeBlobUtil.config({
        fileCache: true,
        notification: true,
        IOSDownloadTask: true,
        path: dirs.DocumentDir + `/${name.trim()}${extension}`,
      })
        .fetch('GET', link, {
          Accept: 'application/json',
        })
        .progress((received, total) => {
          if (!isProgress) {
            setIsProgress(true);
          }
          if (!finishProgress) {
            setFinishProgress(Number(total));
          }
          setProgress(Number(received));
        })
        .then(async res => {
          setIsProgress(false);
          ReactNativeBlobUtil.ios.previewDocument(res.path());
          setProgress(0);
        })
        .catch(e => {
          setProgress(0);
          setIsProgress(false);
        });
    } else {
      ReactNativeBlobUtil.config({
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mime: type,
          description: 'Downloading...',
        },
      })
        .fetch('GET', link, {
          Accept: 'application/json',
        })
        .then(res => {})
        .then(data => {})
        .catch(e => {});
    }
  }, []);

  const handleMedia = val => {
    setSelected(val);
    setIsDownload(true);
  };

  const onDownload = useCallback(() => {
    setIsDownload(false);
    if (selected.typeFile === 1) {
      handleDownload(selected.url, 'image/png', selected?.title);
    } else if (selected.typeFile === 3) {
      handleDownload(selected.url, 'application/pdf', selected?.title);
    } else if (selected.typeFile === 4) {
      handleDownload(
        selected.url,
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        selected?.title,
      );
    } else {
      return null;
    }
  }, [selected, handleDownload]);

  const onSeeAll = counselingId => {
    navigation.navigate('CounselingList', {
      counselingId,
      title: roomData?.nama_ruang,
    });
  };

  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
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
          <BackgroundHeader
            title={roomData?.nama_ruang}
            desc={roomData?.description}
            source={{uri: roomData?.url_picture_bg}}
          />
          <View style={styles.margin}>
            <ImportantMessage title={roomData?.kata_pengantar} />
            <View style={styles.body}>
              <TouchableOpacity
                style={styles.header}
                onPress={() => onSeeAll(1)}
                activeOpacity={1}>
                <Text style={FONTS.textBold14}>Flyer</Text>
                <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              <View style={styles.row}>
                {browserData.map(item => (
                  <ArticleItem
                    key={item.idPenyuluhan}
                    title={item.tittle}
                    source={item.urlBanner}
                    date={item.createdDate}
                    onPress={() =>
                      handleMedia({...item.media[0], title: item.tittle})
                    }
                  />
                ))}
                <TouchableOpacity
                  style={styles.seeAll}
                  activeOpacity={SIZES.opacity}
                  onPress={() => onSeeAll(1)}>
                  <Icon name="rightcircle" size={26} color={COLORS.primary} />
                  <Text
                    style={[
                      FONTS.textBold10,
                      {color: COLORS.primary, marginTop: 8},
                    ]}>
                    Lihat Semua
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.header}
                onPress={() => onSeeAll(2)}
                activeOpacity={1}>
                <Text style={FONTS.textBold14}>Powerpoint</Text>
                <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              <View style={styles.row}>
                {powerpointData.map(item => (
                  <ArticleItem
                    key={item.idPenyuluhan}
                    title={item.tittle}
                    // category={item.hastag[0].nameCategory}
                    source={item.urlBanner}
                    date={item.createdDate}
                    onPress={() =>
                      handleMedia({...item.media[0], title: item.tittle})
                    }
                  />
                ))}
                <TouchableOpacity
                  style={styles.seeAll}
                  activeOpacity={SIZES.opacity}
                  onPress={() => onSeeAll(2)}>
                  <Icon name="rightcircle" size={26} color={COLORS.primary} />
                  <Text
                    style={[
                      FONTS.textBold10,
                      {color: COLORS.primary, marginTop: 8},
                    ]}>
                    Lihat Semua
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.header}
                onPress={() => onSeeAll(3)}
                activeOpacity={1}>
                <Text style={FONTS.textBold14}>Poster</Text>
                <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              <View style={styles.row}>
                {posterData.map(item => (
                  <ArticleItem
                    key={item.idPenyuluhan}
                    title={item.tittle}
                    category={item.hastag[0].nameCategory}
                    source={item.urlBanner}
                    date={item.createdDate}
                    onPress={() =>
                      handleMedia({...item.media[0], title: item.tittle})
                    }
                  />
                ))}
                <TouchableOpacity
                  style={styles.seeAll}
                  activeOpacity={SIZES.opacity}
                  onPress={() => onSeeAll(3)}>
                  <Icon name="rightcircle" size={26} color={COLORS.primary} />
                  <Text
                    style={[
                      FONTS.textBold10,
                      {color: COLORS.primary, marginTop: 8},
                    ]}>
                    Lihat Semua
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.video}>
              <Text style={styles.videoTitle}>Video Penyuluhan</Text>
              {video.map(item => (
                <VideoDetailItem
                  key={item.idMedia}
                  data={item}
                  onPress={() =>
                    navigation.navigate('Video', {url: item.url_frame})
                  }
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
      {isDownload && (
        <DownloadModal
          onClose={() => setIsDownload(false)}
          onDownload={onDownload}
        />
      )}
      {isProgress ? (
        <ProgreesLoading progress={progress} finishProgress={finishProgress} />
      ) : null}

      {error.noInternet ? <ErrorNetwork onPress={handleRefresh} /> : null}
      {error.error ? <ErrorServer onPress={handleRefresh} /> : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  margin: {padding: 16},
  body: {marginTop: 24},
  seeAll: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 6,
    flex: 1,
    height: SIZES.width3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {flexDirection: 'row'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  video: {marginVertical: 16},
  videoTitle: {...FONTS.textBold14, marginBottom: 16},
});

export default CounselingScreen;
