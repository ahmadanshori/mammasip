import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {COLORS, SIZES} from '../../constants';

const GKSContent = ({data}) => {
  const html = `<html>
    <head>
    </head>
    <body>
    ${data.gks_text}
    </body>
    </html>`;
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: data.gks_color_bg || COLORS.primary},
      ]}>
      {data.gks_text_position === 'left' ? (
        <>
          <View style={styles.w60}>
            <RenderHtml
              contentWidth={SIZES.width}
              source={{
                html: html,
              }}
            />
          </View>
          <View style={styles.w40}>
            {data.gks_media_list.map(item => (
              <Image
                key={item.idMedia}
                source={{
                  uri: item.url,
                }}
                style={[styles.img, {marginLeft: 6}]}
              />
            ))}
          </View>
        </>
      ) : (
        <>
          <View style={styles.w40}>
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
          <View style={styles.w60}>
            <RenderHtml
              contentWidth={SIZES.width}
              source={{
                html: html,
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
  w60: {width: '60%'},
  w40: {width: '40%'},
  img: {
    height: SIZES.width3,
    width: SIZES.width3,
    borderRadius: SIZES.width2,
    marginBottom: 16,
  },
});

export default GKSContent;
