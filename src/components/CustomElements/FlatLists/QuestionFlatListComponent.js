import React, { useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import Flag from "react-native-flags";
import { styles } from "../../../../app.styles";
import i18n from "../../../../i18n";

const QuestionFlatListComponent = ({ questions, onCheckedQuestions }) => {
  const [checkedQuestions, setCheckedQuestions] = useState([]);

  const handleCheckboxToggle = (itemId) => {
    if (checkedQuestions.includes(itemId)) {
      setCheckedQuestions(checkedQuestions.filter((item) => item !== itemId));
    } else {
      setCheckedQuestions([...checkedQuestions, itemId]);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.checkBoxContainer}>
      <Checkbox.Item
        label={item.label}
        status={checkedQuestions.includes(item.id) ? "checked" : "unchecked"}
        onPress={() => handleCheckboxToggle(item.id)}
      />
      <View>
        <Text style={styles.flatListMainText}>
          {index + 1}. {item.question}
        </Text>
        <Text style={styles.flatListSecondaryText}>
          <Text style={styles.flatListMainText}>
            {i18n.t("placeholder.answer")}:
          </Text>
          {item.answer}
        </Text>
        <Flag code={item.language} size={32} />
      </View>
    </View>
  );

  useEffect(() => {
    onCheckedQuestions(checkedQuestions);
  }, [checkedQuestions, onCheckedQuestions]);

  return (
    <FlatList
      style={styles.flatListMain}
      data={questions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default QuestionFlatListComponent;
