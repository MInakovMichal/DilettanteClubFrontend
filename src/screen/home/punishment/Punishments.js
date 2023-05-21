import { SafeAreaView, FlatList, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../../../../app.styles';
import UseAuthContext from '../../../context/UseAuthContext';
import CustomButton from '../../../components/CustomElements/CustomButton';
import i18n from '../../../../i18n';
import Flag from 'react-native-flags';
import { useIsFocused } from '@react-navigation/native';
import UsePunishmentContext from '../../../context/UsePunishmentContext';

const Punishments = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { getAllPunishments } = UsePunishmentContext();
  const { user } = UseAuthContext();
  const [error, setError] = useState('');

  const [punishments, setPunishments] = useState('');

  const allPunishments = async (data) => {
    try {
      const response = await getAllPunishments(user);
      setPunishments(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const onAddPunishmentPress = async (data) => {
    navigation.navigate('AddPunishment');
  };

  useEffect(() => {
    if (isFocused) {
      allPunishments();
    }
  }, [isFocused]);

  const renderItem = ({ item, index }) => (
    <View style={styles.flatListItemContainer}>
      <Text style={styles.flatListMainText}>
        {index + 1}. {item.punishment}
      </Text>
      <Flag code={item.language} size={32} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        onPress={onAddPunishmentPress}
        value={i18n.t('button.add_punishment')}
        type="PRIMARY"
      />
      <FlatList
        style={styles.flatListMain}
        data={punishments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Punishments;
