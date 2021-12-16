import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/AntDesign';
import {Container} from '../components/Container';
import {COLORS, SIZES} from '../constants';

const VideoScreen = ({route, navigation}) => {
  const {url} = route.params;
  return (
    <Container>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={SIZES.opacity}>
          <Icon name={'arrowleft'} size={18} color={COLORS.white} />
        </TouchableOpacity>
        <View />
      </View>

      <WebView
        source={{uri: url}}
        mediaPlaybackRequiresUserAction={false}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
        allowsFullscreenVideo={true}
        javaScriptEnabled={true}
        //   userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
      />
    </Container>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#000000',
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
