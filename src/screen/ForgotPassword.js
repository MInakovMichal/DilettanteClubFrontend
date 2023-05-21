import { SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../../app.styles';
import Logo from '../components/logo';
import CustomButton from '../components/CustomElements/CustomButton';
import CustomInput from '../components/CustomElements/CustomInput';
import CustomTextNavigate from '../components/CustomElements/CustomTextNavigate';
import CustomText from '../components/CustomElements/CustomText';
import i18n from '../../i18n';
import { useForm } from 'react-hook-form';
import UseAuthContext from '../context/UseAuthContext';

const ForgotPassword = ({ navigation }) => {
  const { forgotPassword } = UseAuthContext();
  const [error, setError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSendLinkPress = async (email) => {
    try {
      await forgotPassword(email);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <CustomText
        viewStyleName=""
        textStyleName="text"
        textvalue={i18n.t('custom_text.forgot_password_description')}
      />

      <CustomInput
        control={control}
        name="email"
        rules={{
          required: i18n.t('error.email.required'),
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: i18n.t('error.email.pattern'),
          },
        }}
        placeholder={i18n.t('placeholder.email')}
        icon={<FontAwesome name="user" size={20} />}
      />

      {error ? (
        <CustomText
          viewStyleName="Middle"
          textStyleName="errorText"
          textValue={error}
        />
      ) : null}

      <CustomButton
        onPress={handleSubmit(onSendLinkPress)}
        value={i18n.t('button.send_reset_link')}
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

export default ForgotPassword;
