import React, { useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Flag from "react-native-flags";
import { styles } from "../../../../app.styles";
import i18n from "../../../../i18n";

const QuestionFlatListComponent = ({
  questions,
  onCheckedQuestions,
  extraData,
}) => {
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
      <BouncyCheckbox
        isChecked={checkedQuestions.includes(item.id)}
        text={
          <View style={{ maxWidth: "80%" }}>
            <Text style={styles.flatListMainText}>
              {index + 1}. {item.question}
            </Text>
            <Text style={styles.flatListSecondaryText}>
              <Text style={styles.flatListMainText}>
                {i18n.t("placeholder.answer")}:
              </Text>
              {" " + item.answer}
            </Text>
            <Flag code={item.language} size={32} />
          </View>
        }
        onPress={() => handleCheckboxToggle(item.id)}
      />
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
      extraDat={extraData}
    />
  );
};

export default QuestionFlatListComponent;
