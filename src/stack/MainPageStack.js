import React from 'react';
import { RoomProvider } from '../context/RoomContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotInRoomStack from './NotInRoomStack';
import InRoomStack from './InRoomStack';
import UseAuthContext from '../context/UseAuthContext';

const Stack = createNativeStackNavigator();

function MainPageStack() {
  const { room } = UseAuthContext();
  return <>{room == null ? <NotInRoomStack /> : <InRoomStack />}</>;
}

export default () => {
  return (
    <RoomProvider>
      <MainPageStack />
    </RoomProvider>
  );
};
