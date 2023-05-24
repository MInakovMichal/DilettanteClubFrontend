import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UseAuthContext from "./UseAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RoomContext = React.createContext();

export const API_BASE_URL = "http://192.168.100.91/api/rooms";
export const ROOM_KEY = "room";

const RoomProvider = ({ children }) => {
  const { user, userToken, setRoom, room } = UseAuthContext();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const getAllPublicRooms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/public`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
      throw new Error("An unexpected error occurred");
    }
  };

  const createRoom = async (data) => {
    const name = data.name;
    const is_private = data.is_private;
    const language_id = 1;
    const password = data.password;
    const password_confirmation = data.password_confirmation;

    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          name: name,
          is_private: is_private,
          language_id: language_id,
          password_confirmation: password_confirmation,
          password: password,
        }),
      });
      const data = await response.json();

      // check if response was successful
      if (response.ok) {
        await AsyncStorage.setItem(ROOM_KEY, JSON.stringify(data.data.room.id));
        setRoom(data.data.room.id);

        // navigation.navigate('Room');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      // handle any other errors
      console.error(error);
      setLoading(false);
      throw new Error("An unexpected error occurred");
    }
  };

  const roomDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/details?room_id=` + room, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
      throw new Error("An unexpected error occurred");
    }
  };

  const deleteUsersFromRoom = async (data) => {
    console.log(data);
    // try {
    //   const response = await fetch(`${API_BASE_URL}/details?room_id=` + room, {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${userToken}`,
    //     },
    //   });
    //   const data = await response.json();
    //   // check if response was successful
    //   if (response.ok) {
    //     return data;
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
  const deleteQuestionsFromRoom = async (data) => {
    console.log(data);
    // try {
    //   const response = await fetch(`${API_BASE_URL}/details?room_id=` + room, {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${userToken}`,
    //     },
    //   });
    //   const data = await response.json();
    //   // check if response was successful
    //   if (response.ok) {
    //     return data;
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

  const deletePunishmentsFromRoom = async (data) => {
    console.log(data);
    // try {
    //   const response = await fetch(`${API_BASE_URL}/details?room_id=` + room, {
    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${userToken}`,
    //     },
    //   });
    //   const data = await response.json();
    //   // check if response was successful
    //   if (response.ok) {
    //     return data;
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
        roomDetails,
        deleteUsersFromRoom,
        deleteQuestionsFromRoom,
        deletePunishmentsFromRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
