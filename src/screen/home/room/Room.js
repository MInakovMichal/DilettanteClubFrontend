import { SafeAreaView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import UseRoomContext from "../../../context/UseRoomContext";
import i18n from "../../../../i18n";
import CustomText from "../../../components/CustomElements/CustomText";
import { styles } from "../../../../app.styles";
import CustomButton from "../../../components/CustomElements/CustomButton";
import { useIsFocused } from "@react-navigation/native";
import Flag from "react-native-flags";
import FlatListUsers from "../../../components/CustomElements/FlatListUsers";
import FlatListQuestions from "../../../components/CustomElements/FlatListQuestions";
import FlatListPunishments from "../../../components/CustomElements/FlatListPunishments";

const Room = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [error, setError] = useState("");
  const { roomDetails } = UseRoomContext();

  const [room, setRoom] = useState();
  const [questions, setQuestions] = useState();
  const [punishments, setPunishments] = useState();
  const [users, setUsers] = useState();

  const getRoomDetails = async () => {
    try {
      const response = await roomDetails();
      setRoom(response.data.room);
      setQuestions(response.data.questions);
      setPunishments(response.data.punishments);
      setUsers(response.data.users);
    } catch (error) {
      setError(error.message);
    }
  };

  const onAddQuestionsPress = async (data) => {
    try {
    } catch (error) {
      setError(error.message);
    }
  };

  const onAddPunishmentsPress = async (data) => {
    try {
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getRoomDetails();
    }
  }, [isFocused]);

  return (
    <SafeAreaView>
      <CustomText
        textValue={i18n.t("custom_text.players_in_room")}
        textStyleName={"boldText"}
      />
      {users ? (
        <FlatListUsers users={users} />
      ) : (
        <CustomText
          textStyleName="text"
          textValue={i18n.t("custom_text.no_one_player_in_room")}
        />
      )}
      <CustomText
        textValue={i18n.t("custom_text.your_questions")}
        textStyleName={"boldText"}
      />
      {questions ? (
        <FlatListQuestions data={questions} />
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
        </View>
      )}
      <CustomText
        textValue={i18n.t("custom_text.your_punishments")}
        textStyleName={"boldText"}
      />
      {punishments ? (
        <FlatListPunishments data={punishments} />
      ) : (
        <View>
          <CustomText
            textStyleName="text"
            textValue={i18n.t("custom_text.no_one_punishment_in_room")}
          />
          <CustomButton
            value={i18n.t("button.add_punishments")}
            onPress={onAddPunishmentsPress}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Room;
