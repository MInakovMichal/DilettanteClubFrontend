import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../../../app.styles';
import { Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  icon,
  maxLength,
  keyboardType,
  editable = true,
  isPassword = null,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(
    name === 'password' ? true : false
  );

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

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
              { backgroundColor: editable ? 'white' : 'lightgray' },
            ]}
          >
            {icon}
            <TextInput
              keyboardType={keyboardType}
              style={[
                styles.input,
                { backgroundColor: editable ? 'white' : 'lightgray' },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              maxLength={maxLength}
              variant="outline"
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              editable={editable}
            />
            {name === 'password' ? (
              <View>
                {isPassword && (
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icon
                      name={secureTextEntry ? 'eye' : 'eye-slash'}
                      size={20}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <></>
            )}
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
