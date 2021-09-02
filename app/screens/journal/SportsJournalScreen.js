import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';

import {Container} from '../../components/Container';
import {AskButton} from '../../components/Buttons';
import {HeaderTitle} from '../../components/Headers';
import {VideoItem, CalculatorItem} from '../../components/Items';
import {ActivityModal} from '../../components/Modals';
import Reminder from '../../components/Reminder';
import Divider from '../../components/Divider';

import {COLORS, FONTS, SIZES} from '../../constants';

const data = [
  {quarter: '12/08', earnings: 100},
  {quarter: '14/08', earnings: 20},
  {quarter: '17/08', earnings: 70},
  {quarter: '21/08', earnings: 35},
  {quarter: '4/09', earnings: 88},
  {quarter: '15/09', earnings: 45},
  {quarter: '28/09', earnings: 68},
];
const SportsJournalScreen = () => {
  return (
    <Container>
      <HeaderTitle title="Jurnal olahraga anda" />
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View>
              <Text style={FONTS.text12}>Aktivitas dalam seminggu</Text>
              <View style={styles.row}>
                <Text style={FONTS.textBold24}>132</Text>
                <Text
                  style={[FONTS.text16, {color: COLORS.gray, marginLeft: 6}]}>
                  Menit
                </Text>
              </View>
            </View>
            <View>
              <Text style={FONTS.text12}>Rekomendasi</Text>
              <View style={styles.row}>
                <Text style={[FONTS.textBold24, {color: COLORS.green}]}>
                  132
                </Text>
                <Text
                  style={[FONTS.text16, {color: COLORS.gray, marginLeft: 6}]}>
                  Menit
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                elevation: 10,
                backgroundColor: COLORS.white,
                borderRadius: 50,
              }}>
              <Icon name="pluscircle" size={50} color={COLORS.darkBlue} />
            </TouchableOpacity>
          </View>
          <Text style={FONTS.text12}>Aktivitas dalam seminggu</Text>
          <Text
            style={[FONTS.textBold14, {color: COLORS.secondary, marginTop: 4}]}>
            Berat
          </Text>

          <VictoryChart
            width={SIZES.width}
            theme={VictoryTheme.material}
            domainPadding={10}>
            <VictoryBar
              data={data}
              x="quarter"
              y="earnings"
              // cornerRadius={{topLeft: data => console.log(`datum`, data)}}
              style={{data: {fill: COLORS.secondary}}}
            />
          </VictoryChart>
          <Text
            style={[
              FONTS.text12,
              {color: COLORS.blue, textAlign: 'center', marginBottom: 32},
            ]}>
            Riwayat olahraga
          </Text>
          <Reminder />
        </View>
        <Divider />
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View style={styles.row}>
              <MaterialCommunityIcons
                name="meditation"
                size={18}
                style={styles.icon}
              />
              <Text style={FONTS.textBold14}>Olahraga Untuk Anda</Text>
            </View>
            <Text style={[FONTS.text12, {color: COLORS.primary}]}>
              Lihat Semua
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <VideoItem />
            <VideoItem />
            <VideoItem />
            <VideoItem />
            <VideoItem />
            <VideoItem />
          </ScrollView>
        </View>
        <Divider />
        <View style={styles.wrapper}>
          <Text
            style={[
              FONTS.textBold16,
              {color: COLORS.black, marginBottom: 16, textAlign: 'center'},
            ]}>
            Butuh informasi lainya?
          </Text>
          <AskButton />
          <View style={styles.margin}>
            <CalculatorItem
              source={require('../../assets/images/woman.png')}
              // onPress={() => handleNavigation('WeightCalculator')}
              backgroundColor={COLORS.primary}
              title="Ayo ikutan Quiz!"
              description="Uji pengetahuanmu dengan quiz
              kesehatan dari mammaSIP."
            />
          </View>
        </View>
      </ScrollView>
      <ActivityModal />
    </Container>
  );
};

export default SportsJournalScreen;

const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 16, paddingVertical: 24},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  graphStyle: {backgroundColor: COLORS.white},
  icon: {marginRight: 8},
  margin: {marginTop: 44},
});
