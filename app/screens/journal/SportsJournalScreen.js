import React, {useState, useContext, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Container} from '../../components/Container';
// import {AskButton} from '../../components/Buttons';
import {HeaderTitle} from '../../components/Headers';
import {dropdownalert} from '../../components/AlertProvider';
import {JournalItem, VideoItem} from '../../components/Items';
import {ActivityModal} from '../../components/Modals';
// import Reminder from '../../components/Reminder';
// import Divider from '../../components/Divider';
import {createJournalSportAPI} from '../../api/journal';
import {COLORS, FONTS, SIZES} from '../../constants';
import {AppContext} from '../../index';

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
  const {token, user, setLoading} = useContext(AppContext);
  const [isActivity, setIsActivity] = useState(false);
  const [time, setTime] = useState(null);
  const [isCalendar, setIsCalendar] = useState(false);
  const [field, setField] = useState({
    id_user: user?.id_user,
    lama_berolahraga: null,
    level_olahraga: null,
  });

  // const [isReminder, setIsReminder] = useState(false);

  const handleAddActivity = useCallback(
    async value => {
      setIsActivity(false);
      setLoading(true);
      try {
        const newData = {
          ...field,
          lama_berolahraga: value.time,
          level_olahraga: value.activity,
        };
        console.log(`newData`, newData);
        const res = await createJournalSportAPI(token, newData);
        console.log(`res`, res);
        setField(newData);
      } catch (e) {
        console.log(`e`, e, {...e});
      } finally {
        setLoading(false);
      }
    },
    [token, field, setLoading],
  );

  const onChange = (event, selectedDate) => {
    setIsCalendar(false);
    setTime(selectedDate);
  };
  // const handleReminder = () => {
  //   setIsReminder(false);
  // };
  // const handleCloseReminder = () => {
  //   setIsReminder(false);
  //   setTime(null);
  // };

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
              onPress={() => setIsActivity(true)}
              style={styles.circleIcon}>
              <Icon name="pluscircle" size={50} color={COLORS.darkBlue} />
            </TouchableOpacity>
          </View>
          <Text style={FONTS.text12}>Aktivitas dalam seminggu</Text>
          <Text
            style={[FONTS.textBold14, {color: COLORS.secondary, marginTop: 4}]}>
            Berat
          </Text>
          <View style={styles.row}>
            <View style={styles.margin}>
              <Text
                style={[FONTS.textBold12, {transform: [{rotate: '270deg'}]}]}>
                Menit
              </Text>
            </View>
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
          </View>
          <Text style={[FONTS.textBold12, styles.tanggal]}>Tanggal</Text>
          <View style={styles.history}>
            <JournalItem />
            <JournalItem />
            <JournalItem />
          </View>
          {/* <Reminder
            onPress={() => setIsReminder(true)}
            time={time}
            title="Reminder Harian Aktif"
          /> */}
        </View>
      </ScrollView>
      {/* {isReminder && (
        <ReminderModals
          onCalendar={() => setIsCalendar(true)}
          time={time}
          onSave={handleReminder}
          onClose={handleCloseReminder}
        />
      )} */}
      {isActivity && (
        <ActivityModal
          onClose={() => setIsActivity(false)}
          onAddPress={handleAddActivity}
        />
      )}
      {isCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time || new Date()}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 16, paddingVertical: 24},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  margin: {
    marginLeft: -16,
    marginRight: -16,
  },
  tanggal: {color: COLORS.black, textAlign: 'center', marginTop: -16},

  history: {marginTop: 24},
  circleIcon: {elevation: 10, backgroundColor: COLORS.white, borderRadius: 50},
});
export default SportsJournalScreen;
