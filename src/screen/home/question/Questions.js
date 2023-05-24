import { SafeAreaView, FlatList, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../../../../app.styles";
import UseAuthContext from "../../../context/UseAuthContext";
import UseQuestionContext from "../../../context/UseQuestionContext";
import CustomButton from "../../../components/CustomElements/CustomButton";
import i18n from "../../../../i18n";
import Flag from "react-native-flags";
import { useIsFocused } from "@react-navigation/native";

const Questions = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { getAllQuestions } = UseQuestionContext();
  const { user } = UseAuthContext();
  const [error, setError] = useState("");

  const [questions, setQuestions] = useState("");

  const allQuestions = async (data) => {
    try {
      const response = await getAllQuestions(user);
      setQuestions(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const onAddQuestionPress = async (data) => {
    navigation.navigate("AddQuestion");
  };

  useEffect(() => {
    if (isFocused) {
      allQuestions();
    }
  }, [isFocused]);

  const renderItem = ({ item, index }) => (
    <View style={styles.flatListItemContainer}>
      <Text style={styles.flatListMainText}>
        {index + 1}. {item.question}
      </Text>
      <Text style={styles.flatListSecondaryText}>
        {i18n.t("placeholder.answer")}:{item.answer}
      </Text>
      <Flag code={item.language} size={32} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        onPress={onAddQuestionPress}
        value={i18n.t("button.add_question")}
      />
      <FlatList
        style={styles.flatListMain}
        data={questions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Questions;
