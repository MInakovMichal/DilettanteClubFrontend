import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../../app.styles";
import Flag from "react-native-flags";
import CustomButton from "./CustomButton";
import i18n from "../../../i18n";
import UseRoomContext from "../../context/UseRoomContext";
import { Feather } from "@expo/vector-icons";
import CustomText from "./CustomText";
import UseAuthContext from "../../context/UseAuthContext";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const FlatListUsers = () => {
  const [checkedUsers, setCheckedUsers] = useState([]);
  const { deleteUsersFromRoom, getUsersInRoom, roomAuthorId } =
    UseRoomContext();
  const { user } = UseAuthContext();
  const [disabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [users, setUsers] = useState();
  const [refreshFlag, setRefreshFlag] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCheckboxToggle = (itemId) => {
    if (checkedUsers.includes(itemId)) {
      setCheckedUsers(checkedUsers.filter((item) => item !== itemId));
    } else {
      setCheckedUsers([...checkedUsers, itemId]);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.checkBoxContainer}>
      {item.id !== roomAuthorId ? (
        <BouncyCheckbox
          isChecked={checkedQuestions.includes(item.id)}
          text={
            <Text style={styles.flatListMainText}>
              {item.username} <Flag code={item.language} size={32} />
            </Text>
          }
          onPress={() => handleCheckboxToggle(item.id)}
        />
      ) : (
        <Text style={styles.flatListMainText}>
          {item.username} <Flag code={item.language} size={32} />
        </Text>
      )}
    </View>
  );

  const onDeleteUsersFromRoomPress = async () => {
    try {
      await deleteUsersFromRoom(checkedUsers);
      refreshData();
    } catch (error) {
      setError(error.message);
    }
  };

  const getUsers = async () => {
    try {
      const response = await getUsersInRoom();
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const refreshData = () => {
    getUsers();
    setRefreshFlag(!refreshFlag);
  };

  useEffect(() => {
    getUsers();
    if (checkedUsers.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [checkedUsers]);

  return (
    <View>
      <TouchableOpacity onPress={toggleVisibility}>
        <CustomText
          textValue={i18n.t("custom_text.players_in_room")}
          textStyleName={"boldText"}
          icon={
            <View style={{ marginTop: 10 }}>
              <Feather
                name={isVisible ? "chevron-up" : "chevron-down"}
                size={24}
              />
            </View>
          }
        />
      </TouchableOpacity>

      {isVisible &&
        (users ? (
          <View>
            <FlatList
              style={styles.flatListMain}
              data={users}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              extraData={refreshFlag}
            />
            {user === roomAuthorId ? (
              <CustomButton
                value={i18n.t("button.delete_users_from_room")}
                onPress={onDeleteUsersFromRoomPress}
                disabled={disabled}
              />
            ) : (
              <></>
            )}
          </View>
        ) : (
          <CustomText
            textStyleName="text"
            textValue={i18n.t("custom_text.no_one_player_in_room")}
          />
        ))}
    </View>
  );
};

export default FlatListUsers;
