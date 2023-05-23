import { SafeAreaView, FlatList, View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import UseRoomContext from '../../../context/UseRoomContext';
import i18n from '../../../../i18n';
import CustomText from '../../../components/CustomElements/CustomText';
import { styles } from '../../../../app.styles';
import CustomButton from '../../../components/CustomElements/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import Flag from 'react-native-flags';

const Room = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [error, setError] = useState('');
  const { roomDetails } = UseRoomContext();

  const [details, setDetails] = useState();
  const [room, setRoom] = useState();
  const [questions, setQuestions] = useState();
  const [punishments, setPunishments] = useState();
  const [users, setUsers] = useState();

  const getRoomDetails = async () => {
    try {
      const response = await roomDetails();
      setDetails(response.data);
      setRoom(response.data.room);
      setQuestions(response.data.questions);
      setPunishments(response.data.punishments);
      setUsers(response.data.users);
    } catch (error) {
      setError(error.message);
    }
  };

  const onAddQuestionsPress = async (data) => {
    try {
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getRoomDetails();
    }
  }, [isFocused]);

  const onAddPunishmentsPress = async (data) => {
    try {
    } catch (error) {
      setError(error.message);
    }
  };

  const renderUsers = ({ item, index }) => (
    <View style={styles.flatListItemContainer}>
      <Text style={styles.flatListMainText}>
        {index + 1}. {item.name} <Flag code={item.language} size={32} />
      </Text>
    </View>
  );

  const renderQuestions = ({ item, index }) => (
    <View style={styles.flatListItemContainer}>
      <Text style={styles.flatListMainText}>
        {index + 1}. {item.question}
      </Text>
      <Text style={styles.flatListSecondaryText}>
        {i18n.t('placeholder.answer')}:{item.answer}
      </Text>
      <Flag code={item.language} size={32} />
    </View>
  );

  const renderPunishments = ({ item, index }) => (
    <View style={styles.flatListItemContainer}>
      <Text style={styles.flatListMainText}>
        {index + 1}. {item.punishment}
      </Text>
      <Flag code={item.language} size={32} />
    </View>
  );

  return (
    <SafeAreaView>
      <CustomText
        textValue={i18n.t('custom_text.players_in_room')}
        textStyleName={'boldText'}
      />
      {users ? (
        <FlatList
          style={[styles.flatListMain]}
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUsers}
        />
      ) : (
        <CustomText
          textStyleName="text"
          textValue={i18n.t('custom_text.no_one_player_in_room')}
        />
      )}
      <CustomText
        textValue={i18n.t('custom_text.your_questions')}
        textStyleName={'boldText'}
      />
      {questions ? (
        <FlatList
          style={styles.flatListMain}
          data={questions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderQuestions}
        />
      ) : (
        <View>
          <CustomText
            textStyleName="text"
            textValue={i18n.t('custom_text.no_one_question_in_room')}
          />
          <CustomButton
            value={i18n.t('button.add_questions')}
            onPress={onAddQuestionsPress}
          />
        </View>
      )}
      <CustomText
        textValue={i18n.t('custom_text.your_punishments')}
        textStyleName={'boldText'}
      />
      {punishments ? (
        <FlatList
          style={styles.flatListMain}
          data={punishments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPunishments}
        />
      ) : (
        <View>
          <CustomText
            textStyleName="text"
            textValue={i18n.t('custom_text.no_one_punishment_in_room')}
          />
          <CustomButton
            value={i18n.t('button.add_punishments')}
            onPress={onAddPunishmentsPress}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Room;
