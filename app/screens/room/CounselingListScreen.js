import React, {useState, useCallback, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {LoadingComponent} from '../../components/Loadings';
import {ArticleDetailItem} from '../../components/Items';

import {getCounselingByIdAPI} from '../../api/penyuluhan';

import DownloadModal from '../../components/Modals/DownloadModal';
import {COLORS} from '../../constants';

const CounselingListScreen = ({navigation, route}) => {
  const {counselingId, title} = route.params;
  const [data, setData] = useState(null);
  const [isDownload, setIsDownload] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState({
    get: true,
    refresh: false,
    nextPage: false,
  });

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getCounselingByIdAPI(counselingId, 0, 20);
      setData(res.data.data);
    } catch (e) {
      //   console.log('e', e);
    } finally {
      setLoading({get: false, refresh: false, nextPage: false});
    }
  };

  const handleDownload = useCallback((link, type) => {
    // setLoading(true);
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
        // setLoading(false);
      })
      .then(res => {
        // setLoading(false);
      })
      .catch(e => {
        // setLoading(false);
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
  };

  const onDownload = useCallback(() => {
    setIsDownload(false);
    if (selected.typeFile === 1) {
      handleDownload(selected.url, 'image/png');
    } else if (selected.typeFile === 4) {
      handleDownload(
        selected.url,
        ' application/vnd.openxmlformats-officedocument.presentationml.presentation',
      );
    } else {
      return null;
    }
  }, [selected, handleDownload]);

  const renderItem = ({item}) => (
    <ArticleDetailItem
      title={item.tittle}
      category={item.hastag}
      source={item.urlBanner}
      date={item.createdDate}
      onPress={() => handleMedia(item.media[0])}
    />
  );

  const nextPage = async () => {
    if (data.number < data.totalPages - 1) {
      setLoading(state => ({...state, nextPage: true}));
      try {
        const res = await getCounselingByIdAPI(
          counselingId,
          data.number + 1,
          20,
        );
        setData({
          ...res.data.data,
          content: [...data.content, ...res.data.data.content],
        });
      } catch (err) {
        // console.log(`err`, err);
        // setError(err);
      } finally {
        setLoading(state => ({...state, nextPage: false}));
      }
    }
  };
  //   const handleRefresh = () => {
  //     setLoading(true);
  //     handleCustomerSearch(search);
  //   };

  return (
    <Container>
      <HeaderTitle back title={title} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <FlatList
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
          // refreshing={loading}
          // onRefresh={handleRefresh}
          data={data.content}
          keyExtractor={item => item.idPenyuluhan.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            loading.nextPage && (
              <ActivityIndicator size="large" color={COLORS.primary} />
            )
          }
          contentContainerStyle={{
            padding: 16,
          }}
        />
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

// const styles = StyleSheet.create({});

export default CounselingListScreen;
