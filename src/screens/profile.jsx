import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/profile';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Lógica para deslogar o usuário (limpar token, etc.)
    console.log('Realizando logout...');
    // Redireciona para a tela de login (Root Stack) e reseta o histórico
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }], // Navega para a rota 'Auth' no RootStack
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Text style={styles.text}>Aqui você pode ver e editar suas informações pessoais.</Text>
      <Button title="Sair do Aplicativo" onPress={handleLogout} color="red" />
    </View>
  );
}