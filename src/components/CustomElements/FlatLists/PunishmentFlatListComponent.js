import React, { useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import Flag from "react-native-flags";
import { styles } from "../../../../app.styles";

const PunishmentFlatListComponent = ({
  punishments,
  onCheckedPunishments,
  extraData,
}) => {
  const [checkedPunishments, setCheckedPunishments] = useState([]);

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
      <View style={[{ maxWidth: "80%" }]}>
        <Text style={styles.flatListMainText}>
          {index + 1}. {item.punishment}
        </Text>
        <Flag code={item.language} size={32} />
      </View>
    </View>
  );

  useEffect(() => {
    onCheckedPunishments(checkedPunishments);
  }, [checkedPunishments, onCheckedPunishments]);

  return (
    <FlatList
      style={styles.flatListMain}
      data={punishments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      extraDat={extraData}
    />
  );
};

export default PunishmentFlatListComponent;
