import { SafeAreaView, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../../../../app.styles';
import i18n from '../../../../i18n';
import QuestionFlatListComponent from '../../../components/CustomElements/FlatLists/QuestionFlatListComponent';
import { useIsFocused } from '@react-navigation/native';
import UseRoomContext from '../../../context/UseRoomContext';
import CustomText from '../../../components/CustomElements/CustomText';
import CustomButton from '../../../components/CustomElements/CustomButton';
import { useNavigation } from '@react-navigation/native';

const AddQuestionsToRoom = () => {
  const isFocused = useIsFocused();
  const { getQuestionsNotInRoom, addQuestionsToRoom } = UseRoomContext();
  const [questions, setQuestions] = useState();
  const [checkedQuestions, setCheckedQuestions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const getQuestions = async () => {
    try {
      const response = await getQuestionsNotInRoom();
      setQuestions(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const onAddQuestionsPress = async () => {
    try {
      const response = await addQuestionsToRoom(checkedQuestions);
      navigation.navigate('Room');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCheckedQuestions = (checkedQuestions) => {
    setCheckedQuestions(checkedQuestions);
  };

  useEffect(() => {
    if (isFocused) {
      getQuestions();
      if (checkedQuestions.length === 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [isFocused, checkedQuestions]);

  return (
    <SafeAreaView style={styles.modalContent}>
      <Text style={styles.boldText}>
        {i18n.t('custom_text.choose_questions')}
      </Text>
      {questions && questions.length ? (
        <View>
          <QuestionFlatListComponent
            questions={questions}
            onCheckedQuestions={handleCheckedQuestions}
          />
          <CustomButton
            value={i18n.t('button.add')}
            onPress={onAddQuestionsPress}
            disabled={disabled}
          />
        </View>
      ) : (
        <View>
          <CustomText
            textStyleName="text"
            textValue={i18n.t('custom_text.no_one_question')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddQuestionsToRoom;
