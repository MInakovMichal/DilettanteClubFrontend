import { SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import UseRoomContext from '../../../context/UseRoomContext';
import CustomInput from '../../../components/CustomElements/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import i18n from '../../../../i18n';
import CustomText from '../../../components/CustomElements/CustomText';
import CustomButton from '../../../components/CustomElements/CustomButton';
import { styles } from '../../../../app.styles';
import CustomSelect from '../../../components/CustomElements/CustomSelect';
import SelectDropdown from 'react-native-select-dropdown';

const AddRoom = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const { createRoom } = UseRoomContext();

  const onAddPress = async (data) => {
    try {
      await createRoom(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const options = [i18n.t('custom_text.yes'), i18n.t('custom_text.no')];

  return (
    <SafeAreaView style={styles.container}>
      <CustomText
        viewStyleName={'Middle'}
        textValue={i18n.t('custom_text.create_room_content')}
        textStyleName={'boldText'}
      />

      <CustomInput
        control={control}
        name="name"
        rules={{
          required: i18n.t('error.room_name.required'),
        }}
        placeholder={i18n.t('placeholder.room_name')}
      />

      <CustomSelect
        control={control}
        rules={{
          required: i18n.t('error.select.required'),
        }}
        name="is_public"
        options={options}
        placeholder={i18n.t('placeholder.is_public')}
      />

      <CustomButton
        onPress={handleSubmit(onAddPress)}
        value={i18n.t('button.add')}
      />
    </SafeAreaView>
  );
};

export default AddRoom;
