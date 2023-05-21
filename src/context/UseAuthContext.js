import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const UseAuthContext = () => {
  return useContext(AuthContext);
};

export default UseAuthContext;
