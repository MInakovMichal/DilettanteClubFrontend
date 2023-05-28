import React from 'react';
import i18n from '../../i18n';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomLogoutButton from '../components/CustomElements/CustomLogoutButton';
import Room from '../screen/home/room/Room';
import AddQuestionsToRoom from '../screen/home/question/AddQuestionsToRoom';
import AddPunishmentsToRoom from '../screen/home/punishment/AddPunishmentsToRoom';

const Stack = createNativeStackNavigator();

function InRoomStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <CustomLogoutButton />,
        unmountOnBlur: true,
      }}
    >
      <Stack.Screen
        name="Room"
        component={Room}
        options={{ title: i18n.t('header.room') }}
      />
      <Stack.Screen
        name="AddQuestionsToRoom"
        component={AddQuestionsToRoom}
        options={{ title: i18n.t('header.addQuestionsToRoom') }}
      />
      <Stack.Screen
        name="AddPunishmentsToRoom"
        component={AddPunishmentsToRoom}
        options={{ title: i18n.t('header.addQuestionsToRoom') }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return <InRoomStack />;
};
