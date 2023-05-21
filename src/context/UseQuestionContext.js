import { useContext } from 'react';
import { QuestionContext } from './QuestionContext';

const UseQuestionContext = () => {
  return useContext(QuestionContext);
};

export default UseQuestionContext;
