// src/screens/LogoutScreenPlaceholder.jsx
import React from 'react';
import { View, Text, Alert } from 'react-native'; // Adicionado Alert
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import styles from '../styles/LogoutScreenPlaceholder'; // Verifique o caminho
import StyledButton from '../components/StyledButton'; // Verifique o caminho
import { COLORS, FONT_SIZES, SPACING } from '../constants/Theme'; // Verifique o caminho

export default function LogoutScreenPlaceholder() {
  const navigation = useNavigation();

  const handleConfirmLogout = async () => { // Função agora é assíncrona
    try {
      // 1. Remover o token do AsyncStorage
      await AsyncStorage.removeItem('userToken');
      // Remover o userId também, se estiver armazenando
      await AsyncStorage.removeItem('userId');

      console.log('Token de usuário e ID removidos do AsyncStorage.');
      Alert.alert('Sucesso', 'Você foi desconectado do aplicativo.'); // Feedback visual

      // 2. Redirecionar para a pilha de autenticação
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }], // 'Auth' deve ser o nome da sua pilha de autenticação
      });

    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível desconectar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="logout" size={FONT_SIZES.xxLarge * 3} color={COLORS.lightText} />
      <Text style={styles.title}>Deseja realmente sair?</Text>
      <Text style={styles.subtitle}>Você será desconectado do aplicativo.</Text>

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Sim, Sair"
          onPress={handleConfirmLogout} // Chama a função que limpa o token
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