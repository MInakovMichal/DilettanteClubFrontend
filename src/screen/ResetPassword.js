import { SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../app.styles';
import Logo from '../components/logo';
import CustomButton from '../components/CustomElements/CustomButton';
import CustomInput from '../components/CustomElements/CustomInput';
import CustomTextNavigate from '../components/CustomElements/CustomTextNavigate';
import CustomText from '../components/CustomElements/CustomText';
import i18n from '../../i18n';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import UseAuthContext from '../context/UseAuthContext';

const ResetPassword = ({ navigation }) => {
  const { resetPassword } = UseAuthContext();
  const [error, setError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onResetPasswordPress = async (data) => {
    try {
      await resetPassword(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <CustomText
        viewStyleName="Middle"
        textStyleName="boldText"
        textvalue={i18n.t('custom_text.check_email')}
      />

      <CustomText
        viewStyleName=""
        textStyleName="text"
        textvalue={i18n.t('custom_text.enter_reset_code')}
      />

      <CustomInput
        control={control}
        name="resetCode"
        rules={{
          required: i18n.t('error.reset_code.required'),
          minLength: { value: 8, message: i18n.t('error.reset_code.min') },
          maxLength: { value: 32, message: i18n.t('error.reset_code.max') },
        }}
        placeholder={i18n.t('placeholder.reset_code')}
        icon={<Ionicons name="text" color="black" size={20} />}
        maxLength={32}
      />

      <CustomInput
        control={control}
        name="password"
        rules={{
          required: i18n.t('error.password.required'),
          minLength: { value: 8, message: i18n.t('error.password.min') },
          maxLength: { value: 32, message: i18n.t('error.password.max') },
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
            message: i18n.t('error.password.pattern'),
          },
        }}
        placeholder={i18n.t('placeholder.password')}
        icon={<MaterialCommunityIcons name="key" size={20} />}
        security={true}
        maxLength={32}
      />

      {error ? (
        <CustomText
          viewStyleName="Middle"
          textStyleName="errorText"
          textValue={error}
        />
      ) : null}

      <CustomButton
        onPress={handleSubmit(onResetPasswordPress)}
        value={i18n.t('button.reset')}
      />

      <CustomTextNavigate
        viewStyleName="Middle"
        routeName="Login"
        textStyleName="TERTIARY_ButtonContainer"
        linkvalue={i18n.t('custom_text.back_to_login')}
      />
    </SafeAreaView>
  );
};

export default () => {
  return <ResetPassword />;
};
