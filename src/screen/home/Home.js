import React from "react";
import { styles } from "../../../app.styles";
import CustomText from "../../components/CustomElements/CustomText";
import Logo from "../../components/logo";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <CustomText viewStyleName={"Middle"} textValue={"Home"} />
    </SafeAreaView>
  );
};

export default Home;
