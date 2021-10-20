import React, {useState, useEffect, useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from '../screens/SplashScreen';
import VideoDetailScreen from '../screens/VideoDetailScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import RoomScreen from '../screens/RoomScreen';
import FaqScreen from '../screens/FaqScreen';
import {
  HomeScreen,
  AlatHitungScreen,
  SearchScreen,
  JournalScreen,
  ProfileScreen,
} from '../screens/menu';
import {LoginScreen, RegisterScreen, OtpScreen} from '../screens/auth';
import {
  SportsJournalScreen,
  WeightJournalScreen,
  SkriningJournalScreen,
} from '../screens/journal';
import {ChangePasswordScreen, EditProfileScreen} from '../screens/profile';
import {
  BmrScreen,
  CalculationDetailScreen,
  BmiScreen,
  CancerRiskScreen,
  FoodSuggestionScreen,
  CancerQuestionScreen,
  MenuPackageScreen,
} from '../screens/alathitung';

import {navigationRef, isMountedRef} from './RootNavigation';

import {COLORS, FONTS} from '../constants';
import {AppContext} from '../index';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const {token} = useContext(AppContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {paddingBottom: 4},
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={22}
                color={focused ? COLORS.primary : COLORS.gray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="alathitungTab"
        component={AlatHitungScreen}
        options={{
          tabBarLabel: 'Alat Hitung',
          tabBarIcon: ({focused}) => {
            return (
              <MaterialIcons
                name={'article'}
                size={22}
                color={focused ? COLORS.primary : COLORS.gray}
              />
            );
          },
        }}
        listeners={{
          tabPress: async e => {
            e.preventDefault();
            const validation = async () => {
              navigationRef.current.navigate('alathitungTab');
              // if (token) {
              //   navigationRef.current.navigate('alathitungTab');
              // } else {
              //   navigationRef.current.navigate('Login', {
              //     nav: 'alathitungTab',
              //   });
              // }
            };
            validation();
          },
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Telusuri',
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name={'search'}
                size={22}
                color={focused ? COLORS.primary : COLORS.gray}
              />
            );
          },
        }}
        listeners={{
          tabPress: async e => {
            e.preventDefault();
            const validation = async () => {
              navigationRef.current.navigate('SearchTab');
              // if (token) {
              //   navigationRef.current.navigate('VideoTab');
              // } else {
              //   navigationRef.current.navigate('Login', {
              //     nav: 'VideoTab',
              //   });
              // }
            };
            validation();
          },
        }}
      />
      <Tab.Screen
        name="JournalTab"
        component={JournalScreen}
        options={{
          tabBarLabel: 'Jurnal',
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name={'calendar'}
                size={22}
                color={focused ? COLORS.primary : COLORS.gray}
              />
            );
          },
        }}
        listeners={{
          tabPress: async e => {
            e.preventDefault();
            const validation = async () => {
              navigationRef.current.navigate('JournalTab');
              if (token) {
                navigationRef.current.navigate('JournalTab');
              } else {
                navigationRef.current.navigate('Login', {
                  nav: 'JournalTab',
                });
              }
            };
            validation();
          },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'account-circle' : 'account-circle-outline'}
                size={22}
                color={focused ? COLORS.primary : COLORS.gray}
              />
            );
          },
        }}
        listeners={{
          tabPress: async e => {
            e.preventDefault();
            const validation = async () => {
              navigationRef.current.navigate('ProfileTab');
              if (token) {
                navigationRef.current.navigate('ProfileTab');
              } else {
                navigationRef.current.navigate('Login', {
                  nav: 'ProfileTab',
                });
              }
            };
            validation();
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default function App() {
  //   const {token, background, photo} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => (isMountedRef.current = false);
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <>
          <Stack.Screen component={TabNavigator} name="Home" />
          <Stack.Screen component={LoginScreen} name="Login" />
          <Stack.Screen component={RegisterScreen} name="Register" />
          <Stack.Screen component={OtpScreen} name="Otp" />
          <Stack.Screen
            component={ChangePasswordScreen}
            name="ChangePassword"
          />
          <Stack.Screen component={VideoDetailScreen} name="VideoDetail" />
          <Stack.Screen component={ArticleDetailScreen} name="ArticleDetail" />
          <Stack.Screen component={RoomScreen} name="Room" />
          <Stack.Screen component={EditProfileScreen} name="EditProfile" />
          <Stack.Screen component={FaqScreen} name="Faq" />
          <Stack.Screen component={BmrScreen} name="Bmr" />
          <Stack.Screen
            component={CalculationDetailScreen}
            name="CalculationDetail"
          />
          <Stack.Screen component={BmiScreen} name="Bmi" />
          <Stack.Screen component={CancerRiskScreen} name="CancerRisk" />
          <Stack.Screen
            component={FoodSuggestionScreen}
            name="FoodSuggestion"
          />
          <Stack.Screen component={MenuPackageScreen} name="MenuPackage" />
          <Stack.Screen
            component={CancerQuestionScreen}
            name="CancerQuestion"
          />
          <Stack.Screen component={SportsJournalScreen} name="SportsJournal" />
          <Stack.Screen component={WeightJournalScreen} name="WeightJournal" />
          <Stack.Screen
            component={SkriningJournalScreen}
            name="SkriningJournal"
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
