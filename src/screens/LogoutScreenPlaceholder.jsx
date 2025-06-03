// src/screens/LogoutScreenPlaceholder.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/LogoutScreenPlaceholder';
import StyledButton from '../components/StyledButton';
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme';

export default function LogoutScreenPlaceholder() {
  const navigation = useNavigation();

  const handleConfirmLogout = () => {
    console.log('Logout confirmado. Redirecionando para autenticação...');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="logout" size={FONT_SIZES.xxLarge * 3} color={COLORS.lightText} />
      <Text style={styles.title}>Deseja realmente sair?</Text>
      <Text style={styles.subtitle}>Você será desconectado do aplicativo.</Text>
      
      <View style={styles.buttonContainer}>
        <StyledButton
          title="Sim, Sair"
          onPress={handleConfirmLogout}
          color={COLORS.danger}
          style={styles.confirmButton}
        />
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton
          title="Não, Ficar"
          onPress={() => navigation.goBack()}
          color={COLORS.borderColor}
          textColor={COLORS.darkText}
          style={styles.cancelButton}
          textStyle={styles.cancelButtonText}
        />
      </View>
    </View>
  );
}