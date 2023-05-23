import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from '../../i18n';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import QuestionStack from './QuestionStack';
import PunishmentStack from './PunishmentStack';
import MainPageStack from './MainPageStack';

const Stack = createBottomTabNavigator();

function HomeStack() {
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
