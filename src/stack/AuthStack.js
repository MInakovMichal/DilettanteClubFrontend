import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Signup from '../screen/Signup';
import ForgotPassword from '../screen/ForgotPassword';
import ResetPassword from '../screen/ResetPassword';
import i18n from '../../i18n';
import Login from '../screen/Login';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: i18n.t('header.login') }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: i18n.t('header.forgot_password') }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: i18n.t('header.forgot_password') }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: i18n.t('header.registration') }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return <AuthStack />;
};
