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

const FlatListPunishments = ({ punishments }) => {
  const [checkedPunishments, setCheckedPunishments] = useState([]);
  const { deletePunishmentsFromRoom } = UseRoomContext();
  const [disabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCheckboxToggle = (itemId) => {
    if (checkedPunishments.includes(itemId)) {
      setCheckedPunishments(
        checkedPunishments.filter((item) => item !== itemId)
      );
    } else {
      setCheckedPunishments([...checkedPunishments, itemId]);
    }
  };
  const renderItem = ({ item, index }) => (
    <View style={styles.checkBoxContainer}>
      <Checkbox.Item
        label={item.label}
        status={checkedPunishments.includes(item.id) ? "checked" : "unchecked"}
        onPress={() => handleCheckboxToggle(item.id)}
      />
      <Text style={styles.flatListMainText}>
        {index + 1}. {item.punishment}
      </Text>
      <Flag code={item.language} size={32} />
    </View>
  );

  const onAddPunishmentsPress = async (data) => {
    try {
    } catch (error) {
      setError(error.message);
    }
  };

  const onDeletePunishmentsFromRoomPress = async () => {
    try {
      await deletePunishmentsFromRoom(checkedPunishments);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Check if checkedPunishments is empty
    if (checkedPunishments.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [checkedPunishments]);

  return (
    <View>
      <TouchableOpacity onPress={toggleVisibility}>
        <CustomText
          textValue={i18n.t("custom_text.your_punishments")}
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
        (punishments ? (
          <View>
            <FlatList
              style={styles.flatListMain}
              data={punishments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
            <CustomButton
              value={i18n.t("button.delete_punishments_from_room")}
              onPress={onDeletePunishmentsFromRoomPress}
              disabled={disabled}
            />
          </View>
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
        ))}
    </View>
  );

  return (
    <>
      <FlatList
        style={styles.flatListMain}
        data={punishments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <CustomButton
        value={i18n.t("button.delete_punishments_from_room")}
        onPress={onDeletePunishmentsFromRoomPress}
        disabled={disabled}
      />
    </>
  );
};

export default FlatListPunishments;
