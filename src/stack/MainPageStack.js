import React from 'react';
import i18n from '../../i18n';
import PublicRooms from '../screen/home/room/PublicRooms';
import { RoomProvider } from '../context/RoomContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomLogoutButton from '../components/CustomElements/CustomLogoutButton';
import AddRoom from '../screen/home/room/AddRoom';

const Stack = createNativeStackNavigator();

function MainPageStack() {
  return (
    <RoomProvider>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => <CustomLogoutButton />,
          unmountOnBlur: true,
        }}
      >
        <Stack.Screen
          name="PublicRooms"
          component={PublicRooms}
          options={{ title: i18n.t('header.public_rooms') }}
        />
        <Stack.Screen
          name="AddRoom"
          component={AddRoom}
          options={{ title: i18n.t('header.add_room') }}
        />
      </Stack.Navigator>
    </RoomProvider>
  );
}

export default () => {
  return <MainPageStack />;
};
