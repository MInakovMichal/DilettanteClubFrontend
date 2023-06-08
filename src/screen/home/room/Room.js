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

  const getRoomDetails = async () => {
    try {
      const response = await roomDetails();
      setRoom(response.data);
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

  const renderChildFlatList = ({ item }) => {
    if (item.type === 'users') {
      return <FlatListUsers />;
    } else if (item.type === 'questions') {
      return <FlatListQuestions />;
    } else if (item.type === 'punishments') {
      return <FlatListPunishments />;
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
