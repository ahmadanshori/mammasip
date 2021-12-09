import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container} from '../../components/Container';
import {HeaderTitle} from '../../components/Headers';
import {VideoItem, CalculatorItem} from '../../components/Items';
import {AskButton} from '../../components/Buttons';
import {Sadari, Sadanis} from '../../components/Journal';
import {dropdownalert} from '../../components/AlertProvider';
import Divider from '../../components/Divider';
import Accordion from '../../components/Accordion';
import {COLORS, FONTS} from '../../constants';
import formatDate from '../../libs/formatDate';
import QuizIcon from '../../assets/icons/quiz.svg';

const SkriningJournalScreen = () => {
  const [sadari, setSadari] = useState(null);
  const [sadanis, setSadanis] = useState(null);
  const [reminder, setReminder] = useState(null);
  return (
    <Container>
      <HeaderTitle title="Jurnal skrining SADARI & SADANIS" />
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.row}>
            <Text style={FONTS.textBold12}>Hari ini</Text>
            <Text
              style={[
                FONTS.textBold12,
                {color: COLORS.lightBlue, marginLeft: 8},
              ]}>
              {formatDate(new Date(), 'EEEE, dd MMMM yyyy')}
            </Text>
          </View>
          <View style={styles.calendar}>
            <Calendar
              current={formatDate(new Date(), 'yyyy-MM-dd')}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={day => {
                // console.log('selected day', day);
              }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'MMMM yyyy'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              // onMonthChange={month => {
              //   console.log('month changed', month);
              // }}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
              firstDay={1}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={subtractMonth => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
              disableAllTouchEventsForDisabledDays={true}
              // Replace default month and year title with custom one. the function receive a date as parameter
              // renderHeader={date => {
              //   /*Return JSX*/
              // }}
              enableSwipeMonths={true}
            />
          </View>
        </View>
        <Divider />
        <View style={styles.wrapper}>
          <Text style={[FONTS.textBold12, styles.margin8]}>Sadari</Text>
          <Text style={FONTS.text12}>Pemeriksaan Payudara Sendiri</Text>
          <Sadari time={reminder} data={sadari} />
        </View>
        <Divider />
        <View style={styles.wrapper}>
          <Text style={[FONTS.textBold12, styles.margin8]}>Sadanis</Text>
          <Text style={FONTS.text12}>Pemeriksaan Payudara Klinis</Text>
          <Sadanis time={reminder} data={sadanis} />
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
              <Text style={FONTS.textBold14}>Cara melakukan SADARI</Text>
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
          <Text style={[FONTS.textBold14, {color: COLORS.black}]}>
            Info seputar skrining
          </Text>
          <Accordion title="Apa itu BMI?" />
          <Accordion title="Apa itu kalori & fungsinya untuk tubuh?" />
          <Accordion title="Bagaimana cara menghitung BMR?" />
          <Accordion title="Apakah BMR penting untuk kesehatan?" />
          <Text style={[FONTS.textBold16, styles.information]}>
            Butuh informasi lainya?
          </Text>
          <AskButton />
          {/* <View style={styles.margin}>
            <CalculatorItem
              image={<QuizIcon height={60} width={60} />}
              // onPress={() => handleNavigation('WeightCalculator')}
              onPress={() =>
                dropdownalert.alertWithType(
                  'warn',
                  '',
                  'Belum bisa, Masih Diproses!!',
                )
              }
              backgroundColor={COLORS.primary}
              title="Ayo ikutan Quiz!"
              description="Uji pengetahuanmu dengan quiz
              kesehatan dari mammaSIP."
            />
          </View> */}
        </View>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 16, paddingVertical: 24},
  row: {flexDirection: 'row', alignItems: 'center'},
  calendar: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 4,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  icon: {marginRight: 8},
  information: {
    color: COLORS.black,
    marginBottom: 16,
    marginTop: 32,
    textAlign: 'center',
  },
  margin: {marginTop: 32},
  margin8: {marginBottom: 8},
});
export default SkriningJournalScreen;
