import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";
import i18n from "../../../i18n";
import UseRoomContext from "../../context/UseRoomContext";
import CustomText from "./CustomText";
import { Feather } from "@expo/vector-icons";
import QuestionsModal from "./Modals/QuestionsModal";
import QuestionFlatListComponent from "./FlatLists/QuestionFlatListComponent";

const FlatListQuestions = ({ questions }) => {
  const [checkedQuestions, setCheckedQuestions] = useState([]);
  const { deleteQuestionsFromRoom } = UseRoomContext();
  const [disabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCheckedQuestions = (checkedQuestions) => {
    setCheckedQuestions(checkedQuestions);
  };

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
            <QuestionFlatListComponent
              questions={questions}
              onCheckedQuestions={handleCheckedQuestions}
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
