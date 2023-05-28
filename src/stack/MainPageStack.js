import React from 'react';
import { RoomProvider } from '../context/RoomContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotInRoomStack from './NotInRoomStack';
import InRoomStack from './InRoomStack';
import UseAuthContext from '../context/UseAuthContext';
import { Loading } from '../components/Loading';

const Stack = createNativeStackNavigator();

function MainPageStack() {
  const { inRoomLoading, checkRoom, inRoom } = UseAuthContext();

  checkRoom();

  if (inRoomLoading) {
    return <Loading />;
  }

  return <>{!inRoom ? <NotInRoomStack /> : <InRoomStack />}</>;
}

export default () => {
  return (
    <RoomProvider>
      <MainPageStack />
    </RoomProvider>
  );
};
