import { ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../app.styles';
import Logo from '../components/logo';
import CustomButton from '../components/CustomElements/CustomButton';
import CustomInput from '../components/CustomElements/CustomInput';
import CustomText from '../components/CustomElements/CustomText';
import CustomTextNavigate from '../components/CustomElements/CustomTextNavigate';
import i18n from '../../i18n';
import TermsAndPrivacy from '../components/CustomElements/TermsAndPrivacy';
import { useForm } from 'react-hook-form';
import UseAuthContext from '../context/UseAuthContext';

const Signup = ({ navigation }) => {
  const { signup } = UseAuthContext();
  const [error, setError] = useState('');
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('password');

  const onSignupPress = async (data) => {
    try {
      await signup(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Logo />
        <CustomText
          viewStyleName="Middle"
          textStyleName="boldText"
          textValue={i18n.t('custom_text.create_account')}
        />

        <CustomTextNavigate
          viewStyleName="text"
          textDescription={i18n.t('custom_text.already_have_an_account')}
          routeName="Login"
          textStyleName="signupText"
          linkvalue={i18n.t('button.login')}
        />

        <CustomInput
          control={control}
          name="name"
          rules={{
            required: i18n.t('error.name.required'),
            // minLength: { value: 3, message: i18n.t("error.name.min") },
            // maxLength: { value: 24, message: i18n.t("error.name.max") },
          }}
          placeholder={i18n.t('placeholder.name')}
          icon={<FontAwesome name="user" size={20} />}
          maxLength={25}
        />

        <CustomInput
          control={control}
          name="username"
          rules={{
            required: i18n.t('error.username.required'),
            // minLength: { value: 3, message: i18n.t("error.username.min") },
            // maxLength: { value: 38, message: i18n.t("error.username.max") },
          }}
          placeholder={i18n.t('placeholder.username')}
          icon={<FontAwesome name="user-secret" size={20} />}
          maxLength={39}
        />

        <CustomInput
          control={control}
          name="email"
          rules={{
            required: i18n.t('error.email.required'),
            // pattern: {
            //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            //   message: i18n.t("error.email.pattern"),
            // },
          }}
          placeholder={i18n.t('placeholder.email')}
          icon={<MaterialCommunityIcons name="email" size={20} />}
        />

        <CustomInput
          control={control}
          name="password"
          placeholder={i18n.t('placeholder.password')}
          rules={{
            required: i18n.t('error.password.required'),
            // minLength: { value: 8, message: i18n.t("error.password.min") },
            // maxLength: { value: 32, message: i18n.t("error.password.max") },
            // pattern: {
            //   value:
            //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
            //   message: i18n.t("error.password.pattern"),
            // },
          }}
          icon={<MaterialCommunityIcons name="key" size={20} />}
          security={true}
        />

        <CustomInput
          control={control}
          name="password_confirmation"
          rules={{
            validate: (value) =>
              value === pwd || i18n.t('error.password.confirm'),
          }}
          placeholder={i18n.t('placeholder.password_confirmation')}
          icon={<MaterialCommunityIcons name="key-change" size={20} />}
          security={true}
        />

        {error ? (
          <CustomText
            viewStyleName="Middle"
            textStyleName="errorText"
            textValue={error}
          />
        ) : null}

        <CustomButton
          onPress={handleSubmit(onSignupPress)}
          value={i18n.t('button.register')}
        />

        <TermsAndPrivacy />
      </ScrollView>
    </SafeAreaView>
  );
};

export default () => {
  return <Signup />;
};
