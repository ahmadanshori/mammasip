import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  HomeScreen,
  AlatHitungScreen,
  SearchScreen,
  JurnalScreen,
  ProfileScreen,
} from '../screens/menu';
import {LoginScreen, RegisterScreen} from '../screens/auth';
import {
  ChangePasswordScreen,
  EditProfileScreen,
  FaqScreen,
} from '../screens/profile';
import {
  WeightCalculatorScreen,
  CaloriesScreen,
  CancerRiskScreen,
} from '../screens/alathitung';

import {navigationRef, isMountedRef} from './RootNavigation';

import {COLORS, FONTS} from '../constants';
// import {AppContext} from '../index';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
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
        name="JurnalTab"
        component={JurnalScreen}
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
              navigationRef.current.navigate('JurnalTab');
              // if (token) {
              //   navigationRef.current.navigate('JurnalTab');
              // } else {
              //   navigationRef.current.navigate('Login', {
              //     nav: 'JurnalTab',
              //   });
              // }
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
              // if (token) {
              //   navigationRef.current.navigate('ProfileTab');
              // } else {
              //   navigationRef.current.navigate('Login', {
              //     nav: 'ProfileTab',
              //   });
              // }
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
  //   const [isLoading, setIsLoading] = useState(true);
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);
  //     return () => (isMountedRef.current = false);
  //   }, []);
  //   if (isLoading) {
  //     return <SplashScreen />;
  //   }

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
          <Stack.Screen
            component={ChangePasswordScreen}
            name="ChangePassword"
          />
          <Stack.Screen component={EditProfileScreen} name="EditProfile" />
          <Stack.Screen component={FaqScreen} name="Faq" />
          <Stack.Screen
            component={WeightCalculatorScreen}
            name="WeightCalculator"
          />
          <Stack.Screen component={CaloriesScreen} name="Calories" />
          <Stack.Screen component={CancerRiskScreen} name="CancerRisk" />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
