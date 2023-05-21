import { SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import UsePunishmentContext from '../../../context/UsePunishmentContext';
import CustomInput from '../../../components/CustomElements/CustomInput';
import { useForm } from 'react-hook-form';
import i18n from '../../../../i18n';
import CustomText from '../../../components/CustomElements/CustomText';
import CustomButton from '../../../components/CustomElements/CustomButton';
import { styles } from '../../../../app.styles';

const AddPunishment = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const { addPunishment } = UsePunishmentContext();

  const onAddPress = async (data) => {
    try {
      await addPunishment(data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomText
        viewStyleName={'Middle'}
        textValue={i18n.t('custom_text.create_punishment_content')}
        textStyleName={'boldText'}
      />
      <CustomInput
        control={control}
        name="punishment"
        rules={{
          required: i18n.t('error.punishment.required'),
        }}
        placeholder={i18n.t('placeholder.punishment')}
      />
      <CustomButton
        onPress={handleSubmit(onAddPress)}
        value={i18n.t('button.add')}
      />
    </SafeAreaView>
  );
};

export default AddPunishment;
