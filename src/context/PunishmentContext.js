import React, { useState } from 'react';
import UseAuthContext from './UseAuthContext';
import { useNavigation } from '@react-navigation/native';

const PunishmentContext = React.createContext();
export const API_BASE_URL = 'http://192.168.100.91/api/punishments';

const PunishmentProvider = ({ children }) => {
  const { user, userToken } = UseAuthContext();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const getAllPunishments = async (user_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}?user=${user_id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      // check if response was successful
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      // handle any other errors
      console.error(error);
      setLoading(false);
      throw new Error('An unexpected error occurred');
    }
  };

  const addPunishment = async (data) => {
    let punishment = data.punishment;
    let language_id = 1;
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          punishment: punishment,
          language_id: language_id,
        }),
      });
      const data = await response.json();

      // check if response was successful
      if (response.ok) {
        navigation.navigate('Punishments');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      // handle any other errors
      console.error(error);
      setLoading(false);
      throw new Error('An unexpected error occurred');
    }
  };
  return (
    <PunishmentContext.Provider
      value={{
        getAllPunishments,
        addPunishment,
      }}
    >
      {children}
    </PunishmentContext.Provider>
  );
};

export { PunishmentContext, PunishmentProvider };
