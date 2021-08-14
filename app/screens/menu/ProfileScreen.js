import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {Container} from '../../components/Container';
import {ProfileHeader} from '../../components/Headers';
import {ProfileItem} from '../../components/Items';
import Point from '../../components/Point';

const ProfileScreen = ({navigation}) => {
  const handleNavigate = type => {
    navigation.navigate(`${type}`);
  };
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <View style={styles.container}>
          <Point />
          <ProfileItem
            iconName="bookmark-outline"
            title="Bookmark"
            number={100}
          />
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
          <ProfileItem iconName="comment-question-outline" title="FAQ" />
          <ProfileItem iconName="ballot-outline" title="Syarat & Ketentuan" />
          <ProfileItem iconName="exit-to-app" title="Keluar" />
        </View>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {padding: 16},
});

export default ProfileScreen;
