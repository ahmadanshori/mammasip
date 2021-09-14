import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VideoItem, VideoDetailItem} from '../Items';
import {COLORS, FONTS} from '../../constants';
import {OutlineButton} from '../Buttons';

const data1 = [1, 2, 3, 4];
const data2 = [1, 2, 3];
const VideoRecomendation = ({onPress}) => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="television-play"
            size={18}
            style={styles.icon}
          />
          <Text style={FONTS.textBold14}>Video Pilihan Untuk Anda</Text>
        </View>
        <Text style={[FONTS.text12, styles.seeAll]}>Lihat Semua</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data1.map(item => (
          <VideoItem key={item} onPress={onPress} />
        ))}
      </ScrollView>
      <View style={styles.body}>
        {data2.map(item => (
          <VideoDetailItem key={item} />
        ))}
      </View>
      <OutlineButton title="Lihat Semua Video" />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  icon: {marginRight: 8},
  seeAll: {color: COLORS.primary, paddingVertical: 6, paddingLeft: 8},
  body: {marginTop: 24, marginBottom: 8},
});
export default VideoRecomendation;
