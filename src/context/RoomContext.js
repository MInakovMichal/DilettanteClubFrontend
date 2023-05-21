import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import UseAuthContext from './UseAuthContext';

const RoomContext = React.createContext();

export const API_BASE_URL = 'http://192.168.100.91/api/rooms';

const RoomProvider = ({ children }) => {
  const { user, userToken } = UseAuthContext();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const getAllPublicRooms = async (user_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/public`, {
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

  const createRoom = async (data) => {
    console.log(data);
    // let question = data.question;
    // let answer = data.answer;
    // let language_id = 1;
    // try {
    //   const response = await fetch(`${API_BASE_URL}/create`, {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${userToken}`,
    //     },
    //     body: JSON.stringify({
    //       question: question,
    //       answer: answer,
    //       language_id: language_id,
    //     }),
    //   });
    //   const data = await response.json();

    //   // check if response was successful
    //   if (response.ok) {
    //     navigation.navigate('Questions');
    //   } else {
    //     throw new Error(data.message);
    //   }
    // } catch (error) {
    //   // handle any other errors
    //   console.error(error);
    //   setLoading(false);
    //   throw new Error('An unexpected error occurred');
    // }
  };

  return (
    <RoomContext.Provider
      value={{
        getAllPublicRooms,
        createRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
