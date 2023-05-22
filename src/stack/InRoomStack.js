import React from "react";
import i18n from "../../i18n";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomLogoutButton from "../components/CustomElements/CustomLogoutButton";
import Room from "../screen/home/room/Room";

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
        options={{ title: i18n.t("header.room") }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return <InRoomStack />;
};
