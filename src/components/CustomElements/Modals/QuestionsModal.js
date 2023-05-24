import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { styles } from "../../../../app.styles";
import CustomButton from "../CustomButton";
import UseRoomContext from "../../../context/UseRoomContext";
import i18n from "../../../../i18n";
import QuestionFlatListComponent from "../FlatLists/QuestionFlatListComponent";

const QuestionsModal = ({ isVisible, onCloseModal }) => {
  const { getQuestionsNotInRoom } = UseRoomContext();
  const [questions, setQuestions] = useState();
  const [checkedQuestions, setCheckedQuestions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  const onAddQuestionsPress = async () => {
    try {
      onCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const getQuestions = async () => {
    try {
      const response = await getQuestionsNotInRoom();
      setQuestions(response.data.questions);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCheckedQuestions = (checkedQuestions) => {
    setCheckedQuestions(checkedQuestions);
  };

  useEffect(() => {
    getQuestions();

    if (checkedQuestions.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [checkedQuestions]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCloseModal}
      animationInTiming={2000}
      animationOutTiming={2000}
      backdropTransitionInTiming={2000}
      backdropTransitionOutTiming={2000}
    >
      <View style={styles.modalContent}>
        <Text style={styles.boldText}>
          {i18n.t("custom_text.choose_questions")}
        </Text>
        <QuestionFlatListComponent
          questions={questions}
          onCheckedQuestions={handleCheckedQuestions}
        />
        <View style={{ flexDirection: "row" }}>
          <CustomButton value={i18n.t("button.close")} onPress={onCloseModal} />
          <CustomButton
            value={i18n.t("button.add")}
            onPress={onAddQuestionsPress}
            disabled={disabled}
          />
        </View>
      </View>
    </Modal>
  );
};

export default QuestionsModal;
