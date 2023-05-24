import { View, Button, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "../../../app.styles";

const CustomButton = ({
  onPress,
  value,
  type = "PRIMARY",
  disabled = false,
}) => {
  return (
    <View style={styles.buttonViewStyle}>
      <TouchableOpacity
        style={[styles[type + "_ButtonContainer"](disabled)]}
        onPress={onPress}
        title={value}
        disabled={disabled}
      >
        <Text style={styles[type + "_ButtonText"]}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
