import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {Container} from '../../components/Container';
import {ProfileHeader} from '../../components/Headers';
import {ProfileItem} from '../../components/Items';
import Divider from '../../components/Divider';
import {AppContext} from '../../index';

const ProfileScreen = ({navigation}) => {
  const {user, setToken, setUser, setLoading} = useContext(AppContext);

  const handleNavigate = type => {
    navigation.navigate(`${type}`);
  };
  const handleLink = async () => {
    await Linking.openURL('http://103.31.38.171/term-condition');
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      const isGoogle = await AsyncStorage.getItem('isGoogle');
      if (isGoogle === '1') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      const keys = ['user', 'onesignal', 'isGoogle'];
      await AsyncStorage.multiRemove(keys);
      setToken(null);
      setUser(null);
      setLoading(false);
      navigation.navigate('HomeTab');
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader
          data={user}
          onEdit={() => handleNavigate('EditProfile')}
        />
        <View style={styles.wrapper}>
          {/* <Point /> */}
          {/* <ProfileItem
            iconName="bookmark-outline"
            title="Bookmark"
            number={100}
          /> */}
          <ProfileItem
            iconName="account-outline"
            title="Edit data diri"
            onPress={() => handleNavigate('EditProfile')}
          />
          <ProfileItem
            iconName="lock-outline"
            title="Ganti Password"
            onPress={() => handleNavigate('ChangePassword')}
          />
        </View>
        {/* <Divider />
        <View style={styles.wrapper}>
          <View style={styles.reminder}>
            <Icon name="bell-ring" size={20} />
            <Text
              style={[FONTS.textBold12, {color: COLORS.black, marginLeft: 8}]}>
              Notifikasi & Reminder
            </Text>
          </View>
          <View>
            <Text style={[FONTS.textBold10, {color: COLORS.primary}]}>
              Jurnal berat badan
            </Text>
            <View style={styles.between}>
              <Text style={[FONTS.text12, {color: COLORS.black}]}>
                Pengukur berat badan mingguan
              </Text>
              <ToggleSwitch
                isOn={isOn}
                onColor={COLORS.primary}
                offColor={COLORS.gray}
                size="medium"
                onToggle={() => setIsOn(state => !state)}
              />
            </View>
          </View>
        </View> */}
        <Divider />
        <View style={styles.wrapper}>
          <ProfileItem
            iconName="ballot-outline"
            title="Syarat & Ketentuan"
            onPress={handleLink}
          />
          <ProfileItem
            iconName="exit-to-app"
            title="Keluar"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8},
  reminder: {flexDirection: 'row', alignItems: 'center', marginBottom: 24},
  between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});

export default ProfileScreen;
