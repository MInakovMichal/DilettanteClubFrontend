import { SafeAreaView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import UseRoomContext from '../../../context/UseRoomContext';
import { styles } from '../../../../app.styles';
import { useIsFocused } from '@react-navigation/native';
import FlatListUsers from '../../../components/CustomElements/FlatListUsers';
import FlatListQuestions from '../../../components/CustomElements/FlatListQuestions';
import FlatListPunishments from '../../../components/CustomElements/FlatListPunishments';

const Room = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [error, setError] = useState('');
  const { roomDetails } = UseRoomContext();

  const [room, setRoom] = useState();
  const [questions, setQuestions] = useState();
  const [punishments, setPunishments] = useState();
  const [users, setUsers] = useState();

  const getRoomDetails = async () => {
    try {
      const response = await roomDetails();
      setRoom(response.data.room);
      setQuestions(response.data.questions);
      setPunishments(response.data.punishments);
      setUsers(response.data.users);
    } catch (error) {
      setError(error.message);
    }
  };

  const data = [
    {
      type: 'users',
    },
    {
      type: 'questions',
    },
    {
      type: 'punishments',
    },
  ];

  const questionsTestArray = [
    {
      id: 2,
      question: 'testnametestname testname testname testname testname testname',
      answer: 1,
    },
    { id: 3, question: 'testname', answer: 4 },
    { id: 4, question: 'testname', answer: 2 },
    { id: 5, question: 'testname', answer: 7 },
    { id: 6, question: 'testname', answer: 85 },
    { id: 7, question: 'testname', answer: 52 },
    { id: 8, question: 'testname', answer: 8974 },
    { id: 9, question: 'testname', answer: 157 },
    { id: 10, question: 'testname', answer: 158 },
    { id: 1, question: 'Test', answer: 9885 },
  ];

  const renderChildFlatList = ({ item }) => {
    if (item.type === 'users') {
      return <FlatListUsers users={users} />;
    } else if (item.type === 'questions') {
      return <FlatListQuestions questions={questions} />;
    } else if (item.type === 'punishments') {
      return <FlatListPunishments punishments={punishments} />;
    }
  };
  useEffect(() => {
    if (isFocused) {
      getRoomDetails();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderChildFlatList}
        keyExtractor={(item) => item.type}
      />
    </SafeAreaView>
  );
};

export default Room;
