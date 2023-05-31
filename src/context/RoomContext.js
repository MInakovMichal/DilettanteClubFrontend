import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UseAuthContext from "./UseAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RoomContext = React.createContext();

export const API_BASE_URL = "http://192.168.100.91/api/rooms";
export const ROOM_KEY = "room";
export const AUTHOR_KEY = "room_author_id";

const RoomProvider = ({ children }) => {
  const { user, userToken, setInRoom } = UseAuthContext();
  const [loading, setLoading] = useState(true);
  const [roomAuthorId, setRoomAuthorId] = useState(null);

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
        setInRoom(true);

        navigation.navigate("Room");
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
      const response = await fetch(`${API_BASE_URL}/details`, {
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
        await AsyncStorage.setItem(
          AUTHOR_KEY,
          JSON.stringify(data.data.user_id)
        );
        setRoomAuthorId(data.data.user_id);

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

  const getQuestionsInRoom = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions-in-room`, {
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

  const getPunishmentsInRoom = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/punishments-in-room`, {
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

  const getUsersInRoom = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users-in-room`, {
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
    const questions = data;
    try {
      const response = await fetch(`${API_BASE_URL}/delete-questions`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          questions: questions,
        }),
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

  const deletePunishmentsFromRoom = async (data) => {
    const punishments = data;
    try {
      const response = await fetch(`${API_BASE_URL}/delete-punishments`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          punishments: punishments,
        }),
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

  const addQuestionsToRoom = async (data) => {
    const questions = data;
    try {
      const response = await fetch(`${API_BASE_URL}/add-questions`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          questions: questions,
        }),
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

  const addPunishmentsToRoom = async (data) => {
    const punishments = data;
    try {
      const response = await fetch(`${API_BASE_URL}/add-punishments`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          punishments: punishments,
        }),
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

  const getQuestionsNotInRoom = async () => {
    // return {
    //   data: {
    //     questions: [
    //       {
    //         id: 2,
    //         question:
    //           "testnametestname testname testname testname testname testname",
    //         answer: 1,
    //       },
    //       { id: 3, question: "testname", answer: 4 },
    //       { id: 4, question: "testname", answer: 2 },
    //       { id: 5, question: "testname", answer: 7 },
    //       { id: 6, question: "testname", answer: 85 },
    //       { id: 7, question: "testname", answer: 52 },
    //       { id: 8, question: "testname", answer: 8974 },
    //       { id: 9, question: "testname", answer: 157 },
    //       { id: 10, question: "testname", answer: 158 },
    //       { id: 1, question: "Test", answer: 9885 },
    //     ],
    //   },
    // };

    // console.log("getQuestionsNotInRoom");
    try {
      const response = await fetch(
        `${API_BASE_URL}/user-questions-not-in-room`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
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

  const getPunishmentsNotInRoom = async () => {
    // return {
    //   data: {
    //     punishments: [
    //       {
    //         id: 2,
    //         punishment:
    //           'testnametestname testname testname testname testname testname',
    //       },
    //       { id: 3, punishment: 'testname' },
    //       { id: 4, punishment: 'testname' },
    //       { id: 5, punishment: 'testname' },
    //       { id: 6, punishment: 'testname' },
    //       { id: 7, punishment: 'testname' },
    //       { id: 8, punishment: 'testname' },
    //       { id: 9, punishment: 'testname' },
    //       { id: 10, punishment: 'testname' },
    //       { id: 1, punishment: 'Test' },
    //     ],
    //   },
    // };

    try {
      const response = await fetch(
        `${API_BASE_URL}/user-punishments-not-in-room`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
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

  return (
    <RoomContext.Provider
      value={{
        getAllPublicRooms,
        createRoom,
        roomDetails,
        deleteUsersFromRoom,
        deleteQuestionsFromRoom,
        deletePunishmentsFromRoom,
        getQuestionsNotInRoom,
        getPunishmentsNotInRoom,
        addQuestionsToRoom,
        addPunishmentsToRoom,
        getQuestionsInRoom,
        getPunishmentsInRoom,
        getUsersInRoom,
        roomAuthorId,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
