import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../app.styles';
import Logo from '../components/logo';
import CustomButton from '../components/CustomElements/CustomButton';
import CustomInput from '../components/CustomElements/CustomInput';
import CustomTextNavigate from '../components/CustomElements/CustomTextNavigate';
import i18n from '../../i18n';
import UseAuthContext from '../context/UseAuthContext';
import CustomText from '../components/CustomElements/CustomText';

const Login = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const { login } = UseAuthContext();

  const onLoginPress = async (data) => {
    try {
      await login(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <CustomTextNavigate
        viewStyleName="text"
        textDescription={i18n.t('custom_text.do_not_have_an_account')}
        routeName="Signup"
        textStyleName="signupText"
        linkvalue={i18n.t('button.register')}
      />

      <CustomInput
        control={control}
        name="email"
        rules={{
          required: i18n.t('error.email.required'),
          // pattern: {
          //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
          //   message: i18n.t('error.email.pattern'),
          // },
        }}
        placeholder={i18n.t('placeholder.email')}
        icon={<FontAwesome name="user" size={20} />}
      />

      <CustomInput
        control={control}
        name="password"
        rules={{
          required: i18n.t('error.password.required'),
          // minLength: { value: 8, message: i18n.t('error.password.min') },
          // maxLength: { value: 32, message: i18n.t('error.password.max') },
          // pattern: {
          //   value:
          //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
          //   message: i18n.t('error.password.pattern'),
          // },
        }}
        placeholder={i18n.t('placeholder.password')}
        icon={<MaterialCommunityIcons name="key" size={20} />}
        maxLength={32}
        isPassword={true}
      />
      {error ? (
        <CustomText
          viewStyleName="Middle"
          textStyleName="errorText"
          textValue={error}
        />
      ) : null}

      <CustomButton
        onPress={handleSubmit(onLoginPress)}
        value={i18n.t('button.login')}
      />

      <CustomTextNavigate
        viewStyleName="Middle"
        routeName="ForgotPassword"
        textStyleName="TERTIARY_ButtonContainer"
        linkvalue={i18n.t('button.forgot_password')}
      />
    </SafeAreaView>
  );
};

export default Login;
