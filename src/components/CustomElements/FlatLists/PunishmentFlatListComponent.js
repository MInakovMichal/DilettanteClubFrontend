import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Flag from 'react-native-flags';
import { styles } from '../../../../app.styles';

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
      <BouncyCheckbox
        isChecked={checkedPunishments.includes(item.id)}
        text={
          <View style={[{ maxWidth: '80%' }]}>
            <Text style={styles.flatListMainText}>
              {index + 1}. {item.punishment}
            </Text>
            <Flag code={item.language} size={32} />
          </View>
        }
        onPress={() => handleCheckboxToggle(item.id)}
        size={32}
        fillColor="#489ff0"
      />
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
