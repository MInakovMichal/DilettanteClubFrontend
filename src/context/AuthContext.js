import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import { QuestionProvider } from './QuestionContext';

const AuthContext = React.createContext();

export const ROOM_KEY = 'in_room';
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user_id';
export const API_BASE_URL = 'http://192.168.100.91/api/auth';

const AuthProvider = ({ children }) => {
  const [inRoomLoading, setInRoomLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [inRoom, setInRoom] = useState(false);
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    loadStorageData();
  }, []);

  async function checkRoom() {
    try {
      const inRoom = await AsyncStorage.getItem(ROOM_KEY);

      if (inRoom) {
        setInRoom(JSON.parse(inRoom));
      }
    } catch (error) {
    } finally {
      setInRoomLoading(false);
    }
  }
  async function loadStorageData() {
    try {
      const userId = await AsyncStorage.getItem(USER_KEY);
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const inRoom = await AsyncStorage.getItem(ROOM_KEY);

      if (userId) {
        setUser(userId);
      }
      if (token) {
        setUserToken(token);
      }
      if (inRoom) {
        setInRoom(JSON.parse(inRoom));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const login = async (data) => {
    let email = data.email;
    let password = data.password;

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          device_token: 'device_token',
        }),
      });
      const data = await response.json();
      // check if response was successful
      if (response.ok) {
        // save user data and token to async storage
        setUser(data.data.id);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.data.id));
        setUserToken(data.data.token);
        await AsyncStorage.setItem(TOKEN_KEY, data.data.token);
        const inRoom = data.data.in_room;
        setInRoom(inRoom);
        await AsyncStorage.setItem(ROOM_KEY, inRoom.toString());
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error('An unexpected error occurred');
    }
  };

  const signup = async (data) => {
    let email = data.email;
    let name = data.name;
    let password_confirmation = data.password_confirmation;
    let username = data.username;
    let password = data.password;

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          name: name,
          password: password,
          password_confirmation: password_confirmation,
          language_id: 1,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Login');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error('An unexpected error occurred');
    }
  };

  const forgotPassword = async (email) => {
    navigation.navigate('ResetPassword');
    // try {
    //   const response = await fetch(`${API_BASE_URL}/login`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   });
    //   const data = await response.json();

    //   // check if response was successful
    //   if (response.ok) {
    //     // save user data and token to async storage
    //     await AsyncStorage.setItem("USER_KEY", JSON.stringify(data));
    //     setUser(data.user);
    //     setUserToken(data.token);
    //     await AsyncStorage.setItem(TOKEN_KEY, data.token);
    //     setLoading(false);
    //     navigation.navigate("Signup");
    //   } else {
    //     // handle error response
    //     setLoading(false);
    //     throw new Error(data.message);
    //   }
    // } catch (error) {
    //   // handle any other errors
    //   console.error(error);
    //   setLoading(false);
    //   throw new Error("An unexpected error occurred");
    // }
  };

  const resetPassword = async (email) => {
    navigation.navigate('Login');
    // try {
    //   const response = await fetch(`${API_BASE_URL}/login`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   });
    //   const data = await response.json();

    //   // check if response was successful
    //   if (response.ok) {
    //     // save user data and token to async storage
    //     await AsyncStorage.setItem("USER_KEY", JSON.stringify(data));
    //     setUser(data.user);
    //     setUserToken(data.token);
    //     await AsyncStorage.setItem(TOKEN_KEY, data.token);
    //     setLoading(false);
    //     navigation.navigate("Signup");
    //   } else {
    //     // handle error response
    //     setLoading(false);
    //     throw new Error(data.message);
    //   }
    // } catch (error) {
    //   // handle any other errors
    //   console.error(error);
    //   setLoading(false);
    //   throw new Error("An unexpected error occurred");
    // }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      setUser(null);
      setUserToken(null);
      setInRoom(false);

      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(ROOM_KEY);
    } catch (error) {
      console.error(error);
      throw new Error('An unexpected error occurred');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        inRoomLoading,
        inRoom,
        userToken,
        setInRoom,
        login,
        logout,
        signup,
        forgotPassword,
        resetPassword,
        checkRoom,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
