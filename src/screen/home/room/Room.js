import { SafeAreaView, FlatList, View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import UseRoomContext from "../../../context/UseRoomContext";
import i18n from "../../../../i18n";
import CustomText from "../../../components/CustomElements/CustomText";
import { styles } from "../../../../app.styles";
import CustomButton from "../../../components/CustomElements/CustomButton";
import { useIsFocused } from "@react-navigation/native";
import Flag from "react-native-flags";

const Room = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [error, setError] = useState("");
  const { roomDetails } = UseRoomContext();

  const [details, setDetails] = useState();

  const getRoomDetails = async () => {
    try {
      const response = await roomDetails();
      setDetails(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const onAddQuestionsPress = async (data) => {
    console.log("aq");
    try {
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getRoomDetails();
      console.log(details);
    }
  }, [isFocused]);

  const onAddPunishmentsPress = async (data) => {
    console.log("ap");
    try {
    } catch (error) {
      setError(error.message);
    }
  };

  const renderUsers = ({ item, index }) => (
    <View style={styles.flatListItemContainer}>
      <Text style={styles.flatListMainText}>
        {index + 1}. {item.name}
      </Text>
      <Flag code={item.language} size={32} />
    </View>
  );

  const renderQuestions = ({ item, index }) => (
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

  const renderPunishments = ({ item, index }) => (
    <View style={styles.flatListItemContainer}>
      <Text style={styles.flatListMainText}>
        {index + 1}. {item.punishment}
      </Text>
      <Flag code={item.language} size={32} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={[details?.users]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <CustomText
              textValue={i18n.t("custom_text.players_in_room")}
              textStyleName={"boldText"}
            />
            {item && item.length > 0 ? (
              <FlatList
                style={styles.flatListMain}
                data={item}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderUsers}
              />
            ) : (
              <CustomText
                textStyleName="text"
                textValue={i18n.t("custom_text.no_one_player_in_room")}
              />
            )}
          </View>
        )}
      /> */}
      {/* <ScrollView>
        <CustomText
          textValue={i18n.t("custom_text.players_in_room")}
          textStyleName={"boldText"}
        />
        {details && details.users ? (
          <FlatList
            style={styles.flatListMain}
            data={details.users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUsers}
          />
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
        {details && details.questions ? (
          <FlatList
            style={styles.flatListMain}
            data={details.questions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderQuestions}
          />
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
        {details && details.punishments ? (
          <FlatList
            style={styles.flatListMain}
            data={details.punishments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPunishments}
          />
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
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default Room;
