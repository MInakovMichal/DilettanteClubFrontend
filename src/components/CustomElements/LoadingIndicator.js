import React from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { styles } from "../../../app.styles";

const LoadingIndicator = () => {
  return (
    <SafeAreaView styles={styles.indicatorView}>
      <ActivityIndicator size="large" color="#000000" />
    </SafeAreaView>
  );
};

export default LoadingIndicator;
