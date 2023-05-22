import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UseAuthContext from "./UseAuthContext";

const RoomContext = React.createContext();

export const API_BASE_URL = "http://192.168.100.91/api/rooms";
export const ROOM_KEY = "room";

const RoomProvider = ({ children }) => {
  const { user, userToken } = UseAuthContext();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);

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
    data.language_id = 1;

    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(data),
      });
      const data = await response.json();

      // check if response was successful
      if (response.ok) {
        await AsyncStorage.setItem(ROOM_KEY, JSON.stringify(data.data.room.id));
        setRoom(data.data.room.id);

        navigation.navigate("MainPageStack");
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
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      // Add more users as needed
    ];

    const questions = [
      { id: 1, question: "What is your favorite color?" },
      { id: 2, question: "How old are you?" },
      // Add more questions as needed
    ];

    const punishments = [
      { id: 1, name: "Timeout" },
      { id: 2, name: "Grounding" },
      // Add more punishments as needed
    ];
    return {
      data: {
        users: users,
        questions: questions,
        punishments: punishments,
      },
    }; // try {
    //   const response = await fetch(`${API_BASE_URL}/details?room=` + room, {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
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
    //   throw new Error("An unexpected error occurred");
    // }
  };

  return (
    <RoomContext.Provider
      value={{
        room,
        getAllPublicRooms,
        createRoom,
        roomDetails,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
