import React, {useState, useEffect, useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from '../screens/SplashScreen';
import VideoScreen from '../screens/VideoScreen';
import RoomScreen from '../screens/RoomScreen';
import FaqScreen from '../screens/FaqScreen';
import PdfScreen from '../screens/PdfScreen';
import ImportantMessageScreen from '../screens/ImportantMessageScreen';
import CaloriesDetailScreen from '../screens/CaloriesDetailScreen';
import ArticleScreen from '../screens/ArticleScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import ImageScreen from '../screens/ImageScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import VideoDetailScreen from '../screens/VideoDetailScreen';
import {AgendaScreen, AgendaDetailScreen} from '../screens/agenda';
import {
  HomeScreen,
  AlatHitungScreen,
  SearchScreen,
  JournalScreen,
  ProfileScreen,
} from '../screens/menu';
import {
  LoginScreen,
  RegisterScreen,
  OtpScreen,
  ForgotPasswordScreen,
} from '../screens/auth';
import {
  SportsJournalScreen,
  WeightJournalScreen,
  SkriningJournalScreen,
  CaloriesJournalScreen,
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
  DurationScreen,
} from '../screens/alathitung';
import {ListQuizScreen, QuizScreen} from '../screens/quiz';
import {
  DoctorRoomScreen,
  KnowYourSelfScreen,
  ListRoomScreen,
  CounselingScreen,
  CounselingListScreen,
  BungaRampaiScreen,
  BungaRampaiListScreen,
  ListVideoScreen,
} from '../screens/room';

import {navigationRef, isMountedRef} from './RootNavigation';

import {COLORS} from '../constants';
import {AppContext} from '../index';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const {token} = useContext(AppContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarIconStyle: {marginTop: 4},
        tabBarLabelStyle: {marginBottom: 4},
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
                size={20}
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
                size={20}
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
                size={20}
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
                size={20}
                color={focused ? COLORS.primary : COLORS.gray}
              />
            );
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
                size={20}
                color={focused ? COLORS.primary : COLORS.gray}
              />
            );
          },
        }}
        listeners={{
          tabPress: async e => {
            e.preventDefault();
            const validation = async () => {
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
  const {onboarding} = useContext(AppContext);
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
  if (!onboarding) {
    return <OnboardingScreen />;
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
            component={ForgotPasswordScreen}
            name="ForgotPassword"
          />
          <Stack.Screen
            component={ChangePasswordScreen}
            name="ChangePassword"
          />
          <Stack.Screen component={AgendaScreen} name="Agenda" />
          <Stack.Screen component={AgendaDetailScreen} name="AgendaDetail" />
          <Stack.Screen component={VideoScreen} name="Video" />
          <Stack.Screen component={RoomScreen} name="Room" />
          <Stack.Screen component={ListRoomScreen} name="ListRoom" />
          <Stack.Screen component={EditProfileScreen} name="EditProfile" />
          <Stack.Screen component={FaqScreen} name="Faq" />
          <Stack.Screen component={PdfScreen} name="Pdf" />
          <Stack.Screen
            component={ImportantMessageScreen}
            name="ImportantMessage"
          />
          <Stack.Screen component={CounselingScreen} name="Counseling" />
          <Stack.Screen
            component={CounselingListScreen}
            name="CounselingList"
          />
          <Stack.Screen component={BungaRampaiScreen} name="BungaRampai" />
          <Stack.Screen
            component={BungaRampaiListScreen}
            name="BungaRampaiList"
          />
          <Stack.Screen component={ListVideoScreen} name="ListVideo" />
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
          <Stack.Screen component={DurationScreen} name="Duration" />
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
          <Stack.Screen
            component={CaloriesJournalScreen}
            name="CaloriesJournal"
          />
          <Stack.Screen component={ListQuizScreen} name="ListQuiz" />
          <Stack.Screen component={QuizScreen} name="Quiz" />
          <Stack.Screen component={DoctorRoomScreen} name="DoctorRoom" />
          <Stack.Screen component={KnowYourSelfScreen} name="KnowYourSelf" />
          <Stack.Screen
            component={CaloriesDetailScreen}
            name="CaloriesDetail"
          />
          <Stack.Screen component={ArticleScreen} name="Article" />
          <Stack.Screen component={AboutUsScreen} name="AboutUs" />
          <Stack.Screen component={ImageScreen} name="Image" />
          <Stack.Screen component={VideoDetailScreen} name="VideoDetail" />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
