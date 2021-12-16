import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import {Container} from '../../components/Container';
import {AskButton, MainButton} from '../../components/Buttons';
import {HeaderTitle} from '../../components/Headers';
import {VideoItem} from '../../components/Items';
import {ActivityModal, ReminderModals} from '../../components/Modals';
import MealSuggestions from '../../components/MealSuggestions';
import Reminder from '../../components/Reminder';
import Divider from '../../components/Divider';
// import {dropdownalert} from '../../components/AlertProvider';
import {COLORS, FONTS, SIZES} from '../../constants';
// import QuizIcon from '../../assets/icons/quiz.svg';

const WeightJournalScreen = ({navigation}) => {
  const [isActivity, setIsActivity] = useState(false);
  const [foodSuggestion, setFoodSuggestion] = useState(null);
  const [time, setTime] = useState(null);
  const [isCalendar, setIsCalendar] = useState(false);
  const [isReminder, setIsReminder] = useState(false);

  const handleAddActivity = value => {
    setIsActivity(false);
  };
  const handleNavigation = useCallback((val, param) => {
    navigation.navigate(val, param);
  }, []);
  const handleFoodSuggestion = value => {
    setFoodSuggestion(value);
  };
  const onChange = (event, selectedDate) => {
    setIsCalendar(false);
    setTime(selectedDate);
  };
  const handleReminder = () => {
    setIsReminder(false);
  };
  const handleCloseReminder = () => {
    setIsReminder(false);
    setTime(null);
  };
  return (
    <Container>
      <HeaderTitle title="Jurnal berat badan anda" />
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View>
              <Text style={FONTS.text12}>Berat Badan Terakhir</Text>
              <View style={styles.row}>
                <Text style={FONTS.textBold24}>132</Text>
                <Text
                  style={[FONTS.text16, {color: COLORS.gray, marginLeft: 6}]}>
                  Menit
                </Text>
              </View>
            </View>
            <View>
              <Text style={FONTS.text12}>Ideal</Text>
              <View style={styles.row}>
                <Text style={[FONTS.textBold24, {color: COLORS.green}]}>
                  72
                </Text>
                <Text
                  style={[FONTS.text16, {color: COLORS.gray, marginLeft: 6}]}>
                  Kg
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setIsActivity(true)}
              style={{
                elevation: 10,
                backgroundColor: COLORS.white,
                borderRadius: 50,
              }}>
              <Icon name="pluscircle" size={50} color={COLORS.darkBlue} />
            </TouchableOpacity>
          </View>
          <Reminder
            onPress={() => setIsReminder(true)}
            time={time}
            title="Reminder Harian Aktif"
          />
        </View>
        <Divider />
        <View style={styles.wrapper}>
          <View style={styles.justify}>
            <Text
              style={[
                FONTS.textBold16,
                {color: COLORS.black, marginBottom: 8},
              ]}>
              Saran Menu Makanan
            </Text>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() =>
                handleNavigation('FoodSuggestion', {
                  handleFoodSuggestion,
                })
              }
              activeOpacity={SIZES.opacity}>
              <Text style={[FONTS.textBold12, {color: COLORS.primary}]}>
                Ubah
              </Text>
            </TouchableOpacity>
          </View>
          {foodSuggestion ? (
            <MealSuggestions />
          ) : (
            <>
              <View style={styles.warningWrapper}>
                <View style={styles.warning}>
                  <Ionicons name="alert-circle" size={20} color={COLORS.red} />
                  <Text
                    style={[
                      FONTS.textBold12,
                      {color: COLORS.red, marginLeft: 6},
                    ]}>
                    Anda belum mengatur jumlah kalori harian
                  </Text>
                </View>
                <Text
                  style={[FONTS.text12, {color: COLORS.black, marginTop: 8}]}>
                  Yuk tentukan jumlah kalori harian biar sehat dan berat badanmu
                  jadi lebih ideal.
                </Text>
              </View>
              <View style={styles.foodWrapper}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/icons/food.png')}
                  style={styles.foodImg}
                />
              </View>
              <MainButton
                title="Pilih Menu Makanan"
                onPress={() =>
                  handleNavigation('FoodSuggestion', {
                    handleFoodSuggestion,
                  })
                }
              />
            </>
          )}
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
              <Text style={FONTS.textBold14}>Video pilihan untuk anda</Text>
            </View>
            <Text style={[FONTS.text12, {color: COLORS.primary}]}>
              Lihat Semua
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
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
        </View>
      </ScrollView>
      {isReminder && (
        <ReminderModals
          onCalendar={() => setIsCalendar(true)}
          time={time}
          onSave={handleReminder}
          onClose={handleCloseReminder}
        />
      )}
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
  warningWrapper: {
    backgroundColor: COLORS.lightRed,
    padding: 16,
    borderRadius: 6,
  },
  changeButton: {
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 24,
  },
  justify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warning: {flexDirection: 'row', alignItems: 'center'},
  foodWrapper: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 36,
  },
  foodImg: {height: SIZES.width3, width: SIZES.width2},
  row: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  graphStyle: {backgroundColor: COLORS.white},
  icon: {marginRight: 8},
});
export default WeightJournalScreen;
