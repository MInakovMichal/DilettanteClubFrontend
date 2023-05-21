import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../../../app.styles';
import { useNavigation } from '@react-navigation/native';

const CustomTextNavigate = ({
  viewStyleName,
  textDescription,
  routeName,
  textStyleName,
  linkvalue,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles[viewStyleName]}>
      <Text>{textDescription}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <Text style={styles[textStyleName]}>{linkvalue}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTextNavigate;
