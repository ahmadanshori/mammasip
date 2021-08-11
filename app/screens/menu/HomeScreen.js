import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {HomeHeader} from '../../components/Headers';
import CategoryHome from '../../components/CategoryHome';
import {HomeItem} from '../../components/Items';
import {FONTS, COLORS} from '../../constants';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <CategoryHome />
      <View style={styles.box}>
        <View>
          <View style={styles.titleWrapper}>
            <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
              Jaga Kesehatanmu
            </Text>
            <Text style={[FONTS.text10, styles.seeAll]}>Lihat Semua</Text>
          </View>
          <View style={styles.componentWrapper}>
            <HomeItem />
            <HomeItem />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  box: {paddingHorizontal: 16, paddingTop: 24},
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeAll: {color: COLORS.primary, paddingVertical: 4, paddingLeft: 32},
  componentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default HomeScreen;
