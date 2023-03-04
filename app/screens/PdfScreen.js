import React, {useState, useContext} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';

import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {DownloadModal} from '../components/Modals';
import {ProgreesLoading} from '../components/Loadings';

import {SIZES} from '../constants';
import {AppContext} from '../index';

const PdfScreen = ({route}) => {
  const {link} = route.params;
  const {setLoading} = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isProgress, setIsProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [finishProgress, setFinishProgress] = useState(null);

  const handleVisible = () => {
    setIsVisible(state => !state);
  };

  const handleDownload = () => {
    setIsVisible(false);
    setLoading(true);
    ReactNativeBlobUtil.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      //   fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // <-- this is the only thing required
        // Optional, override notification setting (default to true)
        notification: true,
        // Optional, but recommended since android DownloadManager will fail when
        // the url does not contains a file extension, by default the mime type will be text/plain
        mime: 'application/pdf',
        description: 'File downloaded by download manager.',
      },
    })
      .fetch('GET', link, {
        Accept: 'application/json',
      })
      .then(res => {
        // the temp file path

        setLoading(false);
      })
      .then(data => {
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });

    if (Platform.OS === 'ios') {
      let dirs = ReactNativeBlobUtil.fs.dirs;

      ReactNativeBlobUtil.config({
        fileCache: true,
        notification: true,
        IOSDownloadTask: true,
        path:
          dirs.DocumentDir + `/mammasip${(Math.random() * 101).toFixed()}.pdf`,
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
          mime: 'application/pdf',
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
  };
  return (
    <Container>
      <HeaderTitle back title="PDF" onDownloadPress={handleVisible} />
      <View style={styles.container}>
        <Pdf
          source={{uri: link, cache: true}}
          //   onLoadComplete={(numberOfPages, filePath) => {
          //     console.log(`Number of pages: ${numberOfPages}`);
          //   }}
          //   onPageChanged={(page, numberOfPages) => {
          //     console.log(`Current page: ${page}`);
          //   }}
          onError={error => {
            // console.log(error);
          }}
          //   onPressLink={uri => {
          //     console.log(`Link pressed: ${uri}`);
          //   }}
          style={styles.pdf}
        />
      </View>
      {isVisible && (
        <DownloadModal onClose={handleVisible} onDownload={handleDownload} />
      )}
      {isProgress ? (
        <ProgreesLoading progress={progress} finishProgress={finishProgress} />
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
  },
});

export default PdfScreen;
