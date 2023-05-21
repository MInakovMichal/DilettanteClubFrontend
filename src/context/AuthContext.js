import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import { QuestionProvider } from './QuestionContext';

const AuthContext = React.createContext();

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user_id';
export const API_BASE_URL = 'http://192.168.100.91/api/auth';
// export const API_BASE_URL = 'http://172.19.0.6/api/auth';
export const keys = [TOKEN_KEY, USER_KEY];

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

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
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.data.id));
        setUser(data.data.id);
        setUserToken(data.data.token);
        await AsyncStorage.setItem(TOKEN_KEY, data.data.token);
        setLoading(false);
      } else {
        // handle error response
        setLoading(false);
        throw new Error(data.message);
      }
    } catch (error) {
      // handle any other errors
      console.error(error);
      setLoading(false);
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

      // check if response was successful
      if (response.ok) {
        setLoading(false);
        navigation.navigate('Login');
      } else {
        // handle error response
        setLoading(false);
        throw new Error(data.message);
      }
    } catch (error) {
      // handle any other errors
      console.error(error);
      setLoading(false);
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
      // Remove the user data and token from AsyncStorage
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(TOKEN_KEY);
      setUser(null);
      setUserToken();
    } catch (error) {
      console.error(error);
      throw new Error('An unexpected error occurred');
    }
  };

  return (
    // <QuestionProvider user={user}>
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        forgotPassword,
        resetPassword,
        userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
    // </QuestionProvider>
  );
};

export { AuthContext, AuthProvider };
