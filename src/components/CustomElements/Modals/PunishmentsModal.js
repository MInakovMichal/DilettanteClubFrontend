import { View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { styles } from "../../../../app.styles";
import CustomButton from "../CustomButton";
import i18n from "../../../../i18n";

const PunishmentsModal = ({ isVisible, onCloseModal }) => {
  const onAddPunishmentsPress = async () => {
    try {
      onCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCloseModal}
      animationInTiming={2000}
      animationOutTiming={2000}
      backdropTransitionInTiming={2000}
      backdropTransitionOutTiming={2000}
    >
      <View style={styles.modalContent}>
        <Text style={styles.boldText}>
          {i18n.t("custom_text.choose_punishments")}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <CustomButton value={i18n.t("button.close")} onPress={onCloseModal} />
          <CustomButton
            value={i18n.t("button.add")}
            onPress={onAddPunishmentsPress}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PunishmentsModal;
