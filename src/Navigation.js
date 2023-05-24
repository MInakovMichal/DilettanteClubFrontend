import React from "react";
import AuthStack from "./stack/AuthStack";
import HomeStack from "./stack/HomeStack";
import UseAuthContext from "./context/UseAuthContext";

const Navigation = () => {
  const { userToken } = UseAuthContext();

  return <>{userToken == null ? <HomeStack /> : <HomeStack />}</>;
};

export default Navigation;
