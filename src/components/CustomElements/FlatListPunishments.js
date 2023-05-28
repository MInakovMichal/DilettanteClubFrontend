import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import i18n from '../../../i18n';
import UseRoomContext from '../../context/UseRoomContext';
import CustomText from './CustomText';
import { Feather } from '@expo/vector-icons';
import PunishmentFlatListComponent from './FlatLists/PunishmentFlatListComponent';
import { useNavigation } from '@react-navigation/native';

const FlatListPunishments = ({ punishments }) => {
  const [checkedPunishments, setCheckedPunishments] = useState([]);
  const { deletePunishmentsFromRoom } = UseRoomContext();
  const [disabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCheckedPunishments = (allCheckedPunishments) => {
    setCheckedPunishments(allCheckedPunishments);
  };

  const onAddPunishmentsPress = async (data) => {
    try {
      navigation.navigate('AddPunishmentsToRoom');
    } catch (error) {
      setError(error.message);
    }
  };

  const onDeletePunishmentsFromRoomPress = async () => {
    try {
      await deletePunishmentsFromRoom(checkedPunishments);
      navigation.navigate('MainPageStack');
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
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
          textValue={i18n.t('custom_text.your_punishments')}
          textStyleName={'boldText'}
          icon={
            <View style={{ marginTop: 10 }}>
              <Feather
                name={isVisible ? 'chevron-up' : 'chevron-down'}
                size={24}
              />
            </View>
          }
        />
      </TouchableOpacity>

      {isVisible &&
        (punishments.length ? (
          <View>
            <PunishmentFlatListComponent
              punishments={punishments}
              onCheckedPunishments={handleCheckedPunishments}
            />
            <CustomButton
              value={i18n.t('button.delete_punishments_from_room')}
              onPress={onDeletePunishmentsFromRoomPress}
              disabled={disabled}
            />
            <CustomButton
              value={i18n.t('button.add_punishments')}
              onPress={onAddPunishmentsPress}
            />
          </View>
        ) : (
          <View>
            <CustomText
              textStyleName="text"
              textValue={i18n.t('custom_text.no_one_punishment_in_room')}
            />
            <CustomButton
              value={i18n.t('button.add_punishments')}
              onPress={onAddPunishmentsPress}
            />
          </View>
        ))}
    </View>
  );
};

export default FlatListPunishments;
