import { View, Text } from "react-native";
import React from "react";
import { styles } from "../../../app.styles";

const CustomText = ({
  viewStyleName,
  textStyleName,
  textValue,
  icon = null,
}) => {
  return (
    <View style={styles[viewStyleName]}>
      <Text style={styles[textStyleName]}>
        {textValue}
        {icon ?? icon}
      </Text>
    </View>
  );
};

export default CustomText;
