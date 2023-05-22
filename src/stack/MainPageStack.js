import React from "react";
import { RoomProvider } from "../context/RoomContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UseRoomContext from "../context/UseRoomContext";
import NotInRoomStack from "./NotInRoomStack";
import InRoomStack from "./InRoomStack";

const Stack = createNativeStackNavigator();

function MainPageStack() {
  const { room } = UseRoomContext();

  return <>{room == null ? <InRoomStack /> : <InRoomStack />}</>;
}

export default () => {
  return (
    <RoomProvider>
      <MainPageStack />
    </RoomProvider>
  );
};
