import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import { styles } from "../../../app.styles";
import Flag from "react-native-flags";
import CustomButton from "./CustomButton";
import i18n from "../../../i18n";
import UseRoomContext from "../../context/UseRoomContext";
import CustomText from "./CustomText";
import { Feather } from "@expo/vector-icons";
import QuestionsModal from "./Modals/QuestionsModal";

const FlatListQuestions = ({ questions }) => {
  const [checkedQuestions, setCheckedQuestions] = useState([]);
  const { deleteQuestionsFromRoom } = UseRoomContext();
  const [disabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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
      <Text style={styles.flatListMainText}>
        {index + 1}. {item.question}
      </Text>
      <Text style={styles.flatListSecondaryText}>
        {i18n.t("placeholder.answer")}:{item.answer}
      </Text>
      <Flag code={item.language} size={32} />
    </View>
  );

  const onAddQuestionsPress = async (data) => {
    try {
      toggleModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const onDeleteQuestionsFromRoomPress = async () => {
    try {
      await deleteQuestionsFromRoom(checkedQuestions);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Check if checkedQuestions is empty
    if (checkedQuestions.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [checkedQuestions]);

  return (
    <View>
      <TouchableOpacity onPress={toggleVisibility}>
        <CustomText
          textValue={i18n.t("custom_text.your_questions")}
          textStyleName={"boldText"}
          icon={
            <Feather
              name={isVisible ? "chevron-up" : "chevron-down"}
              size={24}
            />
          }
        />
      </TouchableOpacity>

      {isVisible &&
        (questions ? (
          <View>
            <FlatList
              style={styles.flatListMain}
              data={questions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
            <CustomButton
              value={i18n.t("button.delete_questions_from_room")}
              onPress={onDeleteQuestionsFromRoomPress}
              disabled={disabled}
            />
          </View>
        ) : (
          <View>
            <CustomText
              textStyleName="text"
              textValue={i18n.t("custom_text.no_one_question_in_room")}
            />
            <CustomButton
              value={i18n.t("button.add_questions")}
              onPress={onAddQuestionsPress}
            />
            <QuestionsModal
              isVisible={isModalVisible}
              onCloseModal={closeModal}
            />
          </View>
        ))}
    </View>
  );
};

export default FlatListQuestions;
