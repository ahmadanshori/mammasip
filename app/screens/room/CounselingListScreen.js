import React, {useState, useCallback, useEffect, useContext} from 'react';
import {ActivityIndicator, StyleSheet, FlatList, Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {LoadingComponent, ProgreesLoading} from '../../components/Loadings';
import {ArticleDetailItem} from '../../components/Items';
import {ErrorNetwork, ErrorServer} from '../../components/Errors';
import {getCounselingByIdAPI} from '../../api/penyuluhan';

import DownloadModal from '../../components/Modals/DownloadModal';
import {COLORS} from '../../constants';
import useErrorHandler from '../../hooks/useErrorHandler';
import {AppContext} from '../../index';

const CounselingListScreen = ({route}) => {
  const {counselingId, title} = route.params;
  const {token} = useContext(AppContext);
  const [data, setData] = useState(null);
  const [isDownload, setIsDownload] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isProgress, setIsProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [finishProgress, setFinishProgress] = useState(null);
  const [loading, setLoading] = useState({
    get: true,
    refresh: false,
    nextPage: false,
  });
  const [error, setError] = useErrorHandler();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const res = await getCounselingByIdAPI(token, counselingId, 0, 20);
      setData(res.data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading({get: false, refresh: false, nextPage: false});
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
        ' application/vnd.openxmlformats-officedocument.presentationml.presentation',
        selected?.title,
      );
    } else {
      return null;
    }
  }, [selected, handleDownload]);

  const renderItem = ({item}) => (
    <ArticleDetailItem
      title={item.tittle}
      source={item.urlBanner}
      date={item.createdDate}
      onPress={() => handleMedia({...item.media[0], title: item.tittle})}
    />
  );

  const nextPage = async () => {
    if (data.number < data.totalPages - 1) {
      setLoading(state => ({...state, nextPage: true}));
      try {
        const res = await getCounselingByIdAPI(
          token,
          counselingId,
          data.number + 1,
          20,
        );
        setData({
          ...res.data.data,
          content: [...data.content, ...res.data.data.content],
        });
      } catch (e) {
        setError(e);
      } finally {
        setLoading(state => ({...state, nextPage: false}));
      }
    }
  };
  const handleRefresh = () => {
    setError();
    setLoading(state => ({...state, refresh: true}));
    getInitialData();
  };

  return (
    <Container>
      <HeaderTitle back title={title} />
      {loading.get ? (
        <LoadingComponent />
      ) : (
        <FlatList
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
          refreshing={loading.refresh}
          onRefresh={handleRefresh}
          data={data.content}
          keyExtractor={item => item.idPenyuluhan.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            loading.nextPage && (
              <ActivityIndicator size="large" color={COLORS.primary} />
            )
          }
          contentContainerStyle={styles.padding}
        />
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
  padding: {
    padding: 16,
  },
});

export default CounselingListScreen;
