import { SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import UseQuestionContext from '../../../context/UseQuestionContext';
import CustomInput from '../../../components/CustomElements/CustomInput';
import { useForm } from 'react-hook-form';
import i18n from '../../../../i18n';
import CustomText from '../../../components/CustomElements/CustomText';
import CustomButton from '../../../components/CustomElements/CustomButton';
import { styles } from '../../../../app.styles';

const AddQuestion = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const { addQuestion } = UseQuestionContext();

  const onAddPress = async (data) => {
    try {
      await addQuestion(data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomText
        viewStyleName={'Middle'}
        textValue={i18n.t('custom_text.create_question_content')}
        textStyleName={'boldText'}
      />
      <CustomInput
        control={control}
        name="question"
        rules={{
          required: i18n.t('error.question.required'),
        }}
        placeholder={i18n.t('placeholder.question')}
      />
      <CustomInput
        control={control}
        name="answer"
        rules={{
          required: i18n.t('error.answer.required'),
          pattern: {
            value: /^[0-9]*$/,
            message: i18n.t('error.answer.pattern'),
          },
        }}
        placeholder={i18n.t('placeholder.answer')}
        keyboardType={'numeric'}
      />

      <CustomButton
        onPress={handleSubmit(onAddPress)}
        value={i18n.t('button.add')}
      />
    </SafeAreaView>
  );
};

export default AddQuestion;
