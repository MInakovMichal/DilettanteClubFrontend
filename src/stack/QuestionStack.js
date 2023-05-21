import React from 'react';
import i18n from '../../i18n';
import Questions from '../screen/home/question/Questions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomLogoutButton from '../components/CustomElements/CustomLogoutButton';
import { QuestionProvider } from '../context/QuestionContext';
import AddQuestion from '../screen/home/question/AddQuestion';

const Stack = createNativeStackNavigator();

function QuestionStack() {
  return (
    <QuestionProvider>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => <CustomLogoutButton />,
        }}
      >
        <Stack.Screen
          name="Questions"
          component={Questions}
          options={{ title: i18n.t('header.questions') }}
        />
        <Stack.Screen
          name="AddQuestion"
          component={AddQuestion}
          options={{ title: i18n.t('header.add_question') }}
        />
      </Stack.Navigator>
    </QuestionProvider>
  );
}

export default () => {
  return <QuestionStack />;
};
