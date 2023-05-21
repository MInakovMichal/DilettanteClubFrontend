import React from 'react';
import AuthStack from './stack/AuthStack';
import HomeStack from './stack/HomeStack';
import UseAuthContext from './context/UseAuthContext';
import LoadingIndicator from './components/CustomElements/LoadingIndicator';

const Navigation = () => {
  const { userToken, loading, getAuthState } = UseAuthContext();

  // if (loading) {
  //   return (
  // <LoadingIndicator />
  //   );
  // }

  return <>{userToken == null ? <AuthStack /> : <HomeStack />}</>;
};

export default Navigation;
