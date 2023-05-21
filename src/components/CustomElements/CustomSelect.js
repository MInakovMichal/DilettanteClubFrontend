import React, { useState } from 'react';
import { View, Text } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import Picker from 'react-native-picker-select';
import SelectDropdown from 'react-native-select-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { styles } from '../../../app.styles';
import i18n from '../../../i18n';

const CustomSelect = ({
  control,
  name,
  options,
  rules = {},
  placeholder,
  icon,
  security = false,
  maxLength,
  keyboardType,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <View style={[styles.inputViewStyle]}>
            {icon}
            <Text style={styles.selectLabel}>{placeholder}: </Text>
            <SelectDropdown
              defaultButtonText={i18n.t('placeholder.choose_options')}
              data={options}
              defaultValue={value}
              onSelect={onChange}
              buttonStyle={[
                styles.selectDropdown,
                { borderColor: error ? 'red' : '#e8e8e8', borderWidth: 1 },
              ]}
            />
          </View>
          {error && (
            <Text style={{ color: 'red', alignSelf: 'stretch' }}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default CustomSelect;
