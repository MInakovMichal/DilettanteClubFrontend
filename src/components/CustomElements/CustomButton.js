import { View, Button, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { styles } from '../../../app.styles';

const CustomButton = ({ onPress, value, type = 'PRIMARY' }) => {
  return (
    <View style={styles.buttonViewStyle}>
      <TouchableOpacity
        style={styles[type + '_ButtonContainer']}
        onPress={onPress}
        title={value}
      >
        <Text style={styles[type + '_ButtonText']}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
