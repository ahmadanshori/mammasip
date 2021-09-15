import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import {HeaderTitle} from '../components/Headers';
import {HomeItem} from '../components/Items';
import {VideoRecomendation} from '../components/Search';
import {COLORS} from '../constants';

const RoomScreen = ({navigation, route}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={data.color} barStyle={'light-content'} />
      <HeaderTitle title={data.title} backgroundColor={data.color} white />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: data.color,
            },
          ]}>
          <HomeItem
            title={data.name}
            desc={data.desc}
            color={data.color}
            style={styles.category}
            source={data.source}
            image={data.image}
          />
        </View>
        <View style={styles.padding}>
          <VideoRecomendation
            onPress={() => navigation.navigate('VideoDetail')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  header: {height: 40, paddingHorizontal: 16},
  category: {elevation: 8},
  padding: {paddingHorizontal: 16, marginTop: 56},
});
