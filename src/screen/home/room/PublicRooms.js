import { SafeAreaView, FlatList, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../../../../app.styles';
import UseRoomContext from '../../../context/UseRoomContext';
import CustomButton from '../../../components/CustomElements/CustomButton';
import i18n from '../../../../i18n';
import Flag from 'react-native-flags';
import { useIsFocused } from '@react-navigation/native';

const PublicRooms = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { getAllPublicRooms } = UseRoomContext();
  const [error, setError] = useState('');

  const [rooms, setRooms] = useState('');

  const allPublicRoom = async (data) => {
    try {
      const response = await getAllPublicRooms();
      setRooms(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const onAddRoomPress = async (data) => {
    navigation.navigate('AddRoom');
  };

  useEffect(() => {
    if (isFocused) {
      allPublicRoom();
    }
  }, [isFocused]);

  const renderItem = ({ item, index }) => (
    <View style={styles.flatListItemContainer}>
      <Text style={styles.flatListMainText}>
        {index + 1}. {item.name}
      </Text>
      <Flag code={item.language} size={32} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        onPress={onAddRoomPress}
        value={i18n.t('button.add_room')}
      />
      <FlatList
        style={styles.flatListMain}
        data={rooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default PublicRooms;
