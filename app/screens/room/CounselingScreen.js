import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {Container} from '../../components/Container';
import {BackgroundHeader} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {ArticleDetailItem, ArticleItem} from '../../components/Items';
import ImportantMessage from '../../components/ImportantMessage';
import {getCounselingByIdAPI} from '../../api/penyuluhan';
import {getRoomTypeByIdAPI} from '../../api/room';
import {COLORS, FONTS} from '../../constants';
import DownloadModal from '../../components/Modals/DownloadModal';

const CounselingScreen = ({navigation, route}) => {
  const {id} = route.params;
  const [roomData, setRoomData] = useState(null);
  const [browserData, setBrowserData] = useState([]);
  const [powerpointData, setPowerpointData] = useState([]);
  const [posterData, setPosterData] = useState([]);
  const [isDownload, setIsDownload] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getRoomTypeByIdAPI(id);

      setRoomData(res.data.data);
      const resBrowser = await getCounselingByIdAPI(1);
      const resPowerpoint = await getCounselingByIdAPI(2);
      const resPoster = await getCounselingByIdAPI(3);
      setBrowserData(resBrowser.data.data.content);
      setPowerpointData(resPowerpoint.data.data.content);
      setPosterData(resPoster.data.data.content);
    } catch (e) {
      //   console.log('e', e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleDownload = useCallback((link, type) => {
    // setLoading({get: true, refresh: false});
    ReactNativeBlobUtil.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: type,
        description: 'File downloaded by download manager.',
      },
    })
      .fetch('GET', link, {
        Accept: 'application/json',
      })
      .then(res => {
        // setLoading({get: false, refresh: false});
      })
      .then(data => {
        // setLoading({get: false, refresh: false});
      })
      .catch(e => {
        // setLoading({get: false, refresh: false});
      });
  }, []);

  const handleMedia = val => {
    if (val.typeFile === 2) {
      navigation.navigate('Video', {url: val.url_frame});
    } else if (val.typeFile === 3) {
      navigation.navigate('Pdf', {
        link: val.url,
      });
    } else {
      setSelected(val);
      setIsDownload(true);
    }
    //   type_file
    //  1 foto, 2 video, 3 pdf, 4 pptx
    // 1,2,3 bisa di view baru download, 4 langsung download
  };
  const onDownload = useCallback(() => {
    setIsDownload(false);
    if (selected.typeFile === 1) {
      handleDownload(selected.url, 'image/png');
    } else if (selected.typeFile === 4) {
      handleDownload(
        selected.url,
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
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

  //   const handleRefresh = () => {
  //     setLoading(true);
  //     handleCustomerSearch(search);
  //   };

  return (
    <Container>
      {/* <HeaderTitle back title="Ruang Penyuluhan" /> */}
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackgroundHeader
            title={roomData?.nama_ruang}
            desc={roomData?.description}
            source={{uri: roomData?.url_picture_bg}}
            white
          />
          <View style={styles.margin}>
            <ImportantMessage title={roomData?.kata_pengantar} />
            <View style={styles.body}>
              <TouchableOpacity
                style={styles.header}
                onPress={() => onSeeAll(1)}
                activeOpacity={1}>
                <Text style={FONTS.textBold14}>Browser/Flyer</Text>
                <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {browserData.map(item => (
                  <ArticleItem
                    key={item.idPenyuluhan}
                    title={item.tittle}
                    category={item.hastag[0].nameCategory}
                    source={item.urlBanner}
                    date={item.createdDate}
                    onPress={() => handleMedia(item.media[0])}
                  />
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.header}
                onPress={() => onSeeAll(2)}
                activeOpacity={1}>
                <Text style={FONTS.textBold14}>Powerpoint</Text>
                <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              {powerpointData.map(item => (
                <ArticleDetailItem
                  key={item.idPenyuluhan}
                  title={item.tittle}
                  category={item.hastag}
                  source={item.urlBanner}
                  date={item.createdDate}
                  onPress={() => handleMedia(item.media[0])}
                />
              ))}
              <TouchableOpacity
                style={styles.header}
                onPress={() => onSeeAll(3)}
                activeOpacity={1}>
                <Text style={FONTS.textBold14}>Poster</Text>
                <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {posterData.map(item => (
                  <ArticleItem
                    key={item.idPenyuluhan}
                    title={item.tittle}
                    category={item.hastag[0].nameCategory}
                    source={item.urlBanner}
                    date={item.createdDate}
                    onPress={() => handleMedia(item.media[0])}
                  />
                ))}
              </ScrollView>
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
    </Container>
  );
};

const styles = StyleSheet.create({
  margin: {padding: 16},
  body: {marginTop: 24},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
});

export default CounselingScreen;
