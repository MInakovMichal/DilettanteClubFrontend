import React, { useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import { styles } from "../../../app.styles";
import Flag from "react-native-flags";
import CustomButton from "./CustomButton";
import i18n from "../../../i18n";
import UseRoomContext from "../../context/UseRoomContext";

const FlatListPunishments = ({ punishments }) => {
  const [checkedPunishments, setCheckedPunishments] = useState([]);
  const { deletePunishmentsFromRoom } = UseRoomContext();
  const [disabled, setDisabled] = useState(true);

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
