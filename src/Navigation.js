import React from 'react';
import AuthStack from './stack/AuthStack';
import HomeStack from './stack/HomeStack';
import UseAuthContext from './context/UseAuthContext';
import { Loading } from './components/Loading';

const Navigation = () => {
  const { userToken, loading } = UseAuthContext();

  if (loading) {
    return <Loading />;
  }

  return <>{userToken == null ? <AuthStack /> : <HomeStack />}</>;
};

export default Navigation;
