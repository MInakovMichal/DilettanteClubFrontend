import { SafeAreaView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import UseRoomContext from "../../../context/UseRoomContext";
import { styles } from "../../../../app.styles";
import { useIsFocused } from "@react-navigation/native";
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

  const data = [
    {
      type: "users",
    },
    {
      type: "questions",
    },
    {
      type: "punishments",
    },
  ];

  const renderChildFlatList = ({ item }) => {
    if (item.type === "users") {
      return <FlatListUsers users={users} />;
    } else if (item.type === "questions") {
      return <FlatListQuestions questions={questions} />;
    } else if (item.type === "punishments") {
      return <FlatListPunishments punishments={punishments} />;
    }
  };
  useEffect(() => {
    if (isFocused) {
      getRoomDetails();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderChildFlatList}
        keyExtractor={(item) => item.type}
      />
    </SafeAreaView>
  );
};

export default Room;
