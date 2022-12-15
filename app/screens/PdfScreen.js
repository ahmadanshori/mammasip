import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';

import {Container} from '../components/Container';
import {HeaderTitle} from '../components/Headers';
import {DownloadModal} from '../components/Modals';

import {SIZES} from '../constants';
import {AppContext} from '../index';

const PdfScreen = ({route}) => {
  const {link} = route.params;
  const {setLoading} = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);

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
