import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {COLORS, FONTS, ICON, SIZES} from '../../constants';

const GKSContent = ({data}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: data.gks_color_bg || COLORS.primary},
      ]}>
      {data.gks_text_position === 'left' ? (
        <>
          <View style={styles.wrapper}>
            <RenderHtml
              contentWidth={'100%'}
              source={{
                html: data.gks_text,
              }}
            />
          </View>
          <View style={styles.wrapper}>
            {data.gks_media_list.map(item => (
              <Image
                key={item.idMedia}
                source={{
                  uri: item.url,
                }}
                style={styles.img}
              />
            ))}
          </View>
        </>
      ) : (
        <>
          <View style={styles.wrapper}>
            {data.gks_media_list.map(item => (
              <Image
                key={item.idMedia}
                source={{
                  uri: item.url,
                }}
                style={styles.img}
              />
            ))}
          </View>
          <View style={styles.wrapper}>
            <RenderHtml
              contentWidth={SIZES.width}
              source={{
                html: data.gks_text,
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    elevation: 6,
    flexDirection: 'row',
    backgroundColor: COLORS.red,
  },
  wrapper: {
    width: '50%',
  },
  img: {
    height: SIZES.width3 + 8,
    width: SIZES.width3 + 8,
    borderRadius: SIZES.width2,
    marginBottom: 16,
  },
});

export default GKSContent;
