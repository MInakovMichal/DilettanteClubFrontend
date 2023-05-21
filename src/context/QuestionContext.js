import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import UseAuthContext from './UseAuthContext';

const QuestionContext = React.createContext();

export const API_BASE_URL = 'http://192.168.100.91/api/questions';

const QuestionProvider = ({ children }) => {
  const { user, userToken } = UseAuthContext();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const getAllQuestions = async (user_id) => {
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

  const addQuestion = async (data) => {
    let question = data.question;
    let answer = data.answer;
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
          question: question,
          answer: answer,
          language_id: language_id,
        }),
      });
      const data = await response.json();

      // check if response was successful
      if (response.ok) {
        navigation.navigate('Questions');
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
    <QuestionContext.Provider
      value={{
        getAllQuestions,
        addQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionProvider };
