import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import { styles } from "../../../app.styles";
import Flag from "react-native-flags";
import CustomButton from "./CustomButton";
import i18n from "../../../i18n";
import UseRoomContext from "../../context/UseRoomContext";
import { Feather } from "@expo/vector-icons";
import CustomText from "./CustomText";

const FlatListUsers = ({ users }) => {
  const [checkedUsers, setCheckedUsers] = useState([]);
  const { deleteUsersFromRoom } = UseRoomContext();
  const [disabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

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
      <Checkbox.Item
        label={item.label}
        status={checkedUsers.includes(item.id) ? "checked" : "unchecked"}
        onPress={() => handleCheckboxToggle(item.id)}
      />
      <Text style={styles.flatListMainText}>
        {item.username} <Flag code={item.language} size={32} />
      </Text>
    </View>
  );

  const onDeleteUsersFromRoomPress = async () => {
    try {
      await deleteUsersFromRoom(checkedUsers);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Check if checkedUsers is empty
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
            <Feather
              name={isVisible ? "chevron-up" : "chevron-down"}
              size={24}
            />
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
            />
            <CustomButton
              value={i18n.t("button.delete_users_from_room")}
              onPress={onDeleteUsersFromRoomPress}
              disabled={disabled}
            />
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
