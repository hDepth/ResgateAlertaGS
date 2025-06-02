import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/LogoutScreenPlaceholder';

export default function LogoutScreenPlaceholder() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Esta é a lógica de logout real para este item do Drawer
    console.log('Executando logout a partir do Drawer item...');
    // Redireciona para a tela de login (Root Stack) e reseta o histórico
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Processando Logout...</Text>
      <Button title="Confirmar Saída" onPress={handleLogout} color="red" />
      <Button title="Cancelar" onPress={() => navigation.goBack()} />
    </View>
  );
}