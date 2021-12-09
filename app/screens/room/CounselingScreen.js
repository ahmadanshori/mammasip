import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../../components/Container';
import {BackgroundHeader} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {ArticleDetailItem, ArticleItem} from '../../components/Items';
import ImportantMessage from '../../components/ImportantMessage';

import {getCounselingByIdAPI} from '../../api/penyuluhan';
import {getRoomTypeByIdAPI} from '../../api/room';
import {COLORS, FONTS, SIZES} from '../../constants';

const CounselingScreen = ({navigation, route}) => {
  const {id} = route.params;
  const [select, setSelect] = useState(1);
  const [roomData, setRoomData] = useState(null);
  const [browserData, setBrowserData] = useState([]);
  const [powerpointData, setPowerpointData] = useState([]);
  const [posterData, setPosterData] = useState([]);
  const [loading, setLoading] = useState({get: true, refresh: false});

  useEffect(() => {
    getInitialData(select);
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
      console.log(`resBrowser`, resBrowser);
      console.log(`resPowerpoint`, resPowerpoint);
      console.log(`resPoster`, resPoster);
    } catch (e) {
      //   console.log('e', e);
    } finally {
      setLoading({get: false, refresh: false});
    }
  };

  const handleDownload = (link, type) => {
    setLoading(true);
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
        setLoading(false);
      })
      .then(data => {
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });
  };

  const handleMedia = val => {
    //   type_file
    //  1 foto, 2 video, 3 pdf, 4 pptx
    // 1,2,3 bisa di view baru download, 4 langsung download
    if (val.typeFile === 1) {
      // image/png
      handleDownload(val.url, 'image/png');
    } else if (val.typeFile === 2) {
      navigation.navigate('Video', {url: val.url_frame});
    } else if (val.typeFile === 3) {
      navigation.navigate('Pdf', {
        link: val.url,
      });
    } else if (val.typeFile === 4) {
      handleDownload(
        val.url,
        ' application/vnd.openxmlformats-officedocument.presentationml.presentation',
      );
    } else {
      return null;
    }
  };

  //   const handleRefresh = () => {
  //     setLoading(true);
  //     handleCustomerSearch(search);
  //   };

  const handleTopBar = async val => {
    setSelect(val);
    getInitialData(val);
  };

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
              <View style={styles.header}>
                <Text style={FONTS.textBold14}>Browser/Flyer</Text>
                <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </View>
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
              <View style={styles.header}>
                <Text style={FONTS.textBold14}>Powerpoint</Text>
                <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </View>
              {powerpointData.map(item => (
                <ArticleDetailItem
                  key={item.idPenyuluhan}
                  title={item.tittle}
                  category={item.hastag[0].nameCategory}
                  source={item.urlBanner}
                  date={item.createdDate}
                  onPress={() => handleMedia(item.media[0])}
                />
              ))}
              <View style={styles.header}>
                <Text style={FONTS.textBold14}>Poster</Text>
                <Text style={[FONTS.text12, {color: COLORS.primary}]}>
                  Lihat Semua
                </Text>
              </View>
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
