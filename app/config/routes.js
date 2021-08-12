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
  ArticleScreen,
  VideoScreen,
  MessageScreen,
  ProfileScreen,
} from '../screens/menu';
import {LoginScreen, RegisterScreen} from '../screens/auth';

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
        name="Home"
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
        name="Article"
        component={ArticleScreen}
        options={{
          tabBarLabel: 'Artikel',
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
              navigationRef.current.navigate('Article');
              // if (token) {
              //   navigationRef.current.navigate('Article');
              // } else {
              //   navigationRef.current.navigate('Login', {
              //     nav: 'Article',
              //   });
              // }
            };
            validation();
          },
        }}
      />
      <Tab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          tabBarLabel: 'Video',
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name={focused ? 'play' : 'playcircleo'}
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
              navigationRef.current.navigate('Login');
              // if (token) {
              //   navigationRef.current.navigate('Video');
              // } else {
              //   navigationRef.current.navigate('Login', {
              //     nav: 'Video',
              //   });
              // }
            };
            validation();
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarLabel: 'Pesan',
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'message-text' : 'message-text-outline'}
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
              navigationRef.current.navigate('Message');
              // if (token) {
              //   navigationRef.current.navigate('Message');
              // } else {
              //   navigationRef.current.navigate('Login', {
              //     nav: 'Message',
              //   });
              // }
            };
            validation();
          },
        }}
      />
      <Tab.Screen
        name="Profile"
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
              navigationRef.current.navigate('Profile');
              // if (token) {
              //   navigationRef.current.navigate('Profile');
              // } else {
              //   navigationRef.current.navigate('Login', {
              //     nav: 'Profile',
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
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
