import { View, Text, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from '../../i18n';
import Home from '../screen/home/Home';
import Questions from '../screen/home/question/Questions';
import Punishments from '../screen/home/punishment/Punishments';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import CustomButton from '../components/CustomElements/CustomButton';
import UseAuthContext from '../context/UseAuthContext';
import { styles } from '../../app.styles';
import QuestionStack from './QuestionStack';
import PunishmentStack from './PunishmentStack';
import MainPageStack from './MainPageStack';

const Stack = createBottomTabNavigator();

function HomeStack() {
  const { logout } = UseAuthContext();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="MainPageStack"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          switch (route.name) {
            case 'MainPageStack':
              icon = focused ? (
                <Ionicons name="home" size={24} color="red" />
              ) : (
                <Ionicons name="home-outline" size={24} color="black" />
              );
              break;
            case 'QuestionStack':
              icon = focused ? (
                <AntDesign name="questioncircle" size={24} color="red" />
              ) : (
                <AntDesign name="questioncircleo" size={24} color="black" />
              );
              break;
            case 'PunishmentStack':
              icon = focused ? (
                <AntDesign name="pushpin" size={24} color="red" />
              ) : (
                <AntDesign name="pushpino" size={24} color="black" />
              );
              break;
          }

          return icon;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Stack.Screen
        name="MainPageStack"
        component={MainPageStack}
        options={{
          title: i18n.t('header.home'),
        }}
      />
      <Stack.Screen
        name="QuestionStack"
        component={QuestionStack}
        options={{ title: i18n.t('header.questions') }}
      />
      <Stack.Screen
        name="PunishmentStack"
        component={PunishmentStack}
        options={{ title: i18n.t('header.punishments') }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return <HomeStack />;
};
