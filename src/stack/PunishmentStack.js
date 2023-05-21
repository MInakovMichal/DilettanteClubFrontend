import React from 'react';
import i18n from '../../i18n';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomLogoutButton from '../components/CustomElements/CustomLogoutButton';
import { PunishmentProvider } from '../context/PunishmentContext';
import AddPunishment from '../screen/home/punishment/AddPunishment';
import Punishments from '../screen/home/punishment/Punishments';

const Stack = createNativeStackNavigator();

function PunishmentStack() {
  return (
    <PunishmentProvider>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => <CustomLogoutButton />,
        }}
      >
        <Stack.Screen
          name="Punishments"
          component={Punishments}
          options={{ title: i18n.t('header.punishments') }}
        />
        <Stack.Screen
          name="AddPunishment"
          component={AddPunishment}
          options={{ title: i18n.t('header.add_punishment') }}
        />
      </Stack.Navigator>
    </PunishmentProvider>
  );
}

export default () => {
  return <PunishmentStack />;
};
