import React from 'react';
import i18n from '../../i18n';
import PublicRooms from '../screen/home/room/PublicRooms';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomLogoutButton from '../components/CustomElements/CustomLogoutButton';
import AddRoom from '../screen/home/room/AddRoom';
import UseRoomContext from '../context/UseRoomContext';

const Stack = createNativeStackNavigator();

function NotInRoomStack() {
  const { room } = UseRoomContext();

  return (
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
  );
}

export default () => {
  return <NotInRoomStack />;
};
