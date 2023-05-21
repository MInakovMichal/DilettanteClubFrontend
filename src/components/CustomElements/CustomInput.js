import { Text, View, TextInput } from 'react-native';
import React from 'react';
import { styles } from '../../../app.styles';
import { Controller } from 'react-hook-form';

const CustomInput = ({
  control,
  name,
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
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.inputViewStyle,
              { borderColor: error ? 'red' : '#e8e8e8', borderWidth: 1 },
            ]}
          >
            {icon}
            <TextInput
              keyboardType={keyboardType}
              style={[styles.input]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              maxLength={maxLength}
              variant="outline"
              placeholder={placeholder}
              secureTextEntry={security}
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

export default CustomInput;
