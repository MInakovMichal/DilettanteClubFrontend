import { SafeAreaView } from "react-native";
import React, { useState } from "react";
import UseRoomContext from "../../../context/UseRoomContext";
import CustomInput from "../../../components/CustomElements/CustomInput";
import { useForm } from "react-hook-form";
import i18n from "../../../../i18n";
import CustomText from "../../../components/CustomElements/CustomText";
import CustomButton from "../../../components/CustomElements/CustomButton";
import { styles } from "../../../../app.styles";
import CustomSelect from "../../../components/CustomElements/CustomSelect";

const AddRoom = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [error, setError] = useState("");
  const { createRoom } = UseRoomContext();
  const [isPrivate, setIsPublic] = useState(false);
  const pwd = watch("password");

  const onAddPress = async (data) => {
    try {
      await createRoom(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const options = [i18n.t("custom_text.yes"), i18n.t("custom_text.no")];

  const onSelect = (index) => {
    if (index === 0) {
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomText
        viewStyleName={"Middle"}
        textValue={i18n.t("custom_text.create_room_content")}
        textStyleName={"boldText"}
      />

      <CustomInput
        control={control}
        name="name"
        rules={{
          required: i18n.t("error.room_name.required"),
        }}
        placeholder={i18n.t("placeholder.room_name")}
      />

      <CustomSelect
        control={control}
        rules={{
          required: i18n.t("error.select.required"),
        }}
        name="is_private"
        options={options}
        placeholder={i18n.t("placeholder.is_private")}
        onSelect={onSelect}
      />

      <CustomInput
        control={control}
        name="password"
        editable={isPrivate === true}
        placeholder={i18n.t("placeholder.password")}
        rules={{
          required:
            isPrivate === true ? i18n.t("error.password.required") : undefined,
          // minLength: { value: 8, message: i18n.t("error.password.min") },
          // maxLength: { value: 32, message: i18n.t("error.password.max") },
          // pattern: {
          //   value:
          //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
          //   message: i18n.t("error.password.pattern"),
          // },
        }}
        security={true}
      />

      <CustomInput
        control={control}
        name="password_confirmation"
        editable={isPrivate === true}
        rules={{
          required:
            isPrivate === true ? i18n.t("error.password.required") : undefined,
          validate: (value) =>
            isPrivate === false ||
            value === pwd ||
            i18n.t("error.password.confirm"),
        }}
        placeholder={i18n.t("placeholder.password_confirmation")}
        security={true}
      />

      <CustomButton
        onPress={handleSubmit(onAddPress)}
        value={i18n.t("button.add")}
      />
    </SafeAreaView>
  );
};

export default AddRoom;
