import { TouchableOpacity } from 'react-native';
import React from 'react';
import UseAuthContext from '../../context/UseAuthContext';
import { Ionicons } from '@expo/vector-icons';

const CustomLogoutButton = () => {
  const { logout } = UseAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Ionicons name="exit-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default CustomLogoutButton;
