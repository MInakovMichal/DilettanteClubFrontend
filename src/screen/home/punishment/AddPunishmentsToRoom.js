import { SafeAreaView, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../../../../app.styles';
import i18n from '../../../../i18n';
import PunishmentFlatListComponent from '../../../components/CustomElements/FlatLists/PunishmentFlatListComponent';
import { useIsFocused } from '@react-navigation/native';
import UseRoomContext from '../../../context/UseRoomContext';
import CustomText from '../../../components/CustomElements/CustomText';
import CustomButton from '../../../components/CustomElements/CustomButton';
import { useNavigation } from '@react-navigation/native';

const AddPunishmentsToRoom = () => {
  const isFocused = useIsFocused();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { getPunishmentsNotInRoom, addPunishmentsToRoom } = UseRoomContext();
  const [punishments, setPunishments] = useState();
  const [checkedPunishments, setCheckedPunishments] = useState([]);

  const onAddPunishmentsPress = async () => {
    try {
      const response = await addPunishmentsToRoom(checkedPunishments);
      navigation.navigate('Room');
    } catch (error) {
      setError(error.message);
    }
  };

  const getPunishments = async () => {
    try {
      const response = await getPunishmentsNotInRoom();
      setPunishments(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCheckedPunishments = (allCheckedPunishments) => {
    setCheckedPunishments(allCheckedPunishments);
  };

  useEffect(() => {
    if (isFocused) {
      getPunishments();

      if (checkedPunishments.length === 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [isFocused, checkedPunishments]);

  return (
    <SafeAreaView style={styles.modalContent}>
      <Text style={styles.boldText}>
        {i18n.t('custom_text.choose_punishments')}
      </Text>
      {punishments && punishments.length ? (
        <View>
          <PunishmentFlatListComponent
            punishments={punishments}
            onCheckedPunishments={handleCheckedPunishments}
          />
          <CustomButton
            value={i18n.t('button.add')}
            onPress={onAddPunishmentsPress}
            disabled={disabled}
          />
        </View>
      ) : (
        <View>
          <CustomText
            textStyleName="text"
            textValue={i18n.t('custom_text.no_one_punishment')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddPunishmentsToRoom;
